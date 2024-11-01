import { Label, Input, Text, Flex, Grid } from '@aws-amplify/ui-react';
import Select from 'react-select';
import styles from "./DealerForm.module.scss";
import { useEffect, useState } from 'react';
import cityAndDealers from '../../../public/data/dealersAndCities.json';
interface Option {
  value: string;
  label: string;
}

interface DealerFormProps {
  data: { dealer: string; city: string };
  onChange: (updatedData: Record<string, string>) => void;
  onValidate: (isValid: boolean) => void; 
}

interface Vitrina {
  IdVitrina: number;
  Nombre: string;
  Direccion: string;
  Latitud: string;
  Longitud: string;
}

interface Dealer {
  Codigo: string;
  Nombre: string;
  Vitrinas: Vitrina[];
}

interface CustomSelectProps {
  label: string;
  field: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  marginTop: string;
  selectedValue?: string; 
}

const CustomDropdownIndicator = () => null;

const CustomSelect = ({
  label,
  field,
  options,
  value,
  onChange,
  onBlur,
  marginTop,
  selectedValue
}: CustomSelectProps) => (
  <Flex direction="column" gap="small" marginTop={marginTop}>
    <Label htmlFor={field} className={styles.label}>{label}</Label>
    <Select
      id={field}
      options={options}
      value={options.find(option => option.value === value) || null}
      onChange={(option) => onChange(option?.value || '')}
      onBlur={onBlur}
      defaultValue={options.find(option => option.value === selectedValue) || null}
      styles={{
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
      }}
      components={{ DropdownIndicator: CustomDropdownIndicator, IndicatorSeparator: null }}
      placeholder="Selecciona una opción"
    />
  </Flex>
);

export function DealerForm({ data, onChange, onValidate }: DealerFormProps) {
  const [formData, setFormData] = useState({
    dealer: data.dealer || '',
    city: data.city || '11001',
  });

  const [cities, setCities] = useState<Option[]>([]);
  const [dealers, setDealers] = useState<Option[]>([]);
  const [errors, setErrors] = useState({
    dealer: '',
    city: '',
  });

  useEffect(() => {
    const cityOptions = cityAndDealers.map((city) => ({
      value: city.Codigo,
      label: city.Nombre,
    }));
    setCities(cityOptions);
  }, []);

  useEffect(() => {
    const selectedCity = cityAndDealers.find(city => city.Codigo === formData.city);
    const dealerOptions = selectedCity?.Vitrinas.map((vitrina) => ({
      value: vitrina.IdVitrina.toString(),
      label: vitrina.Nombre,
    })) || [];
    setDealers(dealerOptions);
  }, [formData.city]); 

  useEffect(() => {
    onChange(formData);
  }, [formData]);

  useEffect(() => {
      onValidate(false);
  }, [formData.city]);

  const handleChange = (field: string, value: string) => {
    const updatedData = {
      ...formData, 
      [field]: value,
    };

    setFormData(updatedData);

    const isValid = updatedData.city.trim() !== '';
    onValidate(isValid);

    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: value.trim() === '' ? 'Este campo es obligatorio' : ''
    }));

    onChange(updatedData);
  };

  const handleBlur = (field: string, value: string) => {
    if (value.trim() === '') {
      setErrors(prevErrors => ({
        ...prevErrors,
        [field]: 'Este campo es obligatorio'
      }));
    }
  };

  return (
    <>
      <Flex direction="column" gap="small">
        <CustomSelect
          label="Ciudad*"
          field="city"
          options={cities}
          value={formData.city} 
          onChange={(value) => handleChange('city', value)}
          marginTop="9rem"
          onBlur={() => handleBlur('city', formData.city)}
          selectedValue={"11001"}
        />
        {errors.city && <Text color="red" className={styles.errorText}>{errors.city}</Text>}
      </Flex>
      
      <Flex direction="column" gap="small">
        <CustomSelect
          label="Concesionario*"
          field="dealer"
          options={dealers}
          value={data.dealer}
          onChange={(value) => handleChange('dealer', value)}
          onBlur={() => handleBlur('dealer', formData.city)}
          marginTop="3rem"
        />
        {errors.dealer && <Text color="red" className={styles.errorText}>{errors.dealer}</Text>}
      </Flex>
      <Grid justifyContent="center" textAlign="center">
        <Text
          marginTop="3rem"
          color="#FFFFFF"
          fontSize="1.5rem"
          fontWeight="400"
          lineHeight="2.1rem"
          textAlign="center"
        >
          *Al darle “Enviar” aceptas el tratamiento de datos y términos y condiciones.
        </Text>
        <Text
          marginTop="1.25rem"
          color="#FFFFFF"
          fontSize="1.5rem"
          fontWeight="400"
          lineHeight="2.1rem"
          textAlign="center"
        >
          Si quieres revisar esta información ingresa a: www.toyota.com.co/politicas-de-privacidad/
        </Text>
      </Grid>
    </>
  );
}