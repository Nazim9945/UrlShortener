import  { useState, type FormEvent } from "react";
import useLogin from "../hooks/useLogin";
import { Link } from "react-router";




const LoginForm= () => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const{handleLogin,error,loading}=useLogin()
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleLogin(email,password);
   
  };

  return (
    <div className="w-full max-w-md mx-auto mt-12">
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign in to your account</h2>

        <form onSubmit={handleSubmit} className="space-y-4" aria-live="polite">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="block">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Password</span>
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="text-sm text-blue-600 hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </label>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl py-2 font-medium text-white transition ${
              loading ? "bg-blue-300 cursor-wait" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;