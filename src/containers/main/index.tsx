"use client";

import { Button, Image, View, Flex, Link } from '@aws-amplify/ui-react';

export default function MainContainer() {
  return (
    <View className="relative h-screen overflow-hidden">
      <video
        src="/assets/video/prado-reel.mp4"
        loop
        autoPlay
        muted
        preload="auto"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          height: '100vh',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <Image
          src="/assets/logo_Toyota.png"
          alt="Logo Toyota"
          width="674px"
          height="477px"
          style={{
            marginBottom: '1rem',
          }}
          className="responsive-img"
        />
        <Link href={`/list`}>
          <Button
            variation="primary"
            display="inline-flex"
            size="large"
            padding="25px 69px"
            fontSize="xl"
          >
            Conoce nuestros vehículos
          </Button>
        </Link>
      </Flex>
    </View>
  );
}