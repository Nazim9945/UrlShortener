import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { axiosInstance } from "./helper/axiosInstance";
import { Link } from "react-router";



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
      
      const res=await axiosInstance.post('/api/create',{url});

    
      if (!res.data) throw new Error("Failed to shorten URL");

      const {data}=res;
      setShortUrl(data.shortUrl);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <Link
        to="/login"
       
        className="absolute top-4 right-4 bg-white border border-gray-200 text-blue-600 px-3 py-1 rounded-xl shadow-sm hover:bg-gray-50 transition-all"
      >
        Sign In
      </Link>
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
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-gray-50 text-blue-600"
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigator.clipboard.writeText(shortUrl);
                  const button = document.activeElement as HTMLElement;
                  const originalText = button.innerText;
                  button.innerText = "Copied!";
                  setTimeout(() => {
                    button.innerText = originalText;
                  }, 2000);
                  toast("Copied!", {
                    duration: 2000,
                    icon: "👏",
                    style: {
                      borderRadius: "10px",
                      background: "#333",
                      color: "#fff",
                    },
                  });
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-all"
              >
                Copy
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default App;

