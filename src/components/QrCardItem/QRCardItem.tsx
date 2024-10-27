import styles from "./QRCardItem.module.scss";
import { Flex, View, Text } from "@aws-amplify/ui-react";
import QRCode from "react-qr-code";

interface QRCardItemProps {
    item: {
        url: string,
        title: string,
        description: string,
    };
};

export function QRCardItem({ item }: QRCardItemProps) {
    return (
        <View
            backgroundColor="#F6F6F6"
            padding="20px"
            maxWidth="990px"
            maxHeight="258px"
            margin="20px auto"
        >
            <Flex
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <View flex="1">
                    <Text
                        as="h3"
                        fontWeight="400"
                        fontSize="xl"
                        lineHeight="45.63px"
                        marginBottom="10px"
                        color="#000000"
                    >
                        {item.title}
                    </Text>
                    <Text
                        fontSize="20px"
                        color="xl"
                    >
                        {item.description}
                    </Text>
                </View>
                <View>
                    <QRCode
                        value={item.url}
                        size={100}
                        level="H"
                        bgColor="#ffffff"
                        fgColor="#000000" 
                    />
                </View>
            </Flex>
        </View>
    );
}
