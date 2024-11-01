import { Flex, Image, Text } from "@aws-amplify/ui-react";

interface ColorListItemProps {
  item: {
    id: string;
    img: string;
    title: string;
  };
  onSelect: (item: { id: string; img: string; title: string }) => void;
  isSelected: boolean;
}

export function ColorListItem({
  item,
  isSelected,
  onSelect,
}: ColorListItemProps) {
  return (
    <Flex direction="column">
      <Flex
        position="relative"
        onClick={() => onSelect(item)}
        width="70px"
        height="70px"
        justifyContent="center"
        alignItems="center"
        style={{
          cursor: "pointer",
        }}
      >
        {isSelected && (
          <Image
            textAlign="center"
            src="/assets/colors/selected.svg"
            alt={item.title}
            loading="lazy"
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              bottom: "0",
              left: "0",
            }}
          />
        )}
        <Image
          textAlign="center"
          src={item.img}
          alt={item.title}
          loading="lazy"
          width="59.2px"
          height="59.2px"
          position="absolute"
          top="50%"
          transform="translateY(-50%)"
        />
      </Flex>
    </Flex>
  );
}
