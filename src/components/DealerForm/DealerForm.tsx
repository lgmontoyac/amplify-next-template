import { Label, TextField, Text, Flex, Grid } from '@aws-amplify/ui-react';

interface DealerFormProps {
  data: { 
    name: string;
    city: string
  };
  onChange: (updatedData: Record<string, string>) => void;
}

export function DealerForm({ data, onChange }: DealerFormProps) {
  const handleChange = (field: string, value: string) => {
    onChange({ [field]: value });
  };

  return (
    <>
      <TextField
        label={
          <Text 
            color={'#FFFFFF'}
            marginBottom={13}
          >
            Ciudad*
          </Text>
        }
        placeholder='Ciudad'
        value={data.city}
        onChange={(e) => handleChange('city', e.target.value)}
      />
      <TextField
        label={
          <Text 
            color={'#FFFFFF'}
            marginBottom={13}
          >
            Concesionario*
          </Text>
        }
        placeholder='Concesionario'
        marginTop={20}
        value={data.name}
        onChange={(e) => handleChange('name', e.target.value)}
      />
      <Grid justifyContent={'center'} textAlign={'center'}>
        <Text marginTop={20} color={'#FFFFFF'}>
          *Al darle “Enviar” aceptas el tratamiento de datos y términos y condiciones. 
        </Text>
        <Text color={'#FFFFFF'}>
          Si quieres revisar esta información ingresa a: www.toyota.com.co/politicas-de-privacidad/
        </Text>
      </Grid>
    </>
  );
}