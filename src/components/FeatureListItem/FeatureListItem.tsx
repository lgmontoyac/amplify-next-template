import { Flex, Image, Text, View } from "@aws-amplify/ui-react";
import styles from "./FeatureListItem.module.scss";

interface FeatureListItemProps {
  item: {
    img: {
      alt: string;
      src: string;
    };
    title: string;
    contain: boolean;
  };
}

export function FeatureListItem({ item }: FeatureListItemProps) {
  return (
    <Flex className={styles.card}>
      <View position="relative" display="inline-block">
        <Image
          textAlign="center"
          className={styles.icon}
          src={item.img.src}
          alt={item.img.alt}
          loading="lazy"
          style={{ width: "100%" }}
        />
        {item.contain ? (
          <Image
            textAlign="center"
            className={styles.icon}
            src="/assets/icons/icon_contain.svg"
            alt={item.img.alt}
            loading="lazy"
            style={{
              position: "absolute",
              top: "0",
              right: "8px",
              width: "28px",
              height: "27px",
            }}
          />
        ) : (
          <Image
            textAlign="center"
            className={styles.icon}
            src="/assets/icons/icon_no_contain.svg"
            alt={item.img.alt}
            loading="lazy"
            style={{
              position: "absolute",
              top: "0",
              right: "8px",
              width: "28px",
              height: "27px",
            }}
          />
        )}
      </View>

      <Text textAlign={"center"} fontSize="xl" className={styles.description}>
        {item.title}
      </Text>
    </Flex>
  );
}
