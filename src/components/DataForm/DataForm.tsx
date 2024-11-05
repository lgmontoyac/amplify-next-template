import { Input, Grid, Flex, Label, Text } from "@aws-amplify/ui-react";
import Select from "react-select";
import styles from "./DataForm.module.scss";
import { useState, useEffect, useRef } from "react";

interface DataFormProps {
  data: {
    firstName: string;
    lastName: string;
    typeDocument: string;
    numberDocument: string;
  };
  onChange: (updatedData: Record<string, string>) => void;
  onValidate: (isValid: boolean) => void;
  onFocus: (e: any) => void;
}

const CustomDropdownIndicator = () => null;

export function DataForm({
  data,
  onChange,
  onValidate,
  onFocus,
}: DataFormProps) {
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    typeDocument: "",
    numberDocument: "",
  });

  const typesDocument = [
    { value: "CC", label: "CC" },
    { value: "NIT", label: "NIT" },
    { value: "CE", label: "CE" },
    { value: "PA", label: "PA" },
    { value: "TI", label: "TI" },
  ];

  type Field = "firstName" | "lastName" | "typeDocument" | "numberDocument";

  const previousData = useRef(data);

  const handleChange = (field: Field, value: string) => {
    const updatedData = { ...data, [field]: value };
    onChange(updatedData);
  };

  const handleError = (field: Field) => {
    setErrors((prevErrors) => {
      if (field === "numberDocument") {
        const validation = data[field].trim() === "" || data[field].length < 5;
        return {
          ...prevErrors,
          [field]: validation ? "Este campo debe tener al menos 5 dígitos" : "",
        };
      } else {
        return {
          ...prevErrors,
          [field]: data[field].trim() === "" ? "Este campo es obligatorio" : "",
        };
      }
    });
  };

  useEffect(() => {
    // Resteamos errores
    setErrors({
      firstName: "",
      lastName: "",
      typeDocument: "",
      numberDocument: "",
    });

    const fields: Field[] = [
      "firstName",
      "lastName",
      "typeDocument",
      "numberDocument",
    ];

    // Detecta el campo que cambió comparando data con previousData.current
    for (const field of fields) {
      if (data[field] !== previousData.current[field]) {
        // Validación de solo números para el campo numberDocument
        if (field === "numberDocument") {
          const onlyNumbers = /^[0-9]*$/;
          if (!onlyNumbers.test(data[field])) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              [field]: "Este campo solo debe contener números",
            }));
            return;
          }
        }

        // Validación de solo letras y espacios para el campo lastName
        if (field === "lastName" || field == "firstName") {
          const onlyLetters = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/;
          if (!onlyLetters.test(data[field])) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              [field]: "Este campo solo debe contener letras y espacios",
            }));
            return;
          }
        }

        handleError(field); // Llama a handleError solo para el campo que cambió
        break;
      }
    }

    // Actualiza la referencia de previousData al valor actual de data
    previousData.current = data;

    // Valida todos los campos para la propiedad onValidate
    const isValid =
      data.firstName.trim() !== "" &&
      data.lastName.trim() !== "" &&
      data.typeDocument.trim() !== "" &&
      data.numberDocument.trim() !== "" &&
      data.numberDocument.length >= 5;

    onValidate(isValid);
  }, [data.firstName, data.lastName, data.numberDocument, data.typeDocument]);

  const customSelectStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: "#F6F6F6",
      border: "none",
      color: "#58595B",
      fontSize: "2rem",
      fontWeight: 400,
      textAlign: "left",
      width: "100%",
      height: "10.8125rem",
      borderRadius: "6.25rem",
      padding: "3rem",
      paddingRight: "4rem",
      backgroundImage: 'url("/assets/icons/icon_arrow_down.svg")',
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 3.5rem center",
      backgroundSize: "3.5rem",
      boxShadow: "none",
      marginTop: "1.3rem",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused ? "#D42224" : "#333333",
      color: "#FFFFFF",
      fontSize: "2rem",
      padding: "1rem 2rem",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "#58595B",
    }),
  };

  return (
    <Grid templateColumns="1fr 1fr" gap="3rem 2rem" marginTop="15rem">
      <Flex direction="column" gap="small">
        <Label htmlFor="name" className={styles.label}>
          Nombre*
        </Label>
        <Input
          id="name"
          placeholder="Nombre"
          value={data.firstName}
          onChange={(e) => {
            const value = e.target.value;
            const onlyLetters = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/;
            if (onlyLetters.test(value)) {
              handleChange("firstName", value);
            }
          }}
          onFocus={() => onFocus("firstName")}
          onBlur={() => handleError("firstName")}
          className={styles.input}
          type="text"
        />
        {errors.firstName && (
          <Text color="red" className={styles.errorText}>
            {errors.firstName}
          </Text>
        )}
      </Flex>
      <Flex direction="column" gap="small">
        <Label htmlFor="lastName" className={styles.label}>
          Apellido*
        </Label>
        <Input
          id="lastName"
          placeholder="Apellido"
          value={data.lastName}
          onChange={(e) => {
            const value = e.target.value;
            const onlyLetters = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/;
            if (onlyLetters.test(value)) {
              handleChange("lastName", value);
            }
          }}
          onFocus={() => onFocus("lastName")}
          onBlur={() => handleError("lastName")}
          className={styles.input}
          type="text"
        />
        {errors.lastName && (
          <Text color="red" className={styles.errorText}>
            {errors.lastName}
          </Text>
        )}
      </Flex>
      <Flex direction="column" gap="small" marginTop="3rem">
        <Label htmlFor="typeDocument" className={styles.label}>
          Tipo de documento*
        </Label>
        <Select
          value={
            typesDocument.find(
              (option) => option.value === data.typeDocument
            ) || null
          }
          options={typesDocument}
          onChange={(option) =>
            handleChange("typeDocument", option?.value || "")
          }
          onBlur={() => handleError("typeDocument")}
          styles={customSelectStyles}
          placeholder="Selecciona un documento"
          backspaceRemovesValue={false}
          components={{
            IndicatorSeparator: null,
            DropdownIndicator: CustomDropdownIndicator,
          }}
          isSearchable={false}
        />
        {errors.typeDocument && (
          <Text color="red" className={styles.errorText}>
            {errors.typeDocument}
          </Text>
        )}
      </Flex>
      <Flex direction="column" gap="small" marginTop="3rem">
        <Label htmlFor="numberDocument" className={styles.label}>
          Número de documento*
        </Label>
        <Input
          id="numberDocument"
          marginTop={20}
          placeholder="Número de documento"
          value={data.numberDocument}
          onChange={(e) => {
            const value = e.target.value;
            const onlyNumbers = /^[0-9]*$/;
            if (onlyNumbers.test(value)) {
              handleChange("numberDocument", value);
            }
          }}
          onFocus={() => onFocus("numberDocument")}
          onBlur={() => handleError("numberDocument")}
          className={styles.input}
          type="text"
        />
        {errors.numberDocument && (
          <Text color="red" className={styles.errorText}>
            {errors.numberDocument}
          </Text>
        )}
      </Flex>
    </Grid>
  );
}
