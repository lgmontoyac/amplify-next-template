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
              right: "0.5rem",
              width: "1.75rem",
              height: "1.6875rem",
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
              right: "0.5rem",
              width: "1.75rem",
              height: "1.6875rem",
            }}
          />
        )}
      </View>

      <Text
        textAlign="center"
        fontSize="large"
        fontFamily="var(--font-toyotaDisplay)"
      >
        {item.title}
      </Text>
    </Flex>
  );
}
