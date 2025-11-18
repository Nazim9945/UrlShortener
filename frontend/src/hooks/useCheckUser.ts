
import { axiosInstance } from "../helper/axiosInstance";
import { useAuth } from "../context/store";
import {  useQuery } from "@tanstack/react-query";

const useCheckUser = () => {
  const { user, isAuth } = useAuth();
  
  const {isLoading}=useQuery({
    queryKey:['isLoggedInUser'],
    queryFn:()=>{
       axiosInstance.get("/api/auth/me").then(res=>{
         isAuth(res.data)
         return res.data
       });
      
    }
  })
  
  
 
 
  return { isLoading, user };
};
export default useCheckUser;
