import { useEffect, useState, type ReactNode } from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router"; 
import { axiosInstance } from "../helper/axiosInstance";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, isAuth } = useAuth();
  const [isLoading, setLoading] = useState(false);

  const meProfile = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("api/auth/me");
      isAuth(res.data.user);
    } catch (err) {
      console.error(err);
      isAuth(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    meProfile();
  }, []);

  if (!user) {
    return <Navigate to="/" />;
  }

  return <>{isLoading ? <div>Loading...</div> : children}</>;
};
