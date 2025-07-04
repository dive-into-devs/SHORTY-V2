import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/mongodb";
import Url from "@/models/Url";

// Edit the longUrl
export async function PATCH(req, context) {
  const params = await context.params; // Await params!
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { longUrl } = await req.json();
  if (!longUrl || !/^https?:\/\//i.test(longUrl)) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  await connectDB();

  const url = await Url.findOneAndUpdate(
    { _id: params.id, owner: session.user.id },
    { longUrl },
    { new: true }
  );

  if (!url) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ success: true, url });
}

// Delete the URL
export async function DELETE(req, context) {
  const params = await context.params; // Await params!
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();

  const url = await Url.findOneAndDelete({ _id: params.id, owner: session.user.id });

  if (!url) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ success: true });
}
