import  { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../helper/axiosInstance";
import { useNavigate } from "react-router";



export interface LoginForm {
  email: string;
  password: string;
}
const useLogin=()=>{
     const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);
      async function handleLogin(email:string,password:string){
             setError(null);
            
             if (!email.trim() || !password.trim()) {
               setError("Please enter both email and password.");
               return;
             }

             setLoading(true);
             try {
               const res = await axiosInstance.post("/api/auth/login", {
                 email,
                 password,
               });
               if (res?.data) {
                 toast.success("Logged in successfully");
                 navigate("/DashBoard");
               } else {
                 throw new Error("Invalid response from server");
               }
             } catch (err: any) {
               const msg =
                 err?.response?.data?.message || err?.message || "Login failed";
               setError(msg);
               toast.error(msg);
             } finally {
               setLoading(false);
             }
      }
      return {handleLogin,error,loading}
}
export default useLogin;