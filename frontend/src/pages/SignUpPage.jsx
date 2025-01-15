import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import {
  MessageSquare,
  User,
  Mail,
  Loader2,
  Eye,
  Lock,
  EyeOff,
} from "lucide-react";
import { Link } from "react-router-dom";
function SignUpPage() {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();
  const validateForm = () => {
    if(!formData.fullName.trim()) return toast.error("Full Name is required");
    if(!formData.email.trim()) return toast.error("Email is required");
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error("Invalid Email");
    if(formData.password.length<8) return toast.error('Password must be atleast 8 characters');
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();

    if(success){
      signup(formData);
    }
  };
  return (
    <div className="min-h-screen  grid  lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col  justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md  space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="opacity-60" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create an Account</h1>
              <p className="opacity-60">Get Started with a Free account</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>

                <input
                  type="text" 
                  className="input input-bordered w-full pl-10"
                  placeholder="Your Name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>
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
                  <Lock className="size-5 text-base-content/40" />
                </div>

                <input
                  type={showPass ? "text" : "password"} 
                  className="input input-bordered w-full pl-10"
                  placeholder=""
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? (
                    <EyeOff className="size-5 opacity-40" />
                  ) : (
                    <Eye className="size-5 opacity-40" />
                  )}
                </button>
              </div>
            </div>

            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="opacity-60">
              Already have an Account?{" "}
              <Link to="/login" className="link link-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* right side */}
      <div>
      <div class="relative h-screen bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
        <div class="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full animate-ping opacity-50"></div>
        <div class="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-200 rounded-full animate-bounce opacity-75"></div>
        <div class="absolute bottom-0 right-0 w-72 h-72 bg-green-200 rounded-full animate-pulse opacity-40"></div>

        <div class="relative z-10 flex justify-center items-center h-full text-white">
          <h1 class="text-5xl font-bold text-center flex">
            Welcome to Chit-Chat!{" "}
            <MessageSquare className="opacity-60 size-10" />
          </h1>
        </div>
      </div>
      </div>
    </div>
  );
}

export default SignUpPage;
