'use client';
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
    >
      Sign Out
    </button>
  );
}
