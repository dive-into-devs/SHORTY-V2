"use client";
import { useState, useEffect } from "react";
import Card from "../../components/Card"

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

    <li className="pb-2 flex flex-col justify-center items-start gap-1">
            <Card
            url={url}
          baseUrl={baseUrl}
          editing={editing}
          setEditing={setEditing}
          longUrl={longUrl}
          setLongUrl={setLongUrl}
          loading={loading}
          setLoading={setLoading}
          created={created}
          handleEdit={handleEdit}
          handleDelete={handleDelete}/>
    </li>
  );
}

// This is the main list component you import in your server component
export default function UrlsList({ urls, baseUrl }) {
  if (!urls || urls.length === 0) {
    return <div className="text-gray-500">No URLs yet. Go shorten one!</div>;
  }
  return (
    <ul className="flex flex-row justify-center items-center gap-10 flex-wrap mt-4 max-w-400">
      {urls.map((url) => (
        <UrlItem key={url._id} url={url} baseUrl={baseUrl} />
      ))}
    </ul>
  );
}
