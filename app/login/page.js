'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    if (res?.error) {
      alert(res.error);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">Login</h1>
        <p className="text-center text-gray-500 mb-6">Welcome back! Please enter your credentials.</p>
        <div>
          <label className="block mb-1 text-gray-700 font-medium" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            id="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@email.com"
            required
            autoComplete="username"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700 font-medium" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            id="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold text-lg shadow hover:bg-blue-700 transition-colors duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}
