import styles from "./QRCardItem.module.scss";
import { Flex, View, Text } from "@aws-amplify/ui-react";
import QRCode from "react-qr-code";

interface QRCardItemProps {
  item: {
    url: string;
    title: string;
    description: string;
  };
}

export function QRCardItem({ item }: QRCardItemProps) {
  return (
    <View
      backgroundColor="#F6F6F6"
      padding="60px"
      maxWidth="61.25rem"
      margin="1.25rem auto"
    >
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap="113px"
      >
        <View flex="1">
          <Text
            as="h3"
            fontWeight="500"
            fontSize="xxl"
            lineHeight="xxl"
            marginBottom="20px"
            color="#000000"
          >
            {item.title}
          </Text>
          <Text
            fontSize="large"
            lineHeight="large"
            color="#000000"
            fontFamily="var(--font-toyotaDisplay)"
            fontWeight="300"
          >
            {item.description}
          </Text>
        </View>
        <View>
          <QRCode
            value={item.url}
            size={200}
            level="H"
            bgColor="#ffffff"
            fgColor="#000000"
          />
        </View>
      </Flex>
    </View>
  );
}
