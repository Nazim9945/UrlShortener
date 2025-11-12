import {  type ReactNode } from "react";

import { Navigate } from "react-router"; 

import useCheckUser from "../hooks/useCheckUser";


export const OpenRoute = ({ children }: { children: ReactNode }) => {

  

  const { isLoading,user } = useCheckUser();

  if (user) {
    return <Navigate to="/DashBoard" />;
  }
  
  return <>{isLoading ? <div>Loading...</div> : children}</>;
};
