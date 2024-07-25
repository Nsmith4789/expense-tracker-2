import React from "react";
import Link from "next/link";
import { useAuth } from "./components/AuthProvider";

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <button onClick={logout} className="bg-red-600 text-white p-2">
            Logout
          </button>
          <Link href="/manage">
            <a className="bg-blue-600 text-white p-2 mt-4 inline-block">
              Manage Expenses
            </a>
          </Link>
        </>
      ) : (
        <Link href="/auth">
          <a className="bg-blue-600 text-white p-2 mt-4 inline-block">
            Login / Sign Up
          </a>
        </Link>
      )}
    </div>
  );
};

export default Home;
