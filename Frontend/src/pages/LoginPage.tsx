// src/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Attempting login...");
    try {
      //calling backend API to authenticate user
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });
      //console.log("Login Response:", response.data);
      const data = response.data;

      if (response.status === 200) {
        console.log("Login successful!");
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        console.error("Login failed:", data.error);
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>
          <p className="mt-4 text-gray-600">
            Not registered?{" "}
            <Link to="/signup" className="text-blue-500">
              Register now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
