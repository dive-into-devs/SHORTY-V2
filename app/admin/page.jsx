import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Url from "@/models/Url";
import AdminPanel from "./AdminPanel";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  await connectDB();
  const user = await User.findOne({ email: session.user.email });
  if (!user?.isAdmin) redirect("/");

  // Fetch all users and all urls, with owner populated
  const users = await User.find().lean();
  const urls = await Url.find().populate("owner").sort({ createdAt: -1 }).lean();

  // Ensure all data is serializable
  const safeUsers = users.map(u => ({
    _id: u._id.toString(),
    email: u.email,
    name: u.name,
    isAdmin: u.isAdmin,
    banned: u.banned,
  }));

  const safeUrls = urls.map(url => ({
    _id: url._id.toString(),
    longUrl: url.longUrl,
    shortCode: url.shortCode,
    clicks: url.clicks,
    createdAt: url.createdAt.toISOString(),
    owner: url.owner ? {
      _id: url.owner._id?.toString() || "",
      email: url.owner.email || "",
    } : {},
  }));

  return <AdminPanel users={safeUsers} urls={safeUrls} />;
}
