
import toast from "react-hot-toast";
import { axiosInstance } from "../helper/axiosInstance";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";



export interface LoginForm {
  email: string;
  password: string;
}
const login=async({email,password}:LoginForm)=>{
       if (!email.trim() || !password.trim()) {
         return;
       }
        return await axiosInstance.post("/api/auth/login", {
          email,
          password,
        });
       
}
const useLogin=()=>{
    const navigate = useNavigate();
   
      const userLogin=useMutation({
        mutationFn:login,
        onSuccess:()=>{
             
                 toast.success("Logged in successfully");
                 navigate("/DashBoard");
               

        },
        onError:(err:Error)=>{
          console.log(err);
        }
      })

     async function handleLogin (email:string,password:string){
          return await userLogin.mutateAsync({email,password})
      }
     
      return {
        handleLogin,
        loading:userLogin.isPending,
        error:userLogin.error
      }
}
export default useLogin;