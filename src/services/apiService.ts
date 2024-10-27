import { ColorOption, Feature, Specification, Vehicle } from "@/types";

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
     logoUrl: "/assets/images/logo.svg",
     photoUrl:
       "https://s3-alpha-sig.figma.com/img/430b/0e73/40a5a94033a0472aad8f3d3d80ea5264?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NpxHLlgvCTUvZCkKP5P9fBZvuW5~Ihi~9dXaRZEccFrmscsS2JPomz~9~qwcT8LGQSL8Fy0qjXpkVJKsX21nawVdALB6KKr3bW7YBkmQhe9vPbMVHykoiystzEwnhZvFc2IxOh-4ND9ft3V8eCzXoY3xaOwLmcrX58FO3usWxft5pw1wgb-XfahJhNg3BexlAhkuzvhPQayWxhwL1aawdXRqC47TVlN-TLlOxHItBR68X5j25RkEMOm3nnE2BDiT9lK1SAb4SxOrEqEMsQgcHejIYrmLgliROcCI96lohY9YQsFxE7chSFH8CV31XjyPgmNygI8Zt5ljsKoKbEXFYA__",
   },
   {
     id: 3,
     type: "Camioneta",
     model: "Land Cruiser Prado",
     price: "$299.000.000",
     category: "Vehículo de Gasolina o Diesel",
     logoUrl: "/assets/images/logo.svg",
     photoUrl:
       "https://s3-alpha-sig.figma.com/img/67e8/031d/1173fdd4e3b2b5aa0887f485e7de8daf?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GGehQPNwuJAlv7lZNmfpbyq1c3ViDOM8UF84~6aeYRHcgwVmK9BMe9TlCSX157tAn1K8THdrF5dvziXK1ZfCI0ZLNoB7kgA7C6uev3AWJ~MKi2x1-qbMLu6TfPDzK8IO~v4yQSqPBek07jZYQwJthJWN21UC4z1xM0NGajJbdHaO3x~Uk7d9Xh9wTgTMu67DD2fkfI21riZOLuya8i1x5ID7XOjwjqjdPo7Yuv0c2SpKoUqBW8pyRrpX3uSDBdqwa7GUoEWk7ZBZlUWpHleRJPIRq4NGkKg21WxEk-udJ7Vrrl3rfVKJkKicdfd8JXaGUGn9W8bxs9JKMiCnEjayhA__",
   },
   {
     id: 4,
     type: "Sedan",
     model: "Toyota Corolla",
     price: "$299.000,000",
     category: "Vehículo híbrido",
     logoUrl: "/assets/images/logo.svg",
     photoUrl:
       "https://s3-alpha-sig.figma.com/img/430b/0e73/40a5a94033a0472aad8f3d3d80ea5264?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NpxHLlgvCTUvZCkKP5P9fBZvuW5~Ihi~9dXaRZEccFrmscsS2JPomz~9~qwcT8LGQSL8Fy0qjXpkVJKsX21nawVdALB6KKr3bW7YBkmQhe9vPbMVHykoiystzEwnhZvFc2IxOh-4ND9ft3V8eCzXoY3xaOwLmcrX58FO3usWxft5pw1wgb-XfahJhNg3BexlAhkuzvhPQayWxhwL1aawdXRqC47TVlN-TLlOxHItBR68X5j25RkEMOm3nnE2BDiT9lK1SAb4SxOrEqEMsQgcHejIYrmLgliROcCI96lohY9YQsFxE7chSFH8CV31XjyPgmNygI8Zt5ljsKoKbEXFYA__",
   },
   {
     id: 5,
     type: "Camioneta",
     model: "Land Cruiser Prado",
     price: "$299.000.000",
     category: "Vehículo de Gasolina o Diesel",
     logoUrl: "/assets/images/logo.svg",
     photoUrl:
       "https://s3-alpha-sig.figma.com/img/67e8/031d/1173fdd4e3b2b5aa0887f485e7de8daf?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GGehQPNwuJAlv7lZNmfpbyq1c3ViDOM8UF84~6aeYRHcgwVmK9BMe9TlCSX157tAn1K8THdrF5dvziXK1ZfCI0ZLNoB7kgA7C6uev3AWJ~MKi2x1-qbMLu6TfPDzK8IO~v4yQSqPBek07jZYQwJthJWN21UC4z1xM0NGajJbdHaO3x~Uk7d9Xh9wTgTMu67DD2fkfI21riZOLuya8i1x5ID7XOjwjqjdPo7Yuv0c2SpKoUqBW8pyRrpX3uSDBdqwa7GUoEWk7ZBZlUWpHleRJPIRq4NGkKg21WxEk-udJ7Vrrl3rfVKJkKicdfd8JXaGUGn9W8bxs9JKMiCnEjayhA__",
   },
   {
     id: 6,
     type: "Sedan",
     model: "Toyota Corolla",
     price: "$299.000,000",
     category: "Vehículo híbrido",
     logoUrl: "/assets/images/logo.svg",
     photoUrl:
       "https://s3-alpha-sig.figma.com/img/430b/0e73/40a5a94033a0472aad8f3d3d80ea5264?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NpxHLlgvCTUvZCkKP5P9fBZvuW5~Ihi~9dXaRZEccFrmscsS2JPomz~9~qwcT8LGQSL8Fy0qjXpkVJKsX21nawVdALB6KKr3bW7YBkmQhe9vPbMVHykoiystzEwnhZvFc2IxOh-4ND9ft3V8eCzXoY3xaOwLmcrX58FO3usWxft5pw1wgb-XfahJhNg3BexlAhkuzvhPQayWxhwL1aawdXRqC47TVlN-TLlOxHItBR68X5j25RkEMOm3nnE2BDiT9lK1SAb4SxOrEqEMsQgcHejIYrmLgliROcCI96lohY9YQsFxE7chSFH8CV31XjyPgmNygI8Zt5ljsKoKbEXFYA__",
   },
   {
     id: 7,
     type: "Camioneta",
     model: "Land Cruiser Prado",
     price: "$299.000.000",
     category: "Vehículo de Gasolina o Diesel",
     logoUrl: "/assets/images/logo.svg",
     photoUrl:
       "https://s3-alpha-sig.figma.com/img/67e8/031d/1173fdd4e3b2b5aa0887f485e7de8daf?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GGehQPNwuJAlv7lZNmfpbyq1c3ViDOM8UF84~6aeYRHcgwVmK9BMe9TlCSX157tAn1K8THdrF5dvziXK1ZfCI0ZLNoB7kgA7C6uev3AWJ~MKi2x1-qbMLu6TfPDzK8IO~v4yQSqPBek07jZYQwJthJWN21UC4z1xM0NGajJbdHaO3x~Uk7d9Xh9wTgTMu67DD2fkfI21riZOLuya8i1x5ID7XOjwjqjdPo7Yuv0c2SpKoUqBW8pyRrpX3uSDBdqwa7GUoEWk7ZBZlUWpHleRJPIRq4NGkKg21WxEk-udJ7Vrrl3rfVKJkKicdfd8JXaGUGn9W8bxs9JKMiCnEjayhA__",
   },
   {
     id: 8,
     type: "Sedan",
     model: "Toyota Corolla",
     price: "$299.000,000",
     category: "Vehículo híbrido",
     logoUrl: "/assets/images/logo.svg",
     photoUrl:
       "https://s3-alpha-sig.figma.com/img/430b/0e73/40a5a94033a0472aad8f3d3d80ea5264?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NpxHLlgvCTUvZCkKP5P9fBZvuW5~Ihi~9dXaRZEccFrmscsS2JPomz~9~qwcT8LGQSL8Fy0qjXpkVJKsX21nawVdALB6KKr3bW7YBkmQhe9vPbMVHykoiystzEwnhZvFc2IxOh-4ND9ft3V8eCzXoY3xaOwLmcrX58FO3usWxft5pw1wgb-XfahJhNg3BexlAhkuzvhPQayWxhwL1aawdXRqC47TVlN-TLlOxHItBR68X5j25RkEMOm3nnE2BDiT9lK1SAb4SxOrEqEMsQgcHejIYrmLgliROcCI96lohY9YQsFxE7chSFH8CV31XjyPgmNygI8Zt5ljsKoKbEXFYA__",
   },
 ];
 const specifications = [
  {
    id: 1,  
    img: {
      alt: "Motor",
      src: "/assets/icons/icon_motor.svg",
    },
    title: "Motor",
    description: "T24A – 2.4 Litros Gasolina 278 hp / 430 Nm",
  },
  {
    id: 2,  
    img: {
      alt: "Velocidades",
      src: "/assets/icons/icon_velocidades.svg",
    },
    title: "Velocidades",
    description: "Manual de 6 velocidades",
  },
  {
    id: 3,  
    img: {
      alt: "Puertas",
      src: "/assets/icons/icon_puertas.svg",
    },
    title: "Puertas",
    description: "De 5 puertas, con portón trasero",
  },
  {
    id: 4,  
    img: {
      alt: "Pasajeros",
      src: "/assets/icons/icon_pasajeros.svg",
    },
    title: "Pasajeros",
    description: "Capacidad de 5 pasajeros",
  },
  {
    id: 5,  
    img: {
      alt: "Garantia",
      src: "/assets/icons/icon_garantia.svg",
    },
    title: "Garantía",
    description: "5 años o 120,000 Km",
  },
];

