import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Url from "@/models/Url";
import UrlsList from "./UrlsList";

export default async function UrlsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  await connectDB();
  const urls = await Url.find({ owner: session.user.id }).sort({ createdAt: -1 });

  // Convert to plain object
  const safeUrls = urls.map((url) => ({
    _id: url._id.toString(),
    longUrl: url.longUrl,
    shortCode: url.shortCode,
    clicks: url.clicks,
    createdAt: url.createdAt.toISOString(),
  }));

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Your Shortened URLs</h1>
      <UrlsList urls={safeUrls} baseUrl={baseUrl} />
    </div>
  );
}
