import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/mongodb";
import Url from "@/models/Url";

// Helper to generate a random short code
function generateShortCode(length = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { longUrl } = await req.json();
  if (!longUrl || !/^https?:\/\//i.test(longUrl)) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  await connectDB();

  // Make sure the code is unique
  let shortCode, exists;
  do {
    shortCode = generateShortCode();
    exists = await Url.findOne({ shortCode });
  } while (exists);

  const url = await Url.create({
    longUrl,
    shortCode,
    owner: session.user.id,
  });

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  return NextResponse.json({ shortUrl: `${baseUrl}/${shortCode}` });
}
