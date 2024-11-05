import { Button, TextField } from "@aws-amplify/ui-react";
import Modal from "./../Modal/Modal";
import Stepper from "./../Stepper/Stepper";
import { DataForm } from "../DataForm/DataForm";
import { ContactDetailsForm } from "../ContactDetailsForm/ContactDetailsForm";
import { DealerForm } from "../DealerForm/DealerForm";
import { useEffect, useRef, useState } from "react";
import { ShippingConfirmation } from "../ShippingConfirmation/ShippingConfirmation";
import Keyboard from "../Keyboard/Keyboard";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { Schema } from "@/data/resource";
import outputs from "../../../amplify_outputs.json";
import {
  KeyboardHandlerEvent,
  SimpleKeyboard as SimpleKeyboardType,
} from "react-simple-keyboard";
import { storeFormDataOffline } from "@/services/formService";

interface ModalWithStepperProps {
  description: string;
  model: string;
  version: string;
  isOpen: boolean;
  onClose: () => void;
  onRedirect: () => void;
}

// Usamos StepKey como tipo para los pasos y Field para los campos individuales
type StepKey = "dataForm" | "contactDetailsForm" | "dealerForm";
type Field =
  | "firstName"
  | "lastName"
  | "typeDocument"
  | "numberDocument"
  | "phone"
  | "email"
  | "dealer"
  | "city";

export default function ModalWithStepper({
  isOpen,
  onClose,
  onRedirect,
  description,
  version,
  model,
}: ModalWithStepperProps) {
  const keyboard = useRef(null);
  const [focusedInput, setFocusedInput] = useState(""); // Almacena el valor del input activo
  const [inputPattern, setInputPattern] = useState(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/);
  const [isValid, setIsValid] = useState({
    dataForm: false,
    contactDetailsForm: false,
    dealerForm: false,
  });
  const [formData, setFormData] = useState({
    dataForm: {
      firstName: "",
      lastName: "",
      typeDocument: "",
      numberDocument: "",
    },
    contactDetailsForm: {
      phone: "",
      email: "",
    },
    dealerForm: {
      dealer: "",
      city: "",
    },
  });

  const handleFormDataChange = (
    step: StepKey,
    data: Record<string, string>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [step]: { ...prevData[step], ...data },
    }));
  };

  const handleInputChange = (value: string) => {
    if (focusedInput) {
      const [step, field] = focusedInput.split(".") as [StepKey, Field];
      setFormData((prevData) => ({
        ...prevData,
        [step]: { ...prevData[step], [field]: value },
      }));
    }
  };

  useEffect(() => {
    const [step, field] = focusedInput.split(".") as [StepKey, Field];
    let pattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (field == "numberDocument" || field == "phone") {
      pattern = /^\d+$/;
    }
    if (field == "email") {
      pattern = /.*/;
    }

    setInputPattern(pattern);
  }, [focusedInput]);

  const steps = [
    {
      title: "Datos",
      content: (
        <DataForm
          data={formData.dataForm}
          onChange={(data) => handleFormDataChange("dataForm", data)}
          onValidate={(isValid) =>
            setIsValid((prev) => ({ ...prev, dataForm: isValid }))
          }
          onFocus={(field) => setFocusedInput(`dataForm.${field}`)}
        />
      ),
    },
    {
      title: "Datos de contacto",
      content: (
        <ContactDetailsForm
          data={formData.contactDetailsForm}
          onChange={(data) => handleFormDataChange("contactDetailsForm", data)}
          onValidate={(isValid) =>
            setIsValid((prev) => ({ ...prev, contactDetailsForm: isValid }))
          }
          onFocus={(field) => setFocusedInput(`contactDetailsForm.${field}`)}
        />
      ),
    },
    {
      title: "Concesionario",
      content: (
        <DealerForm
          data={formData.dealerForm}
          onChange={(data) => handleFormDataChange("dealerForm", data)}
          onValidate={(isValid) => {
            setIsValid((prev) => ({ ...prev, dealerForm: isValid }));
          }}
        />
      ),
    },
    {
      title: "Confirmación",
      content: <ShippingConfirmation />,
    },
  ];

  const handleStepSendData = async () => {
    if (isValid.dataForm && isValid.contactDetailsForm && isValid.dealerForm) {
      Amplify.configure(outputs);
      const client = generateClient<Schema>();
      const dataToSend = {
        firstName: formData.dataForm.firstName,
        identificationType: formData.dataForm.typeDocument,
        identificationNumber: formData.dataForm.numberDocument,
        dealerCode: formData.dealerForm.dealer,
        lastName: formData.dataForm.lastName,
        email: formData.contactDetailsForm.email,
        phoneNumber: formData.contactDetailsForm.phone,
        vehicleModel: model,
        vehicleVersion: version,
        city: formData.dealerForm.city,
        dataAuthorization: true,
        termsAndConditions: true,
      };

      // Verificar si hay conexión a Internet
      if (navigator.onLine) {
        try {
          const { data, errors } = await client.mutations.sendToKumo(
            dataToSend
          );
          if (errors) {
            console.error("Error al enviar datos:", errors);
            await storeFormDataOffline(dataToSend); // Guardar si hay errores
          }
        } catch (error) {
          console.error("Error en la solicitud:", error);
          await storeFormDataOffline(dataToSend); // Guardar si falla la solicitud
        }
      } else {
        await storeFormDataOffline(dataToSend); // Guardar si no hay conexión
      }
    }
  };

  const handleStepRedirect = () => onRedirect();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setFocusedInput("");
          setFormData({
            dataForm: {
              firstName: "",
              lastName: "",
              typeDocument: "",
              numberDocument: "",
            },
            contactDetailsForm: {
              phone: "",
              email: "",
            },
            dealerForm: {
              dealer: "",
              city: "",
            },
          });
        }}
        title="Cotiza tu"
        description={description}
        keyboardProps={{
          focusedInput,
          keyboard,
          handleInputChange,
          inputPattern,
        }}
      >
        <Stepper
          steps={steps}
          onStepChange={(e) => {
            if (e === 2) setFocusedInput("");
          }}
          onStepSendData={handleStepSendData}
          onStepRedirect={handleStepRedirect}
          isStepValid={[
            isValid.dataForm,
            isValid.contactDetailsForm,
            isValid.dealerForm,
            true,
          ]}
        />
      </Modal>
    </>
  );
}
