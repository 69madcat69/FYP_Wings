import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../../assets/1.jpg";
import axios from "axios";
import "./Login2.css";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function Login() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    client
      .post("/api/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        setIsAuthenticated(true);
        // Redirect to findflight page after successful login
        navigateTo("/");
      })
      .catch((err) => {
        console.error("Login failed:", err);
        // Handle login error
      });
  };

  if (!isAuthenticated) {
    return (
      <div className="MainLogin">
        <div className="container">
          <div className="Log">
            <div className="text">
              <h1>Login</h1>
              <p>Login to access your account.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="Part-2">
                <div className="input-field">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="john.doe@gmail.com"
                    value={email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-field">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="*********"
                    value={password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="Login-button">
                <button type="submit">Login</button>
              </div>
            </form>
            <div className="SignUp-forward">
              Don't have an account?{" "}
              <Link to="/SignUp" className="btn">
                Sign Up
              </Link>
            </div>
          </div>
          <div className="image">
            <img src={Image} alt="login" />
          </div>
        </div>
      </div>
    );
  } else {
    return <div>User is authenticated</div>;
  }
}

export default Login;
