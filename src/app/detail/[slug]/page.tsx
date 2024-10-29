import DetailContainer from "@/containers/detail";
import { getVehicleIds } from "@/services/apiService";

export async function generateStaticParams() {
  const vehicleIds = await getVehicleIds();

  return vehicleIds.map((id: number) => ({
    slug: id.toString(),
  }));
}

export default async function Detail({ params }: { params: { slug: string } }) {
  const vehicleId = Number(params.slug);
  const vehicleIds = await getVehicleIds();

  if (!vehicleIds.includes(vehicleId)) {
    return <p>Vehicle not found</p>;
  }

  return <DetailContainer vehicleId={vehicleId.toString()} />;
}
