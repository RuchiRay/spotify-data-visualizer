import React from "react";

 const Login = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <a
        className="text-white text-2xl bg-green-500 px-6 py-4 rounded-full"
        href="http://localhost:8000/login"
      >
        Log in to Spotify
      </a>
    </div>
  );
};

export default Login
