export interface Vehicle {
    id: number;
    type: string;
    model: string;
    submodel?: string;
    price: string;
    category: string;
    logoUrl: string;
    photoUrl: string;
 }
 
export interface Specification {
    img: {
      alt: string;
      src: string;
    };
    title: string;
    description: string;
  }
  
  export interface Feature {
    img: {
      src: string;
      alt: string;
    };
    title: string;
    contain: boolean;
  }
  
  export interface ColorOption {
    id: number;
    img: string;
    title: string;
  }