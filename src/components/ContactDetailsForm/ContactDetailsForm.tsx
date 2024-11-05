import { Input, Flex, Text, Label } from "@aws-amplify/ui-react";
import styles from "./ContactDetailsForm.module.scss";
import ReactCountryFlag from "react-country-flag";
import { useState, useEffect, useRef } from "react";

interface ContactDetailsProps {
  data: {
    phone: string;
    email: string;
  };
  onChange: (updatedData: Record<string, string>) => void;
  onValidate: (isValid: boolean) => void;
  onFocus: (field: Field) => void;
}

type Field = "phone" | "email";

export function ContactDetailsForm({
  data,
  onChange,
  onValidate,
  onFocus,
}: ContactDetailsProps) {
  const [errors, setErrors] = useState({
    phone: "",
    email: "",
  });

  const previousData = useRef(data);

  const handleChange = (field: Field, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleError = (field: Field) => {
    setErrors((prevErrors) => {
      if (field === "phone") {
        const validation =
          data.phone.trim() === "" || !/^[0-9]{10}$/.test(data.phone);
        return {
          ...prevErrors,
          [field]: validation
            ? "Debe contener exactamente 10 dígitos numéricos"
            : "",
        };
      } else if (field === "email") {
        const validation =
          data.email.trim() === "" ||
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
        return {
          ...prevErrors,
          [field]: validation
            ? "Este campo es obligatorio y debe ser un correo válido"
            : "",
        };
      }
      return prevErrors;
    });
  };

  useEffect(() => {
    const validateFields = () => {
      const newErrors = { phone: "", email: "" };
      let isValid = true;

      // Validate email
      if (data["email"] !== previousData.current["email"]) {
        if (data.email.trim() === "") {
          newErrors.email = "Este campo es obligatorio";
          isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
          newErrors.email = "Por favor ingrese un correo electrónico válido";
          isValid = false;
        }
        handleError("email");
      }

      // Validate phone
      if (data["phone"] !== previousData.current["phone"]) {
        if (data.phone.trim() === "") {
          newErrors.phone = "Este campo es obligatorio";
          isValid = false;
        } else if (!/^[0-9]{10}$/.test(data.phone)) {
          newErrors.phone = "Debe contener exactamente 10 dígitos numéricos";
          isValid = false;
        }
        handleError("phone");
      }

      setErrors(newErrors);
      onValidate(isValid);
    };

    validateFields();
    previousData.current = data;
  }, [data.phone, data.email]);

  return (
    <>
      <Flex direction="column" gap="small" marginTop="15rem">
        <Label htmlFor="email" className={styles.label}>
          Correo Electrónico*
        </Label>
        <Input
          id="email"
          value={data.email}
          placeholder="Correo Electrónico"
          onChange={(e) => handleChange("email", e.target.value)}
          width="100%"
          marginBottom="1rem"
          className={styles.input}
          onFocus={() => onFocus("email")}
        />
        {errors.email && (
          <Text color="red" className={styles.errorText}>
            {errors.email}
          </Text>
        )}
      </Flex>
      <Flex gap="1rem" alignItems="flex-end" marginTop="3rem">
        <Flex direction="column" gap="small">
          <Label htmlFor="operator" className={styles.label}>
            Celular*
          </Label>
          <Flex alignItems="center" className={styles.phoneInput}>
            <ReactCountryFlag
              countryCode="CO"
              svg
              style={{
                width: "2.5em",
                height: "2.5em",
              }}
            />
            <Input id="operator" value="+57" isReadOnly marginTop={20} />
          </Flex>
        </Flex>
        <Input
          placeholder="Celular"
          value={data.phone}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[0-9]*$/.test(value) && value.length <= 10) {
              handleChange("phone", value);
            }
          }}
          onFocus={() => onFocus("phone")}
          type="tel"
          size="large"
          width="100%"
          marginTop={20}
          className={styles.input}
        />
      </Flex>
      {errors.phone && (
        <Text color="red" className={styles.errorText}>
          {errors.phone}
        </Text>
      )}
    </>
  );
}
