import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Image from "../../assets/L1.jpg";
import "./SignUp.css";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigateTo = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        {
          first_name: firstName,
          last_name: lastName,
          email,
          phone: phoneNumber,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setSuccess(true);
      navigateTo("/login");
    } catch (error) {
      setError(
        "Signup failed: " + (error.response?.data?.detail || error.message)
      );
    }
  };

  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="SignUp">
      <div className="container">
        <div className="image">
          <img src={Image} alt="signup-image" />
        </div>
        <div className="Sign">
          <div className="text">
            <h1>Sign Up</h1>
            <p>
              Let's get you all set up so you can access your personal account.
            </p>
          </div>
          {!success ? (
            <form onSubmit={handleSignup}>
              <div className="Part-1">
                <div className="input-field">
                  <label>First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    required
                  />
                </div>
                <div className="input-field">
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
              <div className="Part-1">
                <div className="input-field">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john.doe@gmail.com"
                    required
                  />
                </div>
                <div className="input-field">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="01-23456125"
                    required
                  />
                </div>
              </div>
              <div className="Part-2">
                <div className="input-field">
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="*********"
                    required
                  />
                </div>
                <div className="input-field">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="*********"
                    required
                  />
                </div>
              </div>
              <div className="check">
                <p>
                  <input type="checkbox" name="terms" required /> I agree to all
                  the <span className="btn"> Terms </span> and{" "}
                  <span className="btn">Privacy Policies</span>
                </p>
              </div>
              <div className="SignUp-button">
                <button type="submit">Create Account</button>
              </div>
            </form>
          ) : (
            <p>Signup successful! Redirecting to login...</p>
          )}
          {error && <p className="error">{error}</p>}
          <div className="Login-forward">
            Already have an account?
            <Link to="/Login" selected={"/Login" === path}>
              <span className="btn"> Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
