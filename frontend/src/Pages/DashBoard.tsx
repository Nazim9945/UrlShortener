
// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../helper/axiosInstance";

// interface ShortUrl {
//   id: string;
//   shortUrl: string;
//   fullUrl: string;
//   customName?: string;
//   clicks: number;
// }

// const DashBoard: React.FC = () => {
//   const [url, setUrl] = useState("");
//   const [customName, setCustomName] = useState("");
//   const [urls, setUrls] = useState<ShortUrl[]>([]);

//   const handleSubmit = async(e: React.FormEvent) => {
//     e.preventDefault();
//     if (!url.trim()) return;

//     // Simulate a short URL
//     const res = await axiosInstance.post(
//        "/api/create",
//       { url,slug:customName }
//     );

//     if (!res.data) throw new Error("Failed to shorten URL");
//     const { data } = res;
//     setUrls([...urls,data.newdoc])
  
   
//     setCustomName("");
//   };
//   const getAllUrls=async()=>{
//      const res = await axiosInstance.get('/api/allUrls');

//      console.log(res);
//      setUrls(res.data.urls)
//   }
//   useEffect(()=>{
//    getAllUrls()

//   },[])
//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
//       <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           🔗 URL Shortener
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Enter URL
//             </label>
//             <input
//               type="url"
//               value={url}
//               onChange={(e) => setUrl(e.target.value)}
//               placeholder="https://example.com"
//               required
//               className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Custom Name (optional)
//             </label>
//             <input
//               type="text"
//               value={customName}
//               onChange={(e) => setCustomName(e.target.value)}
//               placeholder="my-custom-link"
//               className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition-colors"
//           >
//             Shorten URL
//           </button>
//         </form>

//         {urls?.length > 0 && (
//           <div className="mt-6">
//             <h2 className="text-lg font-semibold text-gray-700 mb-2">
//               Your Shortened URLs
//             </h2>
//             <div className="max-h-64 overflow-y-auto border-t border-gray-200 pt-2 space-y-2">
//               {urls.map((item) => (
//                 <div
//                   key={item.shortUrl}
//                   className="bg-gray-100 p-3 rounded-md space-y-2"
//                 >
//                   <div className="text-sm text-gray-600 truncate">
//                     <span className="font-medium">Original: </span>
//                     {item.fullUrl}
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <div className="truncate">
//                       <a
//                         href={`http://localhost:3000/` + item.shortUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-600 text-sm hover:underline"
//                       >
//                         {`http://localhost:3000/` + item.shortUrl}
//                       </a>
//                     </div>
                      
//                     <div
//                       className={`text-sm ${
//                         item.clicks > 10
//                           ? "text-red-600"
//                           : item.clicks >= 5
//                           ? "text-yellow-500"
//                           : "text-blue-600"
//                       }`}
//                     >
//                       {item.clicks} clicks
//                     </div>
                    
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DashBoard;


// ...existing code...
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";
import { axiosInstance } from "../helper/axiosInstance";

interface ShortUrl {
  id?: string;
  _id?: string;
  shortUrl: string;
  fullUrl: string;
  customName?: string;
  clicks: number;
  createdAt?: string;
}

const DashBoard: React.FC = () => {
  const [url, setUrl] = useState("");
  const [customName, setCustomName] = useState("");
  const [urls, setUrls] = useState<ShortUrl[]>([]);
  const [loadingUrls, setLoadingUrls] = useState(false);
  const [creating, setCreating] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const getAllUrls = async () => {
    setLoadingUrls(true);
    try {
      const res = await axiosInstance.get("/api/allUrls");
      const list: ShortUrl[] = res.data?.urls ?? [];
      // show newest first (if backend doesn't provide sorting)
      setUrls([...list].reverse());
    } catch (err) {
      console.error("Error fetching URLs:", err);
    } finally {
      setLoadingUrls(false);
    }
  };

  useEffect(() => {
    getAllUrls();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setCreating(true);
    try {
      const res = await axiosInstance.post("/api/create", {
        url,
        slug: customName || undefined,
      });
      const newDoc: ShortUrl = res.data?.newdoc;
      if (newDoc) {
        // add newest at front
        setUrls((prev) => [newDoc, ...prev]);
        setUrl("");
        setCustomName("");
      }
    } catch (err) {
      console.error("Error creating short URL:", err);
    } finally {
      setCreating(false);
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
            disabled={creating}
            className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition-colors disabled:opacity-60"
          >
            {creating ? "Shortening..." : "Shorten URL"}
          </button>
        </form>

        {loadingUrls ? (
          <div className="mt-6 text-center text-sm text-gray-500">Loading URLs...</div>
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

export default DashBoard;
// ...existing code...