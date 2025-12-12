import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserCreateSchema, type UserCreateDTO } from "../schemas/DbSchema";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../components/AuthProvider";

export default function Register() {
  const navigate = useNavigate();
  const { register: authRegister } = useAuth()!;
  const [registerError, setRegisterError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<UserCreateDTO>({
    resolver: zodResolver(UserCreateSchema)
  });

  const onSubmit = async (data: UserCreateDTO) => {
    setRegisterError(null);
    const ok = await authRegister(data, setRegisterError);
    if (ok) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black/50 rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 font-medium">Username</label>
            <input {...register("username")} className="w-full border rounded px-3 py-2 outline-none focus:ring-2 ring-blue-400" />
            {errors.username && (
              <p className="text-red-700 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Email</label>
            <input type="email" {...register("email")} className="w-full border rounded px-3 py-2 outline-none focus:ring-2 ring-blue-400" />
            {errors.email && (
              <p className="text-red-700 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Password</label>
            <input type="password" {...register("password")} className="w-full border rounded px-3 py-2 outline-none focus:ring-2 ring-blue-400" />
            {errors.password && (
              <p className="text-red-700 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button type="submit" className="w-full bg-sky-800 hover:bg-sky-700 text-white py-2 mt-3 rounded-lg transition cursor-pointer">
            Register
          </button>
        </form>

        {registerError && (
          <p className="text-red-700 text-sm mt-1">{registerError}</p>
        )}
      </div>
    </div>
  );
}
