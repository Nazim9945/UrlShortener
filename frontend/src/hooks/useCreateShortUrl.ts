
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../helper/axiosInstance";
import type { FetchResponse } from "../Pages/DashBoardPage";


const createUrl=async ({url,customName}: {url: string,customName?: string}) => {
      const res = await axiosInstance.post<FetchResponse>("/api/create", {
        url,
        slug: customName,
      });

      if (!res.data) throw new Error("Failed to shorten URL");

      return res.data.newdoc;
    }
   

const useCreateShortUrl = () => {
 const queryClient=useQueryClient()
  const mutation = useMutation({
    mutationFn: createUrl,
    onSuccess: (data) => {
     console.log("inside create wala ",data)
     queryClient.invalidateQueries({ queryKey: ['allUrls'] })
    },
    onError:(err:Error)=>{
      console.log("failed while creating shortUrl ",err.message);
    }
  });
  
  const handleShorturl = async (url: string, customName?: string) => {
   
    const result = await mutation.mutateAsync({ url, customName });
    return result;
  };

  return {
    handleShorturl,
    loading: mutation.isPending,
    error: mutation.error?.message || null,
    shortUrl:mutation.data?.shortUrl,
  };
};

export default useCreateShortUrl;
