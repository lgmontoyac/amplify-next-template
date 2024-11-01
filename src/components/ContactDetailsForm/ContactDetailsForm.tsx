import { Input, Flex, Text, Label, Grid } from "@aws-amplify/ui-react";
import styles from "./ContactDetailsForm.module.scss";
import ReactCountryFlag from "react-country-flag";
import { useState } from "react";
interface ContactDetailsProps {
  data: {
    phone: string;
    email: string;
  };
  onChange: (updatedData: Record<string, string>) => void;
  onValidate: (isValid: boolean) => void;
}

export function ContactDetailsForm({
  data,
  onChange,
  onValidate,
}: ContactDetailsProps) {
  const [errors, setErrors] = useState({
    phone: "",
    email: "",
  });

  const handleChange = (field: string, value: string) => {
    const updatedData = {
      ...data,
      [field]: value,
    };

    onChange(updatedData);

    const isValid =
      updatedData.email.trim() !== "" && updatedData.phone.trim() !== "";

    onValidate(isValid);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: value.trim() === "" ? "Este campo es obligatorio" : "",
    }));
  };

  const handleBlur = (field: string, value: string) => {
    if (value.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "Este campo es obligatorio",
      }));
    }
  };

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
          onBlur={(e) => {
            const value = e.target.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
            if (value.trim() === '') {
              setErrors(prevErrors => ({
                ...prevErrors,
                email: 'Este campo es obligatorio'
              }));
            } else if (!emailRegex.test(value)) {
              setErrors(prevErrors => ({
                ...prevErrors,
                email: 'Por favor ingrese un correo electrónico válido'
              }));
            } else {
              setErrors(prevErrors => ({
                ...prevErrors,
                email: ''
              }));
            }
          }}
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
            const onlyNumbers = /^[0-9]*$/;
            if (onlyNumbers.test(value) && value.length <= 10) {
              handleChange('phone', e.target.value)
            }
          }}
          onBlur={(e) => handleBlur("phone", e.target.value)}
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
