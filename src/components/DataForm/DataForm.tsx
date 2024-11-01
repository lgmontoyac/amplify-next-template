import { Input, Grid, Flex, Label, Text } from '@aws-amplify/ui-react';
import Select from 'react-select';
import styles from "./DataForm.module.scss";
import { useState } from 'react';

interface DataFormProps {
  data: { 
    firstName: string;
    lastName: string;
    typeDocument: string;
    numberDocument: string;
  };
  onChange: (updatedData: Record<string, string>) => void;
  onValidate: (isValid: boolean) => void; 
}

const CustomDropdownIndicator = () => null;

export function DataForm({ data, onChange, onValidate }: DataFormProps) {
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    typeDocument: '',
    numberDocument: ''
  });
  const typesDocument = [
    { value: "CC", label: "CC" },
    { value: "NIT", label: "NIT" },
    { value: "CE", label: "CE" },
    { value: "PA", label: "PA" },
    { value: "TI", label: "TI" }
  ];

  const handleChange = (field: string, value: string) => {
    const updatedData = {
      ...data, 
      [field]: value,
    };

    onChange(updatedData);

    const isValid = updatedData.firstName.trim() !== '' &&
      updatedData.lastName.trim() !== '' &&
      updatedData.typeDocument.trim() !== '' &&
      updatedData.numberDocument.trim() !== ''

    onValidate(isValid);

    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: value.trim() === '' ? 'Este campo es obligatorio' : ''
    }));
  };

  const handleBlur = (field: string, value: string) => {
    if (value.trim() === '') {
      setErrors(prevErrors => ({
        ...prevErrors,
        [field]: 'Este campo es obligatorio'
      }));
    }
  };

  const customSelectStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: '#F6F6F6',
      border: 'none',
      color: '#58595B',
      fontSize: '2rem',
      fontWeight: 400,
      textAlign: 'left',
      width: '100%',
      height: '10.8125rem',
      borderRadius: '6.25rem',
      padding: '3rem',
      paddingRight: '4rem',
      backgroundImage: 'url("/assets/icons/icon_arrow_down.svg")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 3.5rem center',
      backgroundSize: '3.5rem',
      boxShadow: 'none',
      marginTop: '1.3rem',
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused ? "#D42224" : "#333333",
      color: "#FFFFFF",
      fontSize: '2rem',
      padding: '1rem 2rem',
    }),
    singleValue: (base: any) => ({
      ...base,
      color: '#58595B',
    }),
  };

  return (
    <Grid
      templateColumns="1fr 1fr"
      gap="3rem 2rem"
      marginTop="15rem"
    >
      <Flex direction="column" gap="small">
        <Label htmlFor="name" className={styles.label}>Nombre*</Label>
        <Input
          id='name'
          placeholder='Nombre'
          value={data.firstName}
          onChange={(e) => {
            const value = e.target.value;
            const onlyLetters = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/;
            if (onlyLetters.test(value)) {
              handleChange('firstName', e.target.value)
            }
          }}
          onBlur={(e) => handleBlur('firstName', e.target.value)}
          className={styles.input}
          type='text'
        />
        {errors.firstName && <Text color="red" className={styles.errorText}>{errors.firstName}</Text>}
      </Flex>
      <Flex direction="column" gap="small">
        <Label htmlFor="lastName" className={styles.label}>Apellido*</Label>
        <Input
          id="lastName"
          placeholder="Apellido"
          value={data.lastName}
          onChange={(e) => {
            const value = e.target.value;
            const onlyLetters = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/;
            if (onlyLetters.test(value)) {
              handleChange('lastName', value);
            }
          }}
          onBlur={(e) => handleBlur('lastName', e.target.value)}
          className={styles.input}
          type="text"
        />
        {errors.lastName && <Text color="red" className={styles.errorText}>{errors.lastName}</Text>}
      </Flex>
      <Flex direction="column" gap="small" marginTop="3rem">
        <Label htmlFor="typeDocument" className={styles.label}>Tipo de documento*</Label>
        <Select
          value={typesDocument.find(option => option.value === data.typeDocument) || null} 
          options={typesDocument}
          onChange={(option) => handleChange('typeDocument', option?.value || '')}
          styles={customSelectStyles}
          placeholder="Selecciona un documento"
          backspaceRemovesValue={false}
          components={{ 
            IndicatorSeparator: null,
            DropdownIndicator: CustomDropdownIndicator
          }}
          onBlur={() => handleBlur('typeDocument', data.typeDocument)}
        />
        {errors.typeDocument && <Text color="red" className={styles.errorText}>{errors.typeDocument}</Text>}
      </Flex>
      <Flex direction="column" gap="small" marginTop="3rem">
        <Label htmlFor="numberDocument" className={styles.label}>Número de documento*</Label>
        <Input
          id='numberDocument'
          marginTop={20}
          placeholder='Número de documento'
          value={data.numberDocument}
          onChange={(e) => {
            const value = e.target.value;
            const onlyNumbers = /^[0-9]*$/;
            if (onlyNumbers.test(value)) {
              handleChange('numberDocument', value);
            }
          }}
          onBlur={(e) => {
            const value = e.target.value;
            if (value.trim() === '' || value.length < 5) {
              setErrors(prevErrors => ({
                ...prevErrors,
                numberDocument: 'El número de documento debe tener al menos 5 dígitos.'
              }));
            } else {
              setErrors(prevErrors => ({
                ...prevErrors,
                numberDocument: ''
              }));
            }
          }}
          className={styles.input}
        />
        {errors.numberDocument && <Text color="red" className={styles.errorText}>{errors.numberDocument}</Text>}
      </Flex>
    </Grid>
  );
}
