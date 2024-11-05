"use client";

import { CarList } from "@/components/CarList/CarList";
import {
  CategorySearchBar,
  Option,
} from "@/components/CategorySearchBar/CategorySearchBar";
import { Vehicle } from "@/types";
import { Flex, Image, Text, View } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";

export default function ListContainer({ vehicles }: { vehicles: Vehicle[] }) {
  const [categoryList, setCategoryList] = useState<
    { label: string; value: string }[]
  >([{ label: "TODOS", value: "" }]);
  const [selectedCategory, setSelectedCategory] = useState(categoryList[0]);

  const getFirstAndLastDayOfCurrentMonth = () => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    return {
      firstDay: firstDay.toLocaleDateString("es-CO"),
      lastDay: lastDay.toLocaleDateString("es-CO"),
    };
  };

  const { firstDay, lastDay } = getFirstAndLastDayOfCurrentMonth();

  useEffect(() => {
    const uniqueSegments = Array.from(
      new Set(vehicles.map((vehicle) => vehicle.segment))
    );

    const newCategoryList = uniqueSegments.map((segment) => ({
      label: segment,
      value: segment,
    }));

    setCategoryList(() => [{ label: "TODOS", value: "" }, ...newCategoryList]);
  }, [vehicles]);

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      selectedCategory.value === "" ||
      vehicle.segment === selectedCategory.value
  );

  const handleSearch = (category: Option | null) => {
    if (category) {
      setSelectedCategory(category);
    }
  };

  return (
    <Flex
      direction="column"
      justifyContent="space-between"
      height="100vh"
      paddingTop="80px"
      paddingBottom="115px"
      maxWidth="2000px"
      margin="0 auto"
    >
      <View marginBottom="80px">
        <View textAlign="center">
          <Image
            src="/assets/images/site_logo.svg"
            alt="Toyota"
            margin="0 auto"
          />
        </View>
        <View textAlign="center" marginTop="75px">
          <Text fontSize="xxl">Bienvenido</Text>
          <Text fontSize="xxxxl" marginTop="4px">
            ¿Qué vehículo estás buscando?
          </Text>
          <Flex marginTop="58px" gap="15px" justifyContent="center">
            <CategorySearchBar
              categoryList={categoryList}
              onSearch={handleSearch}
              selectedCategory={selectedCategory}
            />
          </Flex>
        </View>
        <CarList carList={filteredVehicles} />
      </View>
      <Text fontSize="xl" paddingBottom="80px" textAlign="center">
        *Precio sugerido al público por Automotores Toyota Colombia S.A.S a
        nivel nacional, vigente desde el {firstDay} hasta el {lastDay}. Estos
        valores incluyen impuestos aplicables de acuerdo con el tipo de vehículo
        y el mantenimiento planeado Toyota. Los precios pueden variar según el
        concesionario de la Red Autorizada escogido.
      </Text>
    </Flex>
  );
}
