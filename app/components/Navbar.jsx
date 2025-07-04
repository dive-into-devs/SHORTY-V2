import SignOutButton from "./SignOutButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import Link from "next/link";

export default async function NavBar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="bg-white text-white p-4 w-full flex flex-row justify-between items-center">
      <header className="flex flex-row justify-between items-center w-full mx-auto text-black bg-white">
        <div className="flex flex-row items-center justify-center gap-10">
          <Link href="/">
            <img src="/logo.png" alt="App Logo" width={100} />
          </Link>
          <Link href="/">
            <p className="text-m font-bold">Home</p>
          </Link>
          {session && (
            <Link href="/dashboard/urls">
              <p className="text-m font-bold">My URLs</p>
            </Link>
          )}
          {/* Show admin panel link if user is admin */}
          {session?.user?.isAdmin && (
            <Link href="/admin">
              <p className="text-m font-bold text-red-600">Admin Panel</p>
            </Link>
          )}
        </div>
        <div className="flex flex-row items-center align-center gap-4">
          {session && (
            <Link href="/dashboard/shorten">
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Create</button>
            </Link>
          )}
          {session && <SignOutButton />}
          {!session && (
            <Link href="/login">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Log in</button>
            </Link>
          )}
        </div>
      </header>
    </nav>
  );
}
