import { Flex, Grid, Text, Image } from '@aws-amplify/ui-react';

export function ShippingConfirmation() {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Grid>
        <Text fontWeight="400" fontSize="xl" color="white">
          Gracias por diligenciar tus datos
        </Text>
        <Text fontWeight="400" color="white">
          ¡Tus datos fueron recibidos correctamente! Consulta con nuestros 
          asesores y entérate cómo puedes financiar tu vehículo.
        </Text>
      </Grid>
      <Grid marginTop="1rem">
        <Image 
          src='assets/icons/icon_logo_toyota.svg'
          alt="Logo Toyota"
          style={{width: '20rem'}}
        />
      </Grid>
    </Flex>
  );
}
