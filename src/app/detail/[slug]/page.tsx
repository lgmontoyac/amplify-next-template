"use client";
import DetailContainer from "@/containers/detail";
import { useParams } from "next/navigation";

export default function Detail() {
  const params = useParams();
  return <DetailContainer vehicleId={params.slug?.toString() || ""} />;
}
