import { View, Text, Flex } from "@aws-amplify/ui-react";
import { SpecListItem } from "@/components/SpecListItem/SpecListItem";

interface SpecListProps {
  specifications: {
    img: {
      alt: string;
      src: string;
    };
    title: string;
    description: string;
  }[];
}
export function SpecList({ specifications }: SpecListProps) {
  return (
    <View maxWidth="2000px" margin="0 auto">
      <Text fontSize="xl" marginBottom="30px" textAlign={"center"}>
        Especificaciones generales
      </Text>
      <Flex justifyContent="space-between" gap="20px">
        {specifications.map((item, index) => (
          <SpecListItem key={index} item={item} />
        ))}
      </Flex>
    </View>
  );
}
