export default function Card({
  url,
  baseUrl,
  editing,
  setEditing,
  longUrl,
  setLongUrl,
  loading,
  created,
  handleEdit,
  handleDelete
}) {
  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 mb-4 min-w-100">
      {/* Delete X button, absolutely positioned */}

      <div
      className="button absolute top-2 right-2 text-red-500 bg-red-100 hover:bg-red-300 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold focus:outline-none"
      onClick={handleDelete}

        disabled={loading}
        title="Delete"
        >
        <svg   viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>

      {/* Main card content */}
      <div className="flex flex-col justify-center items-center gap-6">
        {/* Original URL at top */}
        <div className="text-gray-400 text-m font-semibold break-words mb-2 bg-gray-200 p-3 py-1 rounded mt-4 flex flex-col">
          {editing ? (
            <form onSubmit={handleEdit} className="flex gap-2 items-center">
              <input
                className="border px-2 py-1 rounded w-full outline-green-600 text-black"
                type="url"
                value={longUrl}
                onChange={e => setLongUrl(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="text-white text-xs font-bold bg-green-500 px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="text-white text-xs font-bold bg-red-500 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              {url.longUrl}
              <div onClick={() => setEditing(true)}  className="button absolute top-2 left-2 text-green-600 bg-green-200 hover:bg-green-400 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold focus:outline-none">
                <svg

                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 inline-block mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487a2.13 2.13 0 0 1 3.016 3.016l-10.49 10.49a2 2 0 0 1-.878.51l-3.57.952a.5.5 0 0 1-.613-.613l.952-3.57a2 2 0 0 1 .51-.878l10.49-10.49z"
                  />
                </svg>
              </div>

            </>
          )}
        </div>

        {/* Short URL */}
        <div className="mt-2 mb-2">
          <a
            href={`${baseUrl}/${url.shortCode}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500  break-all font-mono text-lg font-bold"
          >
            {baseUrl}/{url.shortCode}
          </a>
        </div>

        {/* Created at */}
        <div className="text-gray-400 text-m mt-1 bg-gray-100 p-2 rounded">
          Created: {created}
          <span className="ml-4">Clicks: <b className="font-semibold text-green-500">{url.clicks || 0}</b></span>
        </div>
      </div>
    </div>
  );
}
