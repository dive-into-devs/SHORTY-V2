'use client';
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white"
    >
      Sign Out
    </button>
  );
}
