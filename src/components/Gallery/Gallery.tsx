import {
  Image,
  View,
  Grid,
  Flex,
  Text,
  Icon,
  Button,
} from "@aws-amplify/ui-react";
import * as React from "react";
import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import styles from "./Gallery.module.scss";

export interface Image {
  photoUrl: string;
  coverText?: string;
}

export interface GalleryProps {
  height?: number;
  imageList: { photoUrl: string; coverText?: string }[];
  gap?: number;
}

export default function Gallery({
  height = 300,
  imageList = [],
  gap = 20,
}: GalleryProps) {
  const [index, setIndex] = useState(-1);

  //function to change photoUrl to src and coverText to caption
  const formatImageList = (
    list: Image[]
  ): { src: string; caption?: string }[] => {
    return list.map((image) => ({
      src: image.photoUrl,
      caption: image.coverText,
    }));
  };

  const formattedList = formatImageList(imageList);
  const updateButtonPosition = () => {
    const currentSlide = document.querySelector(
      ".yarl__slide_current img"
    ) as HTMLImageElement;

    if (currentSlide) {
      const imageWidth = currentSlide.clientWidth;
      const imageHeight = currentSlide.clientHeight;
      const offset = -178;

      const prevButton = document.querySelector(
        ".yarl__navigation_prev"
      ) as HTMLElement;
      const nextButton = document.querySelector(
        ".yarl__navigation_next"
      ) as HTMLElement;
      const toolbar = document.querySelector(".yarl__toolbar") as HTMLElement;

      // Ajuste del cálculo para considerar el zoom aplicado
      const adjustedWindowWidth = window.innerWidth * 2;
      const adjustedWindowHeight = window.innerHeight * 2;

      if (prevButton && nextButton) {
        prevButton.style.left = `${
          (adjustedWindowWidth - imageWidth) / 2 + offset
        }px`;
        nextButton.style.right = `${
          (adjustedWindowWidth - imageWidth) / 2 + offset
        }px`;
      }

      if (toolbar) {
        toolbar.style.top = `${(adjustedWindowHeight - imageHeight) / 2}px`;
        toolbar.style.right = `${(adjustedWindowWidth - imageWidth) / 2}px`;
      }
    }
  };

  const renderImageWithOverlay = (
    image: { src: string; caption?: string },
    imageIndex: number
  ) => (
    <View
      key={imageIndex}
      position="relative"
      onClick={() => setIndex(imageIndex)}
      style={{ cursor: "pointer", width: "100%", height: "100%" }}
    >
      <Image
        src={image.src}
        alt={`Image ${imageIndex + 1}`}
        style={{
          display: "block",
          objectFit: "cover",
          width: "100%",
          height: "100%",
          objectPosition: "50% 50%",
        }}
      />
      {/*
      <Flex
        position="absolute"
        bottom="10px"
        left="0"
        right="0"
        justifyContent="center"
        alignItems="center"
      >
        <Text color="white" fontSize="xs">
          *Imágenes de referencia
        </Text>
      </Flex> */}
      {image.caption && (
        <Flex
          position="absolute"
          top="0"
          bottom="0"
          left="0"
          right="0"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          justifyContent="center"
          alignItems="center"
        >
          <Text color="white" fontSize="xxxl" textAlign="center">
            {image.caption}
          </Text>
        </Flex>
      )}
    </View>
  );

  return (
    <View
      style={{
        width: "100%",
        maxWidth: "2400px",
        height: "100%",
        margin: "0 auto",
      }}
    >
      <View textAlign="center" marginBottom="82px">
        <Text fontSize="xxxl">Explora la Potencia y Estilo</Text>
        <Text
          fontSize="xxxxl"
          fontWeight="400"
          lineHeight="xxxxl"
          marginTop="20px"
        >
          Galería Exclusiva del Vehículo
        </Text>
      </View>
      <Grid
        templateColumns="repeat(6, 1fr)"
        gap={gap}
        width="100%"
        style={{ height: "100%" }}
      >
        <View
          style={{
            gridColumn: "1 / span 2",
            gridRow: "1 / span 2",
            height: `${height}px`,
          }}
        >
          {renderImageWithOverlay(formattedList[0], 0)}
        </View>

        <View
          style={{
            gridColumn: "3 / span 2",
            gridRow: "1",
            height: `${height / 2 - gap / 2}px`,
          }}
        >
          {renderImageWithOverlay(formattedList[1], 1)}
        </View>
        <View
          style={{
            gridColumn: "3 / span 1",
            gridRow: "2",
            height: `${height / 2 - gap / 2}px`,
          }}
        >
          {renderImageWithOverlay(formattedList[2], 2)}
        </View>
        <View
          style={{
            gridColumn: "4 / span 1",
            gridRow: "2",
            height: `${height / 2 - gap / 2}px`,
          }}
        >
          {renderImageWithOverlay(formattedList[3], 3)}
        </View>

        <View
          style={{
            gridColumn: "5 / span 1",
            gridRow: "1",
            height: `${height / 2 - gap / 2}px`,
          }}
        >
          {renderImageWithOverlay(formattedList[4], 4)}
        </View>
        <View
          style={{
            gridColumn: "6 / span 1",
            gridRow: "1",
            height: `${height / 2 - gap / 2}px`,
          }}
        >
          {renderImageWithOverlay(formattedList[5], 5)}
        </View>
        <View
          style={{
            gridColumn: "5 / span 2",
            gridRow: "2",
            height: `${height / 2 - gap / 2}px`,
          }}
        >
          {renderImageWithOverlay(formattedList[6], 6)}
        </View>
      </Grid>
      <Lightbox
        index={index}
        slides={formattedList}
        open={index >= 0}
        close={() => setIndex(-1)}
        render={{
          slide: () => {
            updateButtonPosition();
            return undefined;
          },
          iconPrev: () => <NavButton direction="prev" />,
          iconNext: () => <NavButton direction="next" />,
        }}
        className={styles.lightbox}
      />
    </View>
  );
}

function NavButton({ direction }: { direction: "prev" | "next" }) {
  return (
    <Flex
      color="white"
      width="148px"
      height="400px"
      backgroundColor="black"
      justifyContent="center"
      alignItems="center"
      role="button"
      aria-label={direction == "prev" ? "Anterior" : "Siguiente"}
    >
      <Image
        width="56px"
        height="119px"
        alt={direction == "prev" ? "Anterior" : "Siguiente"}
        src="/icons/slidePrev.svg"
        style={{
          transform: direction === "next" ? "scaleX(-1)" : "none",
        }}
      />
    </Flex>
  );
}
