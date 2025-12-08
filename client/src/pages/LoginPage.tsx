import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserLoginSchema, type UserLoginDTO } from "../schemas/DbSchema";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../components/AuthProvider";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth()!;
  const [loginError, setLoginError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<UserLoginDTO>({
    resolver: zodResolver(UserLoginSchema)
  });

  const onSubmit = async (data: UserLoginDTO) => {
    setLoginError(null); 
    const ok = await login(data, setLoginError);
    if (ok) { 
      navigate('/'); 
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black/50 rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 font-medium">Username</label>
            <input {...register("username")} className="w-full border rounded px-3 py-2 outline-none focus:ring-2 ring-blue-400" />
            {errors.username && (
              <p className="text-red-700 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Password</label>
            <input type="password" {...register("password")} className="w-full border rounded px-3 py-2 outline-none focus:ring-2 ring-blue-400" />
            {errors.password && (
              <p className="text-red-700 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button type="submit" className="w-full bg-sky-800 hover:bg-sky-700 text-white py-2 mt-3 rounded-lg transition cursor-pointer" >
            Log In
          </button>
        </form>
        {loginError && (
          <p className="text-red-700 text-sm mt-1">{loginError}</p>
        )}
      </div>
    </div>
  );
}
