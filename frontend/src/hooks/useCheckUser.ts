import { useEffect, useState } from "react";
import { axiosInstance } from "../helper/axiosInstance";
import { useAuth } from "../context/store";

const useCheckUser = () => {
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
  return { isLoading, user };
};
export default useCheckUser;
