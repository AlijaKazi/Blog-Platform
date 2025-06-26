// src/pages/LoginPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      // ✅ Save userEmail and username in localStorage
      const { userId, username } = response.data;
      localStorage.setItem("userEmail", email);
      localStorage.setItem("username", username);

      console.log("Login successful:", response.data.message);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      const errorMsg =
        error.response?.data?.error || "Something went wrong during login.";
      setError(errorMsg);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Welcome Back</h2>

        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit">Login</button>

        <p>
          Don&apos;t have an account? <a href="/signup">Sign up</a> here
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
