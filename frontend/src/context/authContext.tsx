import { createContext, useContext, useState,type ReactNode } from "react";


interface User  {
  name: string;
  email: string;
}

interface AuthContextType  {
  user: User | null,
  isAuth:(userData:User|null)=>void
};

// Create context with default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}:{children:ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);

  const isAuth = (userData: User | null) => setUser(userData);
 

  return ( 
    <AuthContext.Provider value={{ user,isAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use AuthContext easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
