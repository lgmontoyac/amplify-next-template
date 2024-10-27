import { Button, Flex, Image, Text, View } from "@aws-amplify/ui-react";
import styles from "./CarDetail.module.scss";

interface CarDetailProps {
  car: any; // TODO: remove "any" when we have final model.
}
export function CarDetail({ car }: CarDetailProps) {
  return (
    <>
      <Flex justifyContent="center" gap="3rem">
        <Image maxWidth="1143px" src={car.photoUrl} alt={car.model} />
        <Flex direction="column" gap="3rem">
          <View className={styles.title}>
            <Image src={car.logoUrl} alt={car.model} />
            <Text
              color="black"
              fontSize="xxxxl"
              marginTop={10}
              fontWeight={600}
            >
              {car.submodel}
            </Text>
          </View>
          <View className={styles.price}>
            <Text color="specialGray" fontSize="xl">
              Desde
            </Text>
            <Text
              color="black"
              fontSize="xxxl"
              paddingTop="11px"
              paddingBottom="11px"
              fontWeight="700"
            >
              {car.price}
            </Text>
            <Text color="specialGray" fontSize="xl">
              *Precio sugerido al público
            </Text>
          </View>
          <View>
            <Button
              variation="primary"
              display="inline-flex"
              size="large"
              padding="25px 69px"
              fontSize="xl"
            >
              Cotizar Vehículo
            </Button>
          </View>
        </Flex>
      </Flex>
      <Text
        fontFamily="var(--font-toyotaDisplay)"
        textAlign="center"
        color="black"
        fontSize="medium"
      >
        *Imágenes de referencia
      </Text>
    </>
  );
}
