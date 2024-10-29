import { TextField, Grid, Text } from '@aws-amplify/ui-react';

interface DataFormProps {
  data: { 
    firstName: string;
    lastName: string;
    typeDocument: string;
    numberDocument: string;
  };
  onChange: (updatedData: Record<string, string>) => void;
}

export function DataForm({ data, onChange }: DataFormProps) {
  const handleChange = (field: string, value: string) => {
    onChange({ [field]: value });
  };

  return (
    <Grid
      templateColumns="1fr 1fr" 
      gap="1rem"
    >
      <TextField
        label={
          <Text 
            color={'#FFFFFF'}
            marginBottom={13}
          >
            Nombre*
          </Text>
        }
        placeholder='Nombre'
        value={data.firstName}
        onChange={(e) => handleChange('firstName', e.target.value)}
      />
      <TextField
        label={
          <Text 
            color={'#FFFFFF'}
            marginBottom={13}
          >
            Apellido*
          </Text>
        }
        placeholder='Apellido'
        value={data.lastName}
        onChange={(e) => handleChange('lastName', e.target.value)}
      />
      <TextField
        label={
          <Text 
            color={'#FFFFFF'}
            marginBottom={13}
          >
            Tipo de documento*
          </Text>
        }
        placeholder='Tipo de documento'
        marginTop={20}
        value={data.typeDocument}
        onChange={(e) => handleChange('typeDocument', e.target.value)}
      />
      <TextField
        label={
          <Text 
            color={'#FFFFFF'}
            marginBottom={13}
          >
            Número de documento*
          </Text>
        }
        marginTop={20}
        placeholder='Número de documento'
        value={data.numberDocument}
        onChange={(e) => handleChange('numberDocument', e.target.value)}
      />
    </Grid>
  );
}
