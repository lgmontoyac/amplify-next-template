export interface Vehicle {
  priority: number;
  datasheetURL: string;
  name: string;
  segment: string;
  id: string;
  type: string;
  model: string;
  previewImageURL?: string;
  models?: {
    items: VehicleModel[];
  };
  price: string;
  category: string;
  logoUrl: string;
  logoImageURL?: string;
  photoUrl?: string;
  colors: {
    items: ColorOption[];
  };
  galleryPictures: {
    items: GalleryPicture[];
  }
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
  priority: number;
  iconPath: string;
  id: string;
  imagePath: string;
  name: string;
  photoUrl?: string;
  iconUrl?: string;
}

export interface GalleryPicture {
  id: string;
  imagePath: string;
  photoUrl?: string;
  coverText?: string;
}

export interface VehicleModel {
  id: string;
  name: string;
  price: string;
  shortName: string;
  hasAntilockBrakeSystem: boolean;
  hasElectronicStabilityControl: boolean;
  hasFrontCollisionAlert: boolean;
  hasChildRestraintSystem: boolean;
  priority: number;
  airbagsAmount: number;
  colors: {
    items: ColorOption[];
  };
  galleryPictures: GalleryPicture[];
}
