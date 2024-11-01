import { Flex, Grid, Text, Image } from '@aws-amplify/ui-react';

export function ShippingConfirmation() {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Grid 
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        marginTop="20rem"
      >
        <Text 
          color="#FFFFFF"
          fontSize="3.5rem"
          fontWeight="400"
          lineHeight="3.85rem"
          letterSpacing="-0.02em"
        >
          Gracias por diligenciar tus datos
        </Text>
        <Text 
          fontWeight="400" 
          color="white"
          fontSize="2rem"
          lineHeight="2.85rem"
        >
          ¡Tus datos fueron recibidos correctamente! Consulta con nuestros 
          asesores y entérate cómo puedes financiar tu vehículo.
        </Text>
      </Grid>
      <Grid marginTop="5rem">
        <Image 
          src='/assets/icons/icon_logo.svg'
          alt="Logo Toyota"
          style={{
            width: '24.0625rem',
            height: '6.8125rem'
          }}
        />
      </Grid>
    </Flex>
  );
}
