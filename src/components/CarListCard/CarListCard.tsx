import {
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  View,
} from "@aws-amplify/ui-react";
import styles from "./CarListCard.module.scss";

const backgroundColorsList = [
  "#29363A",
  "#2A5B59",
  "#1F2C40",
  "#373948",
  "#272329",
  "#161B1E",
];
interface CarListCardProps {
  index: number;
  car: any; // TODO: remove "any" when we have final model.
}
export function CarListCard({ index, car }: CarListCardProps) {
  const backgroundColor =
    backgroundColorsList[index % backgroundColorsList.length];

  return (
    <Link href={`/detail/${car.id}`}>
      <Flex
        className={styles.card}
        style={{ backgroundColor }}
        onClick={() => {}}
        role="button"
        tabIndex={0}
        aria-label={`Ver detalles para ${car.model}`}
      >
        <View className={styles.title}>
          <Text color="white" fontSize="xl">
            {car.type}
          </Text>
          <Text color="white" fontSize="xxxxl">
            {car.model}
          </Text>
        </View>
        <View className={styles.image}>
          <Image src={car.photoUrl} alt={car.model} />
          <Text
            position="absolute"
            bottom="20px"
            className="image-text"
            color="white"
            fontSize="medium"
          >
            *Imágenes de referencia
          </Text>
        </View>
        <View className={styles.price}>
          <Text color="white" fontSize="xl">
            Desde
          </Text>
          <Text
            color="white"
            fontSize="xxl"
            paddingTop="11px"
            paddingBottom="11px"
            fontWeight="700"
          >
            {car.price}
          </Text>
          <Text color="white" fontSize="medium">
            *Precio sugerido al público
          </Text>
          <Text
            color="white"
            border="1px solid white"
            marginTop="24px"
            padding="5px 20px"
            display="inline-block"
            borderRadius="small"
          >
            {car.category}
          </Text>
        </View>
        <Image
          position="absolute"
          bottom="40px"
          right="80px"
          width="23px"
          height="41px"
          alt="Next"
          src="icons/next.svg"
        />
      </Flex>
    </Link>
  );
}
