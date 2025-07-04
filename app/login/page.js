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
    alert("welcome back!");
    router.push("/");
  }

 }
  return(
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">       Login</button>
    </form>

  );
}
