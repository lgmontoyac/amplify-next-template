import DetailContainer from "@/containers/detail";
import { getCacheVehicles } from "@/services/storeVehicles";
import { Vehicle } from "@/types";
import { generateSlug } from "@/utils/generateSlug";

// Función para crear un slug a partir del nombre del vehículo
export async function generateStaticParams() {
  const vehicles: Vehicle[] = await getCacheVehicles();
  return vehicles.map((vehicle: Vehicle) => ({
    slug: generateSlug(vehicle.name), // Genera el slug a partir del nombre
  }));
}

export const dynamic = "force-static";

export default async function Detail({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const vehicles: Vehicle[] = await getCacheVehicles();
  const vehicle = vehicles.find(
    (vehicle) => generateSlug(vehicle.name) === slug
  );

  vehicle?.models?.items.sort((a, b) => a.priority - b.priority);

  vehicle?.models?.items.forEach((item) => {
    item.colors?.items.sort((a, b) => a.priority - b.priority);
  });

  return (
    <DetailContainer
      vehicle={vehicle as unknown as Vehicle}
      vehicleList={vehicles.map((vehicle) => ({
        label: vehicle.name,
        value: generateSlug(vehicle.name),
      }))}
    />
  );
}
