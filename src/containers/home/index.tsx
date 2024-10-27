"use client";

import { CarList } from "@/components/CarList/CarList";
import { CategorySearchBar } from "@/components/CategorySearchBar/CategorySearchBar";
import { Flex, Image, Text, View } from "@aws-amplify/ui-react";

export default function ListContainer() {
  const carList = [
    {
      id: 1,
      type: "Camioneta",
      model: "Land Cruiser Prado",
      submodel: "First Edition",
      price: "$299.000.000",
      category: "Vehículo de Gasolina o Diesel",
      logoUrl: "/assets/images/logo.svg",
      photoUrl:
        "https://s3-alpha-sig.figma.com/img/67e8/031d/1173fdd4e3b2b5aa0887f485e7de8daf?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GGehQPNwuJAlv7lZNmfpbyq1c3ViDOM8UF84~6aeYRHcgwVmK9BMe9TlCSX157tAn1K8THdrF5dvziXK1ZfCI0ZLNoB7kgA7C6uev3AWJ~MKi2x1-qbMLu6TfPDzK8IO~v4yQSqPBek07jZYQwJthJWN21UC4z1xM0NGajJbdHaO3x~Uk7d9Xh9wTgTMu67DD2fkfI21riZOLuya8i1x5ID7XOjwjqjdPo7Yuv0c2SpKoUqBW8pyRrpX3uSDBdqwa7GUoEWk7ZBZlUWpHleRJPIRq4NGkKg21WxEk-udJ7Vrrl3rfVKJkKicdfd8JXaGUGn9W8bxs9JKMiCnEjayhA__",
    },
    {
      id: 2,
      type: "Sedan",
      model: "Toyota Corolla",
      price: "$299.000,000",
      category: "Vehículo híbrido",
      photoUrl:
        "https://s3-alpha-sig.figma.com/img/430b/0e73/40a5a94033a0472aad8f3d3d80ea5264?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NpxHLlgvCTUvZCkKP5P9fBZvuW5~Ihi~9dXaRZEccFrmscsS2JPomz~9~qwcT8LGQSL8Fy0qjXpkVJKsX21nawVdALB6KKr3bW7YBkmQhe9vPbMVHykoiystzEwnhZvFc2IxOh-4ND9ft3V8eCzXoY3xaOwLmcrX58FO3usWxft5pw1wgb-XfahJhNg3BexlAhkuzvhPQayWxhwL1aawdXRqC47TVlN-TLlOxHItBR68X5j25RkEMOm3nnE2BDiT9lK1SAb4SxOrEqEMsQgcHejIYrmLgliROcCI96lohY9YQsFxE7chSFH8CV31XjyPgmNygI8Zt5ljsKoKbEXFYA__",
    },
    {
      id: 3,
      type: "Camioneta",
      model: "Land Cruiser Prado",
      price: "$299.000.000",
      category: "Vehículo de Gasolina o Diesel",
      photoUrl:
        "https://s3-alpha-sig.figma.com/img/67e8/031d/1173fdd4e3b2b5aa0887f485e7de8daf?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GGehQPNwuJAlv7lZNmfpbyq1c3ViDOM8UF84~6aeYRHcgwVmK9BMe9TlCSX157tAn1K8THdrF5dvziXK1ZfCI0ZLNoB7kgA7C6uev3AWJ~MKi2x1-qbMLu6TfPDzK8IO~v4yQSqPBek07jZYQwJthJWN21UC4z1xM0NGajJbdHaO3x~Uk7d9Xh9wTgTMu67DD2fkfI21riZOLuya8i1x5ID7XOjwjqjdPo7Yuv0c2SpKoUqBW8pyRrpX3uSDBdqwa7GUoEWk7ZBZlUWpHleRJPIRq4NGkKg21WxEk-udJ7Vrrl3rfVKJkKicdfd8JXaGUGn9W8bxs9JKMiCnEjayhA__",
    },
    {
      id: 4,
      type: "Sedan",
      model: "Toyota Corolla",
      price: "$299.000,000",
      category: "Vehículo híbrido",
      photoUrl:
        "https://s3-alpha-sig.figma.com/img/430b/0e73/40a5a94033a0472aad8f3d3d80ea5264?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NpxHLlgvCTUvZCkKP5P9fBZvuW5~Ihi~9dXaRZEccFrmscsS2JPomz~9~qwcT8LGQSL8Fy0qjXpkVJKsX21nawVdALB6KKr3bW7YBkmQhe9vPbMVHykoiystzEwnhZvFc2IxOh-4ND9ft3V8eCzXoY3xaOwLmcrX58FO3usWxft5pw1wgb-XfahJhNg3BexlAhkuzvhPQayWxhwL1aawdXRqC47TVlN-TLlOxHItBR68X5j25RkEMOm3nnE2BDiT9lK1SAb4SxOrEqEMsQgcHejIYrmLgliROcCI96lohY9YQsFxE7chSFH8CV31XjyPgmNygI8Zt5ljsKoKbEXFYA__",
    },
    {
      id: 5,
      type: "Camioneta",
      model: "Land Cruiser Prado",
      price: "$299.000.000",
      category: "Vehículo de Gasolina o Diesel",
      photoUrl:
        "https://s3-alpha-sig.figma.com/img/67e8/031d/1173fdd4e3b2b5aa0887f485e7de8daf?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GGehQPNwuJAlv7lZNmfpbyq1c3ViDOM8UF84~6aeYRHcgwVmK9BMe9TlCSX157tAn1K8THdrF5dvziXK1ZfCI0ZLNoB7kgA7C6uev3AWJ~MKi2x1-qbMLu6TfPDzK8IO~v4yQSqPBek07jZYQwJthJWN21UC4z1xM0NGajJbdHaO3x~Uk7d9Xh9wTgTMu67DD2fkfI21riZOLuya8i1x5ID7XOjwjqjdPo7Yuv0c2SpKoUqBW8pyRrpX3uSDBdqwa7GUoEWk7ZBZlUWpHleRJPIRq4NGkKg21WxEk-udJ7Vrrl3rfVKJkKicdfd8JXaGUGn9W8bxs9JKMiCnEjayhA__",
    },
    {
      id: 6,
      type: "Sedan",
      model: "Toyota Corolla",
      price: "$299.000,000",
      category: "Vehículo híbrido",
      photoUrl:
        "https://s3-alpha-sig.figma.com/img/430b/0e73/40a5a94033a0472aad8f3d3d80ea5264?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NpxHLlgvCTUvZCkKP5P9fBZvuW5~Ihi~9dXaRZEccFrmscsS2JPomz~9~qwcT8LGQSL8Fy0qjXpkVJKsX21nawVdALB6KKr3bW7YBkmQhe9vPbMVHykoiystzEwnhZvFc2IxOh-4ND9ft3V8eCzXoY3xaOwLmcrX58FO3usWxft5pw1wgb-XfahJhNg3BexlAhkuzvhPQayWxhwL1aawdXRqC47TVlN-TLlOxHItBR68X5j25RkEMOm3nnE2BDiT9lK1SAb4SxOrEqEMsQgcHejIYrmLgliROcCI96lohY9YQsFxE7chSFH8CV31XjyPgmNygI8Zt5ljsKoKbEXFYA__",
    },
    {
      id: 7,
      type: "Camioneta",
      model: "Land Cruiser Prado",
      price: "$299.000.000",
      category: "Vehículo de Gasolina o Diesel",
      photoUrl:
        "https://s3-alpha-sig.figma.com/img/67e8/031d/1173fdd4e3b2b5aa0887f485e7de8daf?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GGehQPNwuJAlv7lZNmfpbyq1c3ViDOM8UF84~6aeYRHcgwVmK9BMe9TlCSX157tAn1K8THdrF5dvziXK1ZfCI0ZLNoB7kgA7C6uev3AWJ~MKi2x1-qbMLu6TfPDzK8IO~v4yQSqPBek07jZYQwJthJWN21UC4z1xM0NGajJbdHaO3x~Uk7d9Xh9wTgTMu67DD2fkfI21riZOLuya8i1x5ID7XOjwjqjdPo7Yuv0c2SpKoUqBW8pyRrpX3uSDBdqwa7GUoEWk7ZBZlUWpHleRJPIRq4NGkKg21WxEk-udJ7Vrrl3rfVKJkKicdfd8JXaGUGn9W8bxs9JKMiCnEjayhA__",
    },
    {
      id: 8,
      type: "Sedan",
      model: "Toyota Corolla",
      price: "$299.000,000",
      category: "Vehículo híbrido",
      photoUrl:
        "https://s3-alpha-sig.figma.com/img/430b/0e73/40a5a94033a0472aad8f3d3d80ea5264?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NpxHLlgvCTUvZCkKP5P9fBZvuW5~Ihi~9dXaRZEccFrmscsS2JPomz~9~qwcT8LGQSL8Fy0qjXpkVJKsX21nawVdALB6KKr3bW7YBkmQhe9vPbMVHykoiystzEwnhZvFc2IxOh-4ND9ft3V8eCzXoY3xaOwLmcrX58FO3usWxft5pw1wgb-XfahJhNg3BexlAhkuzvhPQayWxhwL1aawdXRqC47TVlN-TLlOxHItBR68X5j25RkEMOm3nnE2BDiT9lK1SAb4SxOrEqEMsQgcHejIYrmLgliROcCI96lohY9YQsFxE7chSFH8CV31XjyPgmNygI8Zt5ljsKoKbEXFYA__",
    },
  ];

  return (
    <View paddingTop="80px" paddingBottom="115px">
      <Flex direction="column" alignItems="center">
        <Image src="/assets/images/site_logo.svg" alt="Toyota" />
        <View textAlign="center" marginTop="75px">
          <Text fontSize="xxl">Bienvenido</Text>
          <Text fontSize="xxxl" marginTop="4px">
            ¿Qué vehículo estás buscando?
          </Text>
          <Flex marginTop="58px" gap="15px" justifyContent="center">
            <CategorySearchBar
              categoryList={[
                { label: "Carros", value: "carros" },
                { label: "Camionetas", value: "camionetas" },
              ]}
              onSearch={() => {}}
              selectedCategory={{ label: "Camionetas", value: "camionetas" }}
            />
          </Flex>
        </View>
        <CarList carList={carList} />
      </Flex>
    </View>
  );
}
