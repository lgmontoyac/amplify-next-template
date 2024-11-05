import { View, Text, Flex, Grid } from "@aws-amplify/ui-react";
import { SpecListItem } from "@/components/SpecListItem/SpecListItem";

interface SpecListProps {
  details: {
    engine: string;
    gears: string;
    doors: number;
    passengers: number;
    warranty: string;
    fuelType: string;
  };
}

export function SpecList({ details }: SpecListProps) {
  const specifications = [
    {
      id: 1,
      img: {
        alt: "Motor",
        src: "/assets/icons/icon_motor.svg",
      },
      title: "Motor",
      description: details.fuelType,
    },
    {
      id: 2,
      img: {
        alt: "Velocidades",
        src: "/assets/icons/icon_velocidades.svg",
      },
      title: "Velocidades",
      description: details.gears,
    },
    {
      id: 3,
      img: {
        alt: "Puertas",
        src: "/assets/icons/icon_puertas.svg",
      },
      title: "Puertas",
      description: `${details.doors} puertas`,
    },
    {
      id: 4,
      img: {
        alt: "Pasajeros",
        src: "/assets/icons/icon_pasajeros.svg",
      },
      title: "Pasajeros",
      description: `Capacidad de ${details.passengers} pasajeros`,
    },
    {
      id: 5,
      img: {
        alt: "Garantia",
        src: "/assets/icons/icon_garantia.svg",
      },
      title: "Garantía",
      description: details.warranty,
    },
  ];
  return (
    <View maxWidth="125rem" margin="0 auto">
      <Text
        fontSize="xxxxl"
        lineHeight="xxxxl"
        fontWeight="300"
        marginBottom="45px"
        textAlign={"center"}
      >
        Especificaciones generales
      </Text>
      <Grid templateColumns="repeat(5, 1fr)" gap="31px">
        {specifications.map((item, index) => (
          <SpecListItem key={index} item={item} />
        ))}
      </Grid>
    </View>
  );
}
