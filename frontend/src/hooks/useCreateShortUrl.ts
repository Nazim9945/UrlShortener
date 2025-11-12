import { useState } from "react";
import { axiosInstance } from "../helper/axiosInstance";
import type { FetchResponse } from "../Pages/DashBoardPage";


const useCreateShortUrl=()=>{

     const [shortUrl, setShortUrl] = useState<string | null>(null);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState<string | null>(null);
     async function handleShorturl(url:string,customName?:string){
         setLoading(true);
         setError(null);
         setShortUrl(null);

         try {
           const res = await axiosInstance.post<FetchResponse>("/api/create", { url ,slug:customName});

           if (!res.data) throw new Error("Failed to shorten URL");

           const { data } = res;
           setShortUrl(data.newdoc.shortUrl);
           return data.newdoc
         } catch (err: any) {
           setError(err.message || "Something went wrong");
         } finally {
           setLoading(false);
         }
     }
     return {handleShorturl,loading,error,shortUrl}
    
}
export default useCreateShortUrl