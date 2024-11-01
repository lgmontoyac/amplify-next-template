import { Flex, Text, View } from "@aws-amplify/ui-react";
import { CarListCard } from "../CarListCard/CarListCard";

export interface CarListProps {
  carList: any[];
}

export function CarList({ carList }: CarListProps) {
  return (
    <View maxWidth="2400px" margin="0 auto">
      <Flex justifyContent="center" marginBottom="50px"></Flex>
      <Text fontSize="xl" marginBottom="30px">
        {carList.length} resultados
      </Text>
      {carList.map((car, index) => (
        <CarListCard key={index} index={index} car={car} />
      ))}
    </View>
  );
}
