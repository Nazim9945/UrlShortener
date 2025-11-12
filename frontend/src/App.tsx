import { Route, Routes } from "react-router";
import HomePage from "./Pages/HomePage";
import DashBoardPage from "./Pages/DashBoardPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { OpenRoute } from "./Pages/OpenRoute";
import { ProtectedRoute } from "./Pages/ProtectedRoute";

const App: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <OpenRoute>
            <HomePage />
          </OpenRoute>
        }
      />
      <Route
        path="/login"
        element={
          <OpenRoute>
            <LoginPage />
          </OpenRoute>
        }
      />
      <Route
        path="/register"
        element={
          <OpenRoute>
            <RegisterPage />
          </OpenRoute>
        }
      />
      <Route
        path="/DashBoard"
        element={
          <ProtectedRoute>
           <DashBoardPage/>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
