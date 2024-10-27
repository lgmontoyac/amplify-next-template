import { View, Text, Button, Flex } from "@aws-amplify/ui-react";

interface CTASectionProps {
  item: {
    title: string;
    textButton: string;
    callback: () => void;
  };
}

export function CTASection({ item }: CTASectionProps) {
  return (
    <View
      style={{
        backgroundImage:
          "linear-gradient(178.06deg, #E7EDF1 52.85%, #F4F7F9 98.36%)",
        justifyContent: "center",
      }}
      maxWidth="2000px"
      paddingTop="60px"
      paddingBottom="60px"
      margin="0 auto"
      maxHeight="344px"
      display="flex"
      textAlign="center"
      width="100%"
    >
      <Flex direction="column" alignItems="center">
        <Text
          color="#000000"
          fontSize="xl"
          padding="10px 20px"
          borderRadius="8px"
          fontWeight="400"
          lineHeight="61.6px"
        >
          {item.title}
        </Text>
        <Button variation="primary" size="small" onClick={item.callback}>
          {item.textButton}
        </Button>
      </Flex>
    </View>
  );
}
