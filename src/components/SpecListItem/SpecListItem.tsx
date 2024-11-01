import { Flex, Image, Text } from "@aws-amplify/ui-react";
import styles from "./SpecListItem.module.scss";

interface SpecListItemProps {
  item: {
    img: {
      alt: string;
      src: string;
    };
    title: string;
    description: string;
  };
}

export function SpecListItem({ item }: SpecListItemProps) {
  return (
    <Flex className={styles.card}>
      <Image
        textAlign={"center"}
        className={styles.icon}
        src={item.img.src}
        alt={item.img.alt}
        loading="lazy"
      />
      <Text
        textAlign={"center"}
        fontSize="xxl"
        fontWeight="500"
        className={styles.title}
      >
        {item.title}
      </Text>
      <Text
        textAlign={"center"}
        fontSize="large"
        fontFamily="var(--font-toyotaDisplay)"
        className={styles.description}
      >
        {item.description}
      </Text>
    </Flex>
  );
}
