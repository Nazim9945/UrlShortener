
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router';
import RegisterForm from './components/RegisterForm.tsx';
import LoginForm from './components/LoginForm.tsx';
import DashBoard from './Pages/DashBoard.tsx';
import { AuthProvider } from './context/authContext.tsx';
import { ProtectedRoute } from './Pages/ProtectedRoute.tsx';
import { OpenRoute } from './Pages/OpenRoute.tsx';

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OpenRoute>
          <App/>
        </OpenRoute>} />

        <Route
          path="/register"
          element={
            <OpenRoute>
              <RegisterForm />
            </OpenRoute>
          }
        />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <LoginForm/>
            </OpenRoute>
          }
        />

        <Route
          path="/DashBoard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  </AuthProvider>
);
