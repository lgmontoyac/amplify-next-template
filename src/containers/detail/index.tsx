"use client";

import { SpecList } from "@/components/SpecList/SpecList";
import { FeatureList } from "@/components/FeatureList/FeatureList";
import { QRCard } from "@/components/QrCard/QrCard";
import { CTASection } from "@/components/CTASection/CTASection";
import { useState } from "react";
import ModalWithStepper from "@/components/ModalWithStepper/ModalWithStepper";
import { CarDetail } from "@/components/CarDetail/CarDetail";
import { ColorList } from "@/components/ColorList/ColorList";
import Gallery from "@/components/Gallery/Gallery";
import { Button, Flex, Image, Text, View } from "@aws-amplify/ui-react";
import { Select } from "@/components/Select/Select";
import { useRouter } from "next/navigation";
import { useVehicles } from "@/context/VehiclesProvider";

export default function DetailContainer({ vehicleId }: { vehicleId: string }) {
  const { vehicles, specifications, featureList, colorLists } = useVehicles();
  const router = useRouter();
  const [isModalOpenStepper, setIsModalOpenStepper] = useState(false);

  const openModal = () => setIsModalOpenStepper(true);
  const closeModal = () => setIsModalOpenStepper(false);

  const itemCTASection = {
    title: "Ingresa tus datos para cotizar este vehículo",
    textButton: "Cotizar Vehículo",
    callback: openModal,
  };

  const getVehicleById = (id: string) => {
    return vehicles.find((car) => car.id.toString() === id);
  };

  if (!vehicles || !specifications || !featureList || !colorLists) return null;

  if (
    vehicles.length === 0 ||
    specifications.length === 0 ||
    featureList.length === 0 ||
    colorLists.length === 0
  ) {
    return (
      <View height="100%">
        <Text>No hay vehículos para mostrar</Text>
      </View>
    );
  }

  return (
    <View position="relative" paddingTop="80px" paddingBottom="115px">
      <View
        backgroundColor="#E8EEF2"
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        maxHeight="800px"
        style={{ zIndex: -1 }}
      />
      <View maxWidth="2000px" margin="0 auto" position="relative">
        <Button
          position="absolute"
          left="0"
          top="0"
          display="flex"
          justifyContent="center"
          alignItems="center"
          aria-label="save"
          gap="20px"
          size="small"
          onClick={() => router.push("/list")}
          style={{
            border: "none",
          }}
        >
          <Image alt="Next" src="/icons/back.svg" />
          <Text fontSize="xxl" fontWeight="400">
            Volver
          </Text>
        </Button>
        <Flex direction="column" gap="90px" alignItems="center">
          <Image src="/assets/images/site_logo.svg" alt="Toyota" />
          <View textAlign="center">
            <Text fontSize="xxl">Explora la</Text>
            <Text fontSize="xxxl" marginTop="4px">
              Land Cruiser Prado
            </Text>
            <Flex marginTop="48px" marginBottom="60px" gap="15px">
              <Select
                options={[
                  { label: "Carros", value: "carros" },
                  { label: "Camionetas", value: "camionetas" },
                ]}
                onSelect={() => {}}
                selectedOption={{
                  label: "Camionetas",
                  value: "camionetas",
                }}
              />
              <Select
                options={[
                  { label: "Carros", value: "carros" },
                  { label: "Camionetas", value: "camionetas" },
                ]}
                onSelect={() => {}}
                selectedOption={{ label: "Carros", value: "carros" }}
              />
              <Button
                borderRadius="50%"
                height="100px"
                width="100px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize={22}
                aria-label="save"
                onClick={() => {}}
                style={{
                  border: "none",
                }}
              >
                <Image alt="Next" src="/icons/search.svg" />
              </Button>
            </Flex>
          </View>
          <CarDetail car={getVehicleById(vehicleId)} />
          <FeatureList featureList={featureList} />
          <ColorList colorLists={colorLists} />
          <SpecList specifications={specifications} />
          <QRCard />
          <CTASection item={itemCTASection} />
          <Gallery height={600} gap={10} />
          <ModalWithStepper isOpen={isModalOpenStepper} onClose={closeModal} />
        </Flex>
      </View>
      <ModalWithStepper isOpen={isModalOpenStepper} onClose={closeModal} />
    </View>
  );
}
