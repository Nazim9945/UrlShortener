// import { useEffect, useState } from "react";
import { axiosInstance } from "../helper/axiosInstance";
import { useAuth } from "../context/store";
import {  useQuery } from "@tanstack/react-query";

const useCheckUser = () => {
  const { user, isAuth } = useAuth();
  // const [isLoading, setLoading] = useState(false);
  const {isLoading}=useQuery({
    queryKey:['isLoggedInUser'],
    queryFn:()=>{
       axiosInstance.get("/api/auth/me").then(res=>{
         console.log(res);
         isAuth(res.data)
         return res.data
       });
      
    }
  })
  
  
 
  // const meProfile = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await axiosInstance.get("api/auth/me");
  //     isAuth(res.data.user);
  //   } catch (err) {
  //     console.error(err);
  //     isAuth(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   meProfile();
  // }, []);
  return { isLoading, user };
};
export default useCheckUser;
