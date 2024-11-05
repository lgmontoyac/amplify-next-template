import { Button, Flex, Image, Text, View } from "@aws-amplify/ui-react";
import styles from "./CarDetail.module.scss";
import { fetchImageUrl } from "@/services/filesService";

interface CarDetailProps {
  car: any; // TODO: remove "any" when we have final model.
  selectedColor: any;
  selectedModel: any;
  onClickCta?: () => void;
}
export function CarDetail({
  car,
  selectedColor,
  selectedModel,
  onClickCta,
}: CarDetailProps) {
  return (
    <View>
      <Flex justifyContent="center" gap="3rem">
        <Image
          maxWidth="1143px"
          src={fetchImageUrl(selectedColor.imagePath)}
          alt={car.model}
        />
        <Flex direction="column" gap="3rem">
          <View className={styles.title}>
            <Image src={car.logoImageUrlFull} alt={car.model} />
            <Text
              color="black"
              fontSize="xxxxl"
              marginTop={10}
              fontWeight={600}
            >
              {selectedModel?.shortName}
            </Text>
          </View>
          <View className={styles.price}>
            <Text color="specialGray" fontSize="xxl">
              Desde
            </Text>
            <Text
              color="black"
              fontSize="xxxxl"
              paddingTop="11px"
              paddingBottom="11px"
              fontWeight="700"
            >
              {selectedModel?.price?.toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Text>
            <Text color="specialGray" fontSize="xxl">
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
              onClick={onClickCta}
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
    </View>
  );
}
