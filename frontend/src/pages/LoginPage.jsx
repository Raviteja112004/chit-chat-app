import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLogingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="opacity-60" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back </h1>
              <p className="opacity-60">Happy to see you again!</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPass ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="Your Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPass(!showPass)}
                ></button>
              </div>
            </div>

            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={isLogingIn}
            >
              {isLogingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="opacity-60">
              Already have an Account?{" "}
              <Link to="/signup" className="link link-primary">
                SignUp
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="relative h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-hidden">
        <nav className="absolute top-0 left-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold">Chit-Chat</h1>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="hover:underline">
              Home
            </a>
            <a href="/about" className="hover:underline">
              About
            </a>
            <a href="/contact" className="hover:underline">
              Contact
            </a>
          </div>
        </nav>
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-200 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-purple-200 rounded-full animate-spin opacity-75"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-200 rounded-full animate-bounce opacity-40"></div>
        <div className="relative z-10 flex justify-center items-center h-full text-white">
          <h1 className="text-5xl font-bold text-center flex">
            Welcome to Chit-Chat!{" "}
            <MessageSquare className="opacity-60 size-10" />
          </h1>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
