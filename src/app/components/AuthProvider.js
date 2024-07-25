import React from "react";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";

const Auth = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Authentication</h1>
      <SignUpForm />
      <SignInForm />
    </div>
  );
};

export default Auth;
