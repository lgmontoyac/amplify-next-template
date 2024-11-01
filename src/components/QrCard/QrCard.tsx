import { Flex, View } from "@aws-amplify/ui-react";
import { QRCardItem } from "@/components/QrCardItem/QRCardItem";

export function QRCard({ datasheetURL }: { datasheetURL: string }) {
  const data = [
    {
      url: datasheetURL,
      title: "Ficha técnica",
      description:
        "¿Quieres saber más detalles de este vehículo? Escanea el QR que se encuentra al lado y descarga su ficha técnica para que no te pierdas ningún detalle. ",
    },
    {
      url: "https://www.toyota.com.co/capsula-boutique/",
      title: "Boutique",
      description:
        "¿Quieres hacer match con tu vehículo? Escanea el QR que se encuentra al lado y descubre los productos que tenemos en nuestra boutique.",
    },
  ];

  return (
    <>
      <View maxWidth="125rem">
        <Flex justifyContent="space-between" gap="1.25rem">
          {data.map((item, index) => (
            <QRCardItem key={index} item={item} />
          ))}
        </Flex>
      </View>
    </>
  );
}
