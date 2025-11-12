import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/store";
import { axiosInstance } from "../helper/axiosInstance";
import useGetAllUrls from "../hooks/useGetAllUrls";
import useCreateShortUrl from "../hooks/useCreateShortUrl";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export interface ShortUrl {
  id?: string;
  _id?: string;
  shortUrl: string;
  fullUrl: string;
  customName?: string;
  clicks: number;
  createdAt?: string;
}
export interface FetchResponse {
  newdoc: ShortUrl;
}

const DashBoardPage: React.FC = () => {
  const [url, setUrl] = useState("");
  const [customName, setCustomName] = useState<string>("");

  const [logoutLoading, setLogoutLoading] = useState(false);

  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const { loadingUrls, urls, setUrls } = useGetAllUrls();
  const { handleShorturl, loading, error, shortUrl } = useCreateShortUrl();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newDoc = await handleShorturl(url, customName);

    if (newDoc) {
      setUrls((prev) => [newDoc, ...prev]);
      setUrl("");
      setCustomName("");
    }
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await axiosInstance.post("/api/auth/logout");
      isAuth(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">🔗 URL Shortener</h1>
          <button
            onClick={handleLogout}
            disabled={logoutLoading}
            className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors disabled:opacity-60"
          >
            {logoutLoading ? "Logging out..." : "Logout"}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Enter URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Custom Name (optional)
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="my-custom-link"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition-colors disabled:opacity-60"
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
        </form>
        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
        )}

        {/* Copy Component */}

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
                value={import.meta.env.VITE_BASE_URL + "/" + shortUrl}
                readOnly
                className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-gray-50 text-blue-600"
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigator.clipboard.writeText(
                    import.meta.env.VITE_BASE_URL + "/" + shortUrl
                  );
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

        {/* All Shorten Urls */}

        {loadingUrls ? (
          <div className="mt-6 text-center text-sm text-gray-500">
            Loading URLs...
          </div>
        ) : (
          urls?.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Your Shortened URLs
              </h2>
              <div className="max-h-64 overflow-y-auto border-t border-gray-200 pt-2 space-y-2">
                {urls.map((item) => (
                  <div
                    key={item.shortUrl}
                    className="bg-gray-100 p-3 rounded-md space-y-2"
                  >
                    <div className="text-sm text-gray-600 truncate">
                      <span className="font-medium">Original: </span>
                      {item.fullUrl}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="truncate">
                        <a
                          href={`http://localhost:3000/${item.shortUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 text-sm hover:underline"
                        >
                          {`http://localhost:3000/${item.shortUrl}`}
                        </a>
                      </div>

                      <div
                        className={`text-sm ${
                          item.clicks > 10
                            ? "text-red-600"
                            : item.clicks >= 5
                            ? "text-yellow-500"
                            : "text-blue-600"
                        }`}
                      >
                        {item.clicks} clicks
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default DashBoardPage;
