import DetailContainer from "@/containers/detail";
import { getVehicleIds } from "@/services/apiService"; // Asegúrate de que esta función esté definida en tu apiService

export async function generateStaticParams() {
  const vehicleIds = await getVehicleIds(); // Obtener los IDs desde tu apiService

  return vehicleIds.map((id: number) => ({
    slug: id.toString(),
  }));
}

export default async function Detail({ params }: { params: { slug: string } }) {
  const vehicleId = Number(params.slug); // Convertir el slug a un número

  // Obtener los IDs de vehículos desde tu apiService
  const vehicleIds = await getVehicleIds(); // Aquí necesitas obtener los IDs también

  if (!vehicleIds.includes(vehicleId)) {
    return <p>Vehicle not found</p>; // Mensaje de error si no se encuentra el vehículo
  }

  return <DetailContainer vehicleId={vehicleId.toString()} />;
}
