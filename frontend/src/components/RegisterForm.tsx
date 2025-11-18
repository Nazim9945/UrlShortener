import  { useState, type ChangeEvent,type  FormEvent } from "react";
import { Link } from "react-router";
import useRegister from "../hooks/useRegister";

export interface FormState {
  name: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { handleRegister, error, loading } = useRegister();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setForm({...form,[e.target.name]:e.target.value})
  }
  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form)
    await handleRegister(form);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-12">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Create your account
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          aria-live="polite"
          noValidate
        >
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Full name</span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              required
              placeholder="John Doe"
              className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Email</span>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              required
              placeholder="you@example.com"
              className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="block">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Password
              </span>
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="text-sm text-blue-600 hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              required
              placeholder="Create a password"
              className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          {error && <p className="text-sm text-red-500">{error.message}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl py-2 font-medium text-white transition ${
              loading
                ? "bg-blue-300 cursor-wait"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
