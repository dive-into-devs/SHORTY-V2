import connectDB from "@/lib/mongodb";
import Url from "@/models/Url";

// This is a server component; Next.js runs this on the server
export default async function RedirectPage({ params }) {
  const { shortCode } = params;
  await connectDB();
  const urlDoc = await Url.findOneAndUpdate(
    { shortCode },
    { $inc: { clicks: 1 } },
    { new: true }
  ).lean();

  if (!urlDoc) {
    // Not found: show 404 or a message
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-red-700">
        <h1 className="text-3xl font-bold mb-4">404 - Not Found</h1>
        <p>This short URL does not exist.</p>
      </div>
    );
  }

  // If found, redirect to the original URL
  // Use Next.js redirect for App Router
  // (Import from next/navigation)
  // Note: redirect() must be used at the top-level, not in event handlers

  // Dynamic import (not top of file) to avoid 'use client' conflicts
  const { redirect } = await import("next/navigation");
  redirect(urlDoc.longUrl);
}
