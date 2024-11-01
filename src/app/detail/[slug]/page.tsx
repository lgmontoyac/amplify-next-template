import DetailContainer from "@/containers/detail";
import { getVehicles, getVehiclesIds } from "@/services/apiService";
import { fetchImageUrl } from "@/services/filesService";
import { ColorOption, Vehicle } from "@/types";

export async function generateStaticParams() {
  const idList = await getVehiclesIds();
  return idList?.map((id: string) => ({ slug: id }));
}

export default async function Detail({ params }: { params: { slug: string } }) {
  const vehicleId = params.slug;
  const vehicles: Vehicle[] = await getVehicles();

  const vehicleList = vehicles.map((vehicle) => ({
    label: vehicle.name,
    value: vehicle.id,
  }));

  const vehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);

  vehicle?.models?.items.sort((a, b) => a.priority - b.priority);

  vehicle?.models?.items.forEach((item) => {
    item.colors?.items.sort((a, b) => a.priority - b.priority);
  });

  if (!vehicle) return null;
  // Obtener el logo del vehículo
  const logoUrl = await fetchImageUrl(vehicle?.logoImageURL || "");
  // Procesar los colores para cada modelo
  const updatedModels = await Promise.all(
    vehicle.models?.items.map(async (model) => {
      const colors = model.colors?.items || [];

      const updatedColors = await Promise.all(
        colors?.map(async (color: ColorOption) => {
          const iconUrl = await fetchImageUrl(color?.iconPath || "");
          const photoUrl = await fetchImageUrl(color?.imagePath || "");
          return {
            ...color,
            photoUrl: photoUrl?.toString(),
            iconUrl: iconUrl?.toString(),
          };
        })
      );

      return {
        ...model,
        colors: {
          ...model.colors,
          items: updatedColors,
        },
      };
    }) || []
  );

  const updatedGallery = await Promise.all(
    vehicle.galleryPictures?.items.map(async (picture) => {
      const photoUrl = await fetchImageUrl(picture?.imagePath || "");
      return {
        ...picture,
        photoUrl: photoUrl?.toString(),
      };
    }) || []
  );

  const vehicleWithImages = {
    ...vehicle,
    logoImageUrlFull: logoUrl?.toString(),
    models: {
      ...vehicle.models,
      items: updatedModels,
    },
    galleryPictures: {
      ...vehicle.galleryPictures,
      items: updatedGallery,
    },
  };

  return (
    <DetailContainer vehicle={vehicleWithImages} vehicleList={vehicleList} />
  );
}
