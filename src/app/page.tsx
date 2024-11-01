import ListContainer from "@/containers/list";
import { getVehicles } from "@/services/apiService";
import { fetchImageUrl } from "@/services/filesService";
import { Vehicle } from "@/types";
export default async function MainPage() {
  const vehicles: Vehicle[] = await getVehicles();

  vehicles.sort((a, b) => a.priority - b.priority);

  vehicles.forEach((item) => {
    item.models?.items.sort((a, b) => a.priority - b.priority);

    item.models?.items.forEach((model) => {
      model.colors?.items.sort((a, b) => a.priority - b.priority);
    });
  });

  const vehiclesWithPhotos = await Promise.all(
    vehicles.map(async (vehicle) => {
      const imagePath = vehicle.previewImageURL;
      const photoUrl = await fetchImageUrl(imagePath || "");
      return {
        ...vehicle,
        photoUrl: photoUrl?.toString(),
      };
    })
  );

  return <ListContainer vehicles={vehiclesWithPhotos} />;
}
