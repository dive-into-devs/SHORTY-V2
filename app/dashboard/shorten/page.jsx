import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import ShortenForm from "./ShortenForm"; // import the client component

export default async function ShortenPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return <ShortenForm />;
}
