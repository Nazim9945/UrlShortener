import { useEffect, useState } from "react";
import { axiosInstance } from "../helper/axiosInstance";
import type { ShortUrl } from "../Pages/DashBoardPage";



const useGetAllUrls=()=>{
     const [urls, setUrls] = useState<ShortUrl[]>([]);
      const [loadingUrls, setLoadingUrls] = useState(false);
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
      return {urls,loadingUrls,setUrls}
}

export default useGetAllUrls