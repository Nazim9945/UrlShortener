

import toast from "react-hot-toast";
import { axiosInstance } from "../helper/axiosInstance";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import type { FormState } from "../components/RegisterForm";


const register=async({name,email,password}:FormState)=>{
     if (!name.trim() || !email.trim() || !password.trim()) {
       return;
     }
       return await axiosInstance.post("/api/auth/register", {
         name,
         email,
         password,
       });
}
const useRegister=()=>{
     const navigate = useNavigate();
    const userRegister=useMutation({
      mutationFn:register,
      onSuccess:()=>{
          toast.success("Account created");
          navigate("/DashBoard");
      },
      onError:(err:Error)=>{
        console.log("failed to Register ",err.message)
      }
      
    })
      async function handleRegister(form:{name:string,email:string,password:string}){
        
        

        
        
          return await userRegister.mutateAsync(form)
        
      }
      return {
        handleRegister,
        loading:userRegister.isPending,
        error:userRegister.error
      }

}

export default useRegister