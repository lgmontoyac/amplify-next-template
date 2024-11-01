import { Button, TextField } from '@aws-amplify/ui-react';
import Modal from './../Modal/Modal';
import Stepper from './../Stepper/Stepper';
import { DataForm } from '../DataForm/DataForm';
import { ContactDetailsForm } from '../ContactDetailsForm/ContactDetailsForm';
import { DealerForm } from '../DealerForm/DealerForm';
import { useEffect, useState } from 'react';
import { ShippingConfirmation } from '../ShippingConfirmation/ShippingConfirmation';

interface ModalWithStepperProps {
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onRedirect: () => void;
}

type StepKey = 'dataForm' | 'contactDetailsForm' | 'dealerForm';

export default function ModalWithStepper({ isOpen, onClose, onRedirect, description }: ModalWithStepperProps) {
  const [isValid, setIsValid] = useState({ 
    dataForm: false, 
    contactDetailsForm: false, 
    dealerForm: false 
  });
  const [isValidDealerForm, setIsValidDealerForm] = useState(false);
  const [formData, setFormData] = useState({
    dataForm: { 
      firstName: '',
      lastName: '',
      typeDocument: '',
      numberDocument: '',
    },
    contactDetailsForm: { 
      phone: '',
      email: ''
    },
    dealerForm: { 
      dealer: '',
      city: ''
    },
  });

  const handleFormDataChange = (step: StepKey, data: Record<string, string>, isValid: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      [step]: { ...prevData[step], ...data },
    }));

    setIsValid((prevIsValid) => ({
      ...prevIsValid,
      [step]: isValid,
    }));
  };

  const steps = [
    {
      title: 'Datos',
      content: (
        <DataForm
          data={formData.dataForm}
          onChange={(data) => handleFormDataChange('dataForm', data, isValid.dataForm)}
          onValidate={(isValid) => setIsValid((prev) => ({ ...prev, dataForm: isValid }))}
        />
      ),
    },
    {
      title: 'Datos de contacto',
      content: <ContactDetailsForm 
        data={formData.contactDetailsForm} 
        onChange={(data) => handleFormDataChange('contactDetailsForm', data, isValid.contactDetailsForm)}
        onValidate={(isValid) => setIsValid((prev) => ({ ...prev, contactDetailsForm: isValid }))}
      />,
    },
    {
      title: 'Concesionario',
      content: <DealerForm 
        data={formData.dealerForm}
        onChange={(data) => handleFormDataChange('dealerForm', data, isValid.dealerForm)}
        onValidate={(isValid) => {
          setIsValidDealerForm(isValid);
        }}
      />,
    },
    {
      title: 'Confirmación',
      content: <ShippingConfirmation />,
    },
  ];

  const handleStepSendData = () => {
    if (isValid.dataForm && isValid.contactDetailsForm && isValidDealerForm) {
      console.log("Send data", formData);
    }
  };
  const handleStepRedirect = () => onRedirect();

  return (
    <Modal 
      isOpen={isOpen}
      onClose={onClose}
      title="Cotiza tu"
      description={description}
    >
      <Stepper
        steps={steps}
        onStepChange={() => {}}
        onStepSendData={handleStepSendData}
        onStepRedirect={handleStepRedirect}
        isStepValid={[
          isValid.dataForm, 
          isValid.contactDetailsForm, 
          isValidDealerForm,
          true  
        ]}
      />
    </Modal>
  );
}
