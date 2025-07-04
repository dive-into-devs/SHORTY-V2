"use client";
import { useState } from "react";

export default function AdminPanel({ users, urls }) {
  const [search, setSearch] = useState("");
  const [filteredUrls, setFilteredUrls] = useState(urls);

  function handleSearch(e) {
    const term = e.target.value.toLowerCase();
    setSearch(term);
    setFilteredUrls(
      urls.filter(
        url =>
          url.longUrl.toLowerCase().includes(term) ||
          (url.owner?.email || "").toLowerCase().includes(term)
      )
    );
  }

  async function handleBanUser(userId, banned) {
    await fetch(`/api/admin/user/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ banned }),
    });
    window.location.reload();
  }

  async function handleDeleteUrl(urlId) {
    await fetch(`/api/shorten/${urlId}`, { method: "DELETE" });
    window.location.reload();
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow space-y-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Admin Dashboard</h1>
      <div>
        <input
          className="w-full px-4 py-2 border rounded mb-4"
          type="text"
          placeholder="Search by email or long URL"
          value={search}
          onChange={handleSearch}
        />
        <h2 className="text-xl font-semibold mb-2">All Shortened URLs</h2>
        <ul className="divide-y">
          {filteredUrls.map((url) => (
            <li key={url._id} className="py-2 flex items-center justify-between">
              <div>
                <div className="text-blue-700">{url.shortCode}</div>
                <div className="text-gray-700 text-sm break-all">{url.longUrl}</div>
                <div className="text-xs text-gray-400">
                  By: {url.owner?.email || "Unknown"} | Clicks: {url.clicks}
                </div>
              </div>
              <button
                className="text-red-600 font-bold"
                onClick={() => handleDeleteUrl(url._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">All Users</h2>
        <ul className="divide-y">
          {users.map(user => (
            <li key={user._id} className="py-2 flex items-center justify-between">
              <div>
                <div className="font-semibold">{user.email}</div>
                <div className="text-xs text-gray-500">{user.name}</div>
                <div className="text-xs text-gray-400">
                  Role: {user.isAdmin ? "Admin" : "User"}
                </div>
                <div className="text-xs text-gray-400">
                  Banned: {user.banned ? "Yes" : "No"}
                </div>
              </div>
              <button
                className={`rounded px-3 py-1 ${
                  user.banned ? "bg-green-500" : "bg-red-500"
                } text-white`}
                onClick={() => handleBanUser(user._id, !user.banned)}
              >
                {user.banned ? "Unban" : "Ban"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
