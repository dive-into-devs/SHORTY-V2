"use client";
import { useState } from "react";

export default function ShortenForm() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setShortUrl("");
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ longUrl }),
    });
    const data = await res.json();
    if (res.ok) {
      setShortUrl(data.shortUrl);
      setLongUrl("");
    } else {
      setError(data.error || "Failed to shorten URL");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >
        <h1 className="text-2xl font-bold text-blue-700 mb-2">Shorten a URL</h1>
        <input
          type="url"
          placeholder="Paste your long URL here"
          value={longUrl}
          onChange={e => setLongUrl(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold text-lg shadow hover:bg-blue-700 transition-colors duration-200"
        >
          Shorten
        </button>
        {shortUrl && (
          <div className="mt-4 text-center">
            <div className="text-green-700 font-medium">
              Short URL:
              <a
                href={shortUrl}
                className="ml-2 text-blue-700 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {shortUrl}
              </a>
            </div>
          </div>
        )}
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>
    </div>
  );
}
