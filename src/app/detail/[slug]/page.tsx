import DetailContainer from "@/containers/detail";

export default async function Detail({ params }: { params: { slug: string } }) {
  const vehicleId = params.slug;
  return <DetailContainer vehicleId={vehicleId} />;
}
