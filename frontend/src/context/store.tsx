// import { createContext, useContext, useState,type ReactNode } from "react";


// interface User  {
//   name: string;
//   email: string;
// }

// interface AuthContextType  {
//   user: User | null,
//   isAuth:(userData:User|null)=>void
// };

// // Create context with default value
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({children}:{children:ReactNode}) => {
//   const [user, setUser] = useState<User | null>(null);

//   const isAuth = (userData: User | null) => setUser(userData);
 

//   return ( 
//     <AuthContext.Provider value={{ user,isAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// // Custom hook to use AuthContext easily
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// };

import { create } from "zustand";

// Define the shape of your store
interface User{
  email:string,
  name:string
}
interface AuthUser {
  user:User | null
  isAuth:(user:User | null)=>void
}
// increment: () => void;
// decrement: () => void;
// reset: () => void;

// Create the Zustand store
export const useAuth = create<AuthUser>((set) => ({
  user: null,
  isAuth:(user)=>set(()=>({user}))
}));

// increment: () => set((state) => ({ count: state.count + 1 })),
// decrement: () => set((state) => ({ count: state.count - 1 })),
// reset: () => set({ count: 0 }),
