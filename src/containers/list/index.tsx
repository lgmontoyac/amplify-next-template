"use client";

import { CarList } from "@/components/CarList/CarList";
import { CategorySearchBar } from "@/components/CategorySearchBar/CategorySearchBar";
import { useVehicles } from "@/context/VehiclesProvider";
import { Flex, Image, Text, View } from "@aws-amplify/ui-react";

export default function ListContainer() {
  const { vehicles } = useVehicles();
  return (
    <View paddingTop="80px" paddingBottom="115px">
      <Flex direction="column" alignItems="center">
        <Image src="/assets/images/site_logo.svg" alt="Toyota" />
        <View textAlign="center" marginTop="75px">
          <Text fontSize="xxl">Bienvenido</Text>
          <Text fontSize="xxxl" marginTop="4px">
            ¿Qué vehículo estás buscando?
          </Text>
          <Flex marginTop="58px" gap="15px" justifyContent="center">
            <CategorySearchBar
              categoryList={[
                { label: "Carros", value: "carros" },
                { label: "Camionetas", value: "camionetas" },
              ]}
              onSearch={() => {}}
              selectedCategory={{ label: "Camionetas", value: "camionetas" }}
            />
          </Flex>
        </View>
        <CarList carList={vehicles} />
      </Flex>
    </View>
  );
}
