import { TextField, Flex, Text } from '@aws-amplify/ui-react';
import styles from './ContactDetailsForm.module.scss';

interface ContactDetailsProps {
  data: { 
    phone: string;
    email: string;
  };
  onChange: (updatedData: Record<string, string>) => void;
}

export function ContactDetailsForm({ data, onChange }: ContactDetailsProps) {
  const handleChange = (field: string, value: string) => {
    onChange({ [field]: value });
  };

  return (
    <>
      <TextField
        label={
          <Text 
            color={'#FFFFFF'}
            marginBottom={1}
          >
            Correo Electrónico*
          </Text>
        }
        value={data.email}
        placeholder='Correo Electrónico'
        onChange={(e) => handleChange('email', e.target.value)}
        width="100%" 
        marginBottom="1rem" 
      />
      <Flex gap="1rem" alignItems="flex-end">
        <TextField
          label={
            <Text 
              color={'#FFFFFF'}
              marginBottom={1}
            >
              Celular*
            </Text>
          }
          value="+57"
          isReadOnly
          width="6rem"
          marginTop={20}
          className={styles.phoneInput}
        />
        <TextField
          label=""
          placeholder='Celular'
          value={data.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          type="tel"
          size="large"
          width="100%"
          marginTop={20}
        />
      </Flex>
    </>
  );
}
