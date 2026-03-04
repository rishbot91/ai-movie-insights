"use client";

import { useState } from "react";

export default function Home() {
  const [imdbId, setImdbId] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleClick() {
    setError(null);

    const trimmed = imdbId.trim();

    // Validate IMDb format
    if (!/^tt\d{7,8}$/.test(trimmed)) {
      setError("Please enter a valid IMDb ID (example: tt0133093)");
      return;
    }

    alert("Valid IMDb ID. Next step will fetch movie data.");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

        <h1 className="text-2xl font-bold mb-4 text-black">
          AI Movie Insight Builder
        </h1>

        <input
          type="text"
          value={imdbId}
          onChange={(e) => setImdbId(e.target.value)}
          placeholder="Enter IMDb ID (example: tt0133093)"
          className="w-full border border-gray-400 rounded-lg px-4 py-2 mb-3 text-black"
        />

        <button
          onClick={handleClick}
          className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90"
        >
          Get Insights
        </button>

        {error && (
          <p className="text-red-600 mt-3 text-sm">
            {error}
          </p>
        )}

      </div>
    </main>
  );
}