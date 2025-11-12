import {  type ReactNode } from "react";

import { Navigate } from "react-router"; 

import useCheckUser from "../hooks/useCheckUser";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  

const{user,isLoading}=useCheckUser()
  if (!user) {
    return <Navigate to="/" />;
  }

  return <>{isLoading ? <div>Loading...</div> : children}</>;
};
