import React, { useState, useEffect } from "react";
import "./Profile.css";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user", {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": axios.defaults.xsrfHeaderName,
          },
        });
        setProfileData(response.data.user);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError(
          "Failed to fetch user data: " +
            (err.response?.data?.detail || err.message)
        );
      }
    };
    fetchProfileData();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <span className="profile-title">Account</span>
        <div className="profile-details">
          <div className="profile-item">
            <div className="profile-info">
              <span className="profile-label">First Name:</span>
              <span className="profile-value">{profileData.first_name}</span>
            </div>
            <button className="profile-button">
              <div className="profile-button-content">
                <FaEdit />
                <span className="profile-button-text">Change</span>
              </div>
            </button>
          </div>
          <div className="profile-item">
            <div className="profile-info">
              <span className="profile-label">Last Name:</span>
              <span className="profile-value">{profileData.last_name}</span>
            </div>
            <button className="profile-button">
              <div className="profile-button-content">
                <FaEdit />
                <span className="profile-button-text">Change</span>
              </div>
            </button>
          </div>
          <div className="profile-item">
            <div className="profile-info">
              <span className="profile-label">Email:</span>
              <span className="profile-value">{profileData.email}</span>
            </div>
            <button className="profile-button">
              <div className="profile-button-content">
                <FaEdit />
                <span className="profile-button-text">Change</span>
              </div>
            </button>
          </div>
          <div className="profile-item">
            <div className="profile-info">
              <span className="profile-label">Phone:</span>
              <span className="profile-value">{profileData.phone}</span>
            </div>
            <button className="profile-button">
              <div className="profile-button-content">
                <FaEdit />
                <span className="profile-button-text">Change</span>
              </div>
            </button>
          </div>
          <div className="profile-item">
            <div className="profile-info">
              <span className="profile-label">Password:</span>
              <span className="profile-value">********</span>{" "}
              {/* Do not show the actual password */}
            </div>
            <button className="profile-button">
              <div className="profile-button-content">
                <FaEdit />
                <span className="profile-button-text">Change</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Profile;
