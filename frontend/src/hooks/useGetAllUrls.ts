import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../helper/axiosInstance";
import type { ShortUrl } from "../Pages/DashBoardPage";

interface getAllUrls{
  urls:ShortUrl[]
}
const fetchAllUrls = async () => {
  const res = await axiosInstance.get<getAllUrls>("/api/allUrls");
  return res.data.urls
  
 
};

const useGetAllUrls = () => {
  

  const { data, isLoading, error } = useQuery<ShortUrl[],Error>({
    queryKey: ["allUrls"],
    queryFn: fetchAllUrls,  
  });

 

  return {
    urls: data ?? [],
    loadingUrls: isLoading,
    
    error,
  };
};

export default useGetAllUrls;
