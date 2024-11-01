"use client";

import { Flex, Image, Link, Text, View } from "@aws-amplify/ui-react";
import styles from "./CarListCard.module.scss";
import { getUrl } from "aws-amplify/storage";
import { useEffect, useState } from "react";

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

  const getLowerPrice = () => {
    if (!car.models || !car.models.items || car.models.items.length === 0) {
      return null;
    }

    const prices = car.models.items.map((model: { price: any }) => model.price);
    const lowestPrice = Math.min(...prices);

    return lowestPrice;
  };

  return (
    <Link href={`/detail/${car.id}`} width="100%" display="block">
      <Flex
        className={styles.card}
        style={{ backgroundColor }}
        onClick={() => {}}
        role="button"
        tabIndex={0}
        aria-label={`Ver detalles para ${car.name}`}
      >
        <View className={styles.title}>
          <Text color="white" fontSize="xl">
            {car.segment}
          </Text>
          <Text color="white" fontSize="xxxxl">
            {car.name}
          </Text>
        </View>
        <View className={styles.image}>
          <Image src={car.photoUrl} alt={car.name} />
          <Text
            position="absolute"
            bottom="20px"
            className="image-text"
            color="white"
            fontSize="large"
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
            {getLowerPrice() !== null
              ? getLowerPrice()?.toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                })
              : "Sin precio"}
          </Text>
          <Text color="white" fontSize="large">
            *Precio sugerido al público
          </Text>
          <Text
            color="white"
            border="1px solid white"
            marginTop="24px"
            padding="5px 20px"
            display="inline-block"
            borderRadius="small"
            fontSize="xl"
          >
            {car.fuelType}
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
