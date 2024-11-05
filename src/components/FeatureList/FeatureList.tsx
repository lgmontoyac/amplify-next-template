import { View, Text, Flex } from "@aws-amplify/ui-react";
import { FeatureListItem } from "@/components/FeatureListItem/FeatureListItem";

interface FeatureListProps {
  details: {
    hasAntilockBrakeSystem: boolean;
    hasElectronicStabilityControl: boolean;
    hasFrontCollisionAlert: boolean;
    hasChildRestraintSystem: boolean;
    airbagsAmount: number;
  };
}

export function FeatureList({ details }: FeatureListProps) {
  const featureList = [
    {
      id: 1,
      img: {
        src: "/assets/icons/icon_ABS_aro.svg",
        alt: "SISTEMA ANTIBLOQUEO",
      },
      title: "SISTEMA ANTIBLOQUEO",
      contain: details.hasAntilockBrakeSystem,
    },
    {
      id: 2,
      img: {
        src: "/assets/icons/icon_control_estabilidad.svg",
        alt: "CONTROL ELECTRÓNICO DE ESTABILIDAD",
      },
      title: "CONTROL ELECTRÓNICO DE ESTABILIDAD",
      contain: details.hasElectronicStabilityControl,
    },
    {
      id: 3,
      img: {
        src: "/assets/icons/icon_alerta.svg",
        alt: "ALERTA DE COLISIÓN FRONTAL",
      },
      title: "ALERTA DE COLISIÓN FRONTAL",
      contain: details.hasFrontCollisionAlert,
    },
    {
      id: 4,
      img: {
        src: "/assets/icons/icon_isofix.svg",
        alt: "SISTEMA DE SUJECIÓN INFANTIL",
      },
      title: "SISTEMA DE SUJECIÓN INFANTIL",
      contain: details.hasChildRestraintSystem,
    },
    {
      id: 5,
      img: {
        src: "/assets/icons/icon_airbags.svg",
        alt: `BOLSAS DE AIRE (${details.airbagsAmount})`,
      },
      title: `BOLSAS DE AIRE (${details.airbagsAmount})`,
      contain: details.airbagsAmount > 0,
    },
  ];
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
