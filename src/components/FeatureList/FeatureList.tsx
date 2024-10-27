import { View, Text, Flex } from "@aws-amplify/ui-react";
import { FeatureListItem } from "@/components/FeatureListItem/FeatureListItem";

interface FeatureListProps {
  featureList: {
    img: {
      src: string;
      alt: string;
    };
    title: string;
    contain: boolean;
  }[];
}

export function FeatureList({ featureList }: FeatureListProps) {
  return (
    <View maxWidth="2000px">
      <Flex justifyContent="space-between" gap="20px">
        {featureList.map((item, index) => (
          <FeatureListItem key={index} item={item} />
        ))}
      </Flex>
    </View>
  );
}