const featureList = [
  {
    id: 1,  
    img: {
      src: "/assets/icons/icon_ABS_aro.svg",
      alt: "SISTEMA ANTIBLOQUEO",
    },
    title: "SISTEMA ANTIBLOQUEO",
    contain: true,
  },
  {
    id: 2,  
    img: {
      src: "/assets/icons/icon_control_estabilidad.svg",
      alt: "CONTROL ELECTRÓNICO DE ESTABILIDAD",
    },
    title: "CONTROL ELECTRÓNICO DE ESTABILIDAD",
    contain: false,
  },
  {
    id: 3,  
    img: {
      src: "/assets/icons/icon_alerta.svg",
      alt: "ALERTA DE COLISIÓN FRONTAL",
    },
    title: "ALERTA DE COLISIÓN FRONTAL",
    contain: true,
  },
  {
    id: 4,  
    img: {
      src: "/assets/icons/icon_isofix.svg",
      alt: "SISTEMA DE SUJECIÓN INFANTIL",
    },
    title: "SISTEMA DE SUJECIÓN INFANTIL",
    contain: false,
  },
  {
    id: 5,  
    img: {
      src: "/assets/icons/icon_airbags.svg",
      alt: "BOLSAS DE AIRE (8)",
    },
    title: "BOLSAS DE AIRE (8)",
    contain: true,
  },
];

const colorLists = [
  {
    id: 1,  
    img: "/assets/colors/white.svg",
    title: "Super Blanco",
  },
  {
    id: 2,  
    img: "/assets/colors/gray.svg",
    title: "Gray",
  },
  {
    id: 3,  
    img: "/assets/colors/black.svg",
    title: "Black",
  },
];


export async function getVehicles(): Promise<Vehicle[]> {
   /*
   try {
      const response = await fetch("/api/cars");
      return await response.json();
   } catch (error) {
      console.error("Error fetching data: ", error);
      return [];
   }
      */

    return new Promise((resolve) => setTimeout(() => resolve(carList), 500));
}

export async function getSpecifications(): Promise<Specification[]> {
  /*const response = await fetch("/api/specifications");
  return response.json();*/

  return new Promise((resolve) => setTimeout(() => resolve(specifications), 500));
}

export async function getFeatureList(): Promise<Feature[]> {
  /*const response = await fetch("/api/features");
  return response.json();*/
  return new Promise((resolve) => setTimeout(() => resolve(featureList), 500));
}

export async function getColorList(): Promise<ColorOption[]> {
 /*const response = await fetch("/api/colors");
  return response.json();*/
  return new Promise((resolve) => setTimeout(() => resolve(colorLists), 500));
}