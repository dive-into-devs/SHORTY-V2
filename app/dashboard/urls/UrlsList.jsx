"use client";
import { useState, useEffect } from "react";

function UrlItem({ url, baseUrl }) {
  const [created, setCreated] = useState(url.createdAt);
  const [editing, setEditing] = useState(false);
  const [longUrl, setLongUrl] = useState(url.longUrl);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCreated(new Date(url.createdAt).toLocaleString());
  }, [url.createdAt]);

  async function handleDelete() {
    if (!confirm("Delete this short URL?")) return;
    setLoading(true);
    await fetch(`/api/shorten/${url._id}`, { method: "DELETE" });
    window.location.reload();
  }

  async function handleEdit(e) {
    e.preventDefault();
    setLoading(true);
    await fetch(`/api/shorten/${url._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ longUrl }),
    });
    setEditing(false);
    setLoading(false);
    window.location.reload();
  }

  return (
    <li className="border-b pb-2">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium text-blue-700">
            <a
              href={`${baseUrl}/${url.shortCode}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {baseUrl}/{url.shortCode}
            </a>
          </div>
          <div className="text-gray-700 text-sm break-all">
            {editing ? (
              <form onSubmit={handleEdit} className="flex gap-2 items-center">
                <input
                  className="border px-2 py-1 rounded w-2/3"
                  type="url"
                  value={longUrl}
                  onChange={e => setLongUrl(e.target.value)}
                  required
                />
                <button type="submit" disabled={loading} className="text-green-700 font-semibold">Save</button>
                <button type="button" onClick={() => setEditing(false)} className="text-gray-400 ml-2">Cancel</button>
              </form>
            ) : (
              <>
                {url.longUrl}
                <button onClick={() => setEditing(true)} className="text-blue-500 text-xs ml-3">Edit</button>
              </>
            )}
          </div>
          <div className="text-gray-400 text-xs">
            Created: {created}
            <span className="ml-4">Clicks: {url.clicks || 0}</span>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="text-red-600 text-xs font-bold ml-4"
          disabled={loading}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

// This is the main list component you import in your server component
export default function UrlsList({ urls, baseUrl }) {
  if (!urls || urls.length === 0) {
    return <div className="text-gray-500">No URLs yet. Go shorten one!</div>;
  }
  return (
    <ul className="space-y-4">
      {urls.map((url) => (
        <UrlItem key={url._id} url={url} baseUrl={baseUrl} />
      ))}
    </ul>
  );
}
