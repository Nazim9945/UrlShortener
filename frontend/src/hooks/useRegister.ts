
import { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../helper/axiosInstance";
import { useNavigate } from "react-router";



const useRegister=()=>{
     const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);
      async function handleRegister(form:{name:string,email:string,password:string}){
        
         setError(null);

         const { name, email, password } = form;
         if (!name.trim() || !email.trim() || !password.trim()) {
           setError("Please fill out all fields.");
           return;
         }

         setLoading(true);
         try {
           const res = await axiosInstance.post("/api/auth/register", {
             name,
             email,
             password,
           });
           if (res?.data) {
             toast.success("Account created");
             navigate("/DashBoard");
           } else {
             throw new Error("Unexpected server response");
           }
         } catch (err: any) {
           const msg =
             err?.response?.data?.message ||
             err?.message ||
             "Registration failed";
           setError(msg);
           toast.error(msg);
         } finally {
           setLoading(false);
         }
      }
      return {handleRegister,loading,error}

}

export default useRegister