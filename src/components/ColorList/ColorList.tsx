import { View, Text, Flex } from "@aws-amplify/ui-react";
import { ColorListItem } from "../ColorListItem/ColorListitem";
import { useState } from "react";
import { ColorOption } from "@/types";

interface ColorListProps {
  colorLists: ColorOption[];

  onSelect: (item: { id: string; img: string; title: string }) => void;
}

export function ColorList({ colorLists, onSelect }: ColorListProps) {
  const [currentColor, setCurrentColor] = useState<string>(colorLists[0]?.id);

  return (
    <View maxWidth="2400px">
      <Flex justifyContent="center" gap="37px">
        {colorLists.map((item, index) => (
          <ColorListItem
            key={index}
            item={{
              id: item.id,
              img: item.iconUrl || "",
              title: item.name,
            }}
            onSelect={(item) => {
              setCurrentColor(item.id);
              onSelect(item);
            }}
            isSelected={item.id === currentColor}
          />
        ))}
      </Flex>

      <Text
        textAlign="center"
        fontSize="xxl"
        fontWeight="bold"
        marginTop="32px"
      >
        {colorLists.find((item) => item.id === currentColor)?.name}
      </Text>
      <Text textAlign="center" fontSize="xl" marginTop="10px">
        *Los colores pueden variar por cada versión.
      </Text>
    </View>
  );
}
