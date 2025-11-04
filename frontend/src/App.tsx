import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const App: React.FC = () => {
  const [url, setUrl] = useState("https://www.youtube.com");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShortUrl(null);

    try {
      // const res = await fetch("/api/shorten", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ fullUrl: url }),
      // });
      const res=await axios.post(`http://localhost:3000/api/create`,{url});

      console.log(res);
      if (!res.data) throw new Error("Failed to shorten URL");

      const {data}=res;
      setShortUrl(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          🔗 URL Shortener
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.example.com"
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            required
          />

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.95 }}
            className={`${
              loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
            } text-white rounded-xl py-2 font-medium transition-all`}
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </motion.button>
        </form>

        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
        )}

        {shortUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center"
          >
            <p className="text-gray-600">Your shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:underline"
            >
              {shortUrl}
            </a>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default App;
