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
      maxWidth="125rem"
      paddingTop="73px"
      paddingBottom="73px"
      margin="0 auto"
      display="flex"
      textAlign="center"
      width="100%"
    >
      <Flex direction="column" alignItems="center" gap="56px">
        <Text
          color="#000000"
          padding="0.625rem 1.25rem"
          borderRadius="0.5rem"
          fontWeight="300"
          fontSize="xxxxl"
          lineHeight="xxxxl"
        >
          {item.title}
        </Text>
        <Button
          variation="primary"
          display="inline-flex"
          size="large"
          padding="1.5625rem 4.3125rem"
          fontSize="xl"
          onClick={item.callback}
        >
          {item.textButton}
        </Button>
      </Flex>
    </View>
  );
}
