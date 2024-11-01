"use client";

import { SpecList } from "@/components/SpecList/SpecList";
import { FeatureList } from "@/components/FeatureList/FeatureList";
import { QRCard } from "@/components/QrCard/QrCard";
import { CTASection } from "@/components/CTASection/CTASection";
import { use, useEffect, useState } from "react";
import ModalWithStepper from "@/components/ModalWithStepper/ModalWithStepper";
import { CarDetail } from "@/components/CarDetail/CarDetail";
import { ColorList } from "@/components/ColorList/ColorList";
import Gallery from "@/components/Gallery/Gallery";
import { Button, Flex, Image, Text, View } from "@aws-amplify/ui-react";
import { Select } from "@/components/Select/Select";
import { useRouter } from "next/navigation";
import { ColorOption, Vehicle, VehicleModel } from "@/types";
import { Option } from "@/components/CategorySearchBar/CategorySearchBar";

export default function DetailContainer({
  vehicle,
  vehicleList,
}: {
  vehicle: Vehicle;
  vehicleList: Option[];
}) {
  const router = useRouter();
  const [isModalOpenStepper, setIsModalOpenStepper] = useState(false);
  const openModal = () => setIsModalOpenStepper(true);
  const closeModal = () => setIsModalOpenStepper(false);

  const modelOptionsList = vehicle?.models?.items.map((option) => ({
    label: option?.name,
    value: option?.id,
  }));

  const [selectedModel, setSelectedModel] = useState<VehicleModel | undefined>(
    vehicle?.models?.items[0]
  );

  const [selectedColor, setSelectedColor] = useState<ColorOption | undefined>(
    selectedModel?.colors?.items[0]
  );

  useEffect(() => {
    if (selectedModel) {
      setSelectedColor(selectedModel.colors.items[0]);
    }
  }, [selectedModel]);

  const handleRedirect = () => {
    router.push("/");
  };

  const itemCTASection = {
    title: "Ingresa tus datos para cotizar este vehículo",
    textButton: "Cotizar Vehículo",
    callback: openModal,
  };

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
      <View maxWidth="2400px" margin="0 auto" position="relative">
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
          onClick={() => router.push("/")}
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
            <Text fontSize="xxl">Explora tu</Text>
            <Text fontSize="xxxl" marginTop="4px">
              {vehicle.name}
            </Text>
            <Flex marginTop="48px" marginBottom="60px" gap="15px">
              {vehicle && (
                <Select
                  options={vehicleList}
                  onSelect={(selected) => {
                    router.push(`/detail/${selected?.value}`);
                  }}
                  selectedOption={vehicleList.find(
                    (elem) => elem.value === vehicle.id
                  )}
                />
              )}
              {selectedModel &&
                modelOptionsList &&
                modelOptionsList.length > 0 && (
                  <Select
                    options={modelOptionsList || []}
                    onSelect={(selected) =>
                      setSelectedModel(
                        vehicle?.models?.items?.find(
                          (elem) => elem.id === selected?.value
                        )
                      )
                    }
                    selectedOption={modelOptionsList?.find(
                      (elem) => elem.value === selectedModel?.id
                    )}
                  />
                )}
            </Flex>
          </View>
          {vehicle && selectedModel && selectedColor && (
            <CarDetail
              car={vehicle}
              selectedColor={selectedColor}
              selectedModel={selectedModel}
              onClickCta={openModal}
            />
          )}
          {selectedModel && <FeatureList details={selectedModel as any} />}
          {selectedModel && (
            <ColorList
              colorLists={selectedModel?.colors?.items as any}
              onSelect={(selected) =>
                setSelectedColor(
                  selectedModel?.colors.items?.find(
                    (elem) => elem.id === selected?.id
                  )
                )
              }
            />
          )}
          {vehicle && <SpecList details={vehicle as any} />}
          {vehicle && <QRCard datasheetURL={vehicle.datasheetURL} />}
          <CTASection item={itemCTASection} />
          {vehicle?.galleryPictures?.items &&
            vehicle.galleryPictures.items.length > 0 && (
              <Gallery
                height={656}
                gap={10}
                imageList={vehicle.galleryPictures.items as any}
              />
            )}
          <ModalWithStepper
            isOpen={isModalOpenStepper}
            onClose={closeModal}
            onRedirect={handleRedirect}
            description="Land Cruiser Prado First Edition"
          />
        </Flex>
      </View>
      <ModalWithStepper
        isOpen={isModalOpenStepper}
        onClose={closeModal}
        onRedirect={handleRedirect}
        description={vehicle.name}
      />
    </View>
  );
}
