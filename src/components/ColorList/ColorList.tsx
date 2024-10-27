import { View, Text, Flex } from "@aws-amplify/ui-react";
import { ColorListItem } from "../ColorListItem/ColorListitem";
import { useState } from "react";

interface ColorListProps {
  colorLists: {
    id: number;
    img: string;
    title: string;
  }[];
}

export function ColorList({ colorLists }: ColorListProps) {
  const [currentColor, setCurrentColor] = useState(colorLists[0].id);
  return (
    <View maxWidth="2000px">
      <Flex justifyContent="center" gap="37px">
        {colorLists.map((item, index) => (
          <ColorListItem
            key={index}
            item={item}
            onSelect={(item) => setCurrentColor(item)}
            isSelected={item.id === currentColor}
          />
        ))}
      </Flex>

      <Text textAlign="center" fontSize="xl" fontWeight="bold" marginTop="32px">
        {colorLists.find((item) => item.id === currentColor)?.title}
      </Text>
      <Text textAlign="center" fontSize="large" marginTop="10px">
        *Los colores pueden variar por cada versión.
      </Text>
    </View>
  );
}
