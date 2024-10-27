import { Flex, View } from "@aws-amplify/ui-react";
import { QRCardItem } from "@/components/QrCardItem/QRCardItem";

const test = [
  {
    url: "https://www.toyota.com.co/?gad_source=1&gclid=Cj0KCQjw4Oe4BhCcARIsADQ0csnBonBH5fHW29JtV1eDVVxilchTIO4BEgbY8xAn3VL69Dan74uNMIIaArk4EALw_wcB",
    title: "Ficha técnica",
    description:
      "¿Quieres saber más detalles de este vehículo? Escanea el QR que se encuentra al lado y descarga su ficha técnica para que no te pierdas ningún detalle. ",
  },
  {
    url: "https://www.toyota.com.co/?gad_source=1&gclid=Cj0KCQjw4Oe4BhCcARIsADQ0csnBonBH5fHW29JtV1eDVVxilchTIO4BEgbY8xAn3VL69Dan74uNMIIaArk4EALw_wcB",
    title: "Boutique",
    description:
      "¿Quieres hacer match con tu vehículo? Escanea el QR que se encuentra al lado y descubre los productos que tenemos en nuestra boutique.",
  },
];

export function QRCard() {
  return (
    <>
      <View maxWidth="2000px">
        <Flex justifyContent="space-between" gap="20px">
          {test.map((item, index) => (
            <QRCardItem key={index} item={item} />
          ))}
        </Flex>
      </View>
    </>
  );
}
