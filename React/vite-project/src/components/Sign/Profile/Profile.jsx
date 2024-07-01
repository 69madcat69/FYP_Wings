/*eslint-disable*/
import React, { useEffect, useState } from "react";
import "./Profile.css";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

const Profile = () => {
  const token = JSON.parse(localStorage.getItem("authTokens"));
  const accessToken = token?.access;
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    if (accessToken) {
      fetchUser();
    }
  }, [accessToken]);

  const handleSave = async () => {
    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/profile2",
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error.response.data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <span className="profile-title">Account</span>
        <div className="profile-details">
          {isEditing ? (
            <>
              <div className="profile-item">
                <div className="profile-info">
                  <span className="profile-label">First Name:</span>
                  <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="profile-item">
                <div className="profile-info">
                  <span className="profile-label">Last Name:</span>
                  <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="profile-item">
                <div className="profile-info">
                  <span className="profile-label">Email:</span>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="profile-item">
                <div className="profile-info">
                  <span className="profile-label">Phone:</span>
                  <input
                    type="text"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="profile-item">
                <div className="profile-info">
                  <span className="profile-label">Password:</span>
                  <input
                    type="text"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button className="profile-button" onClick={handleSave}>
                Save
              </button>
              <button
                className="profile-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <div className="profile-item">
                <div className="profile-info">
                  <span className="profile-label">First Name:</span>
                  <span className="profile-value">{user.firstName}</span>
                </div>
                <button
                  className="profile-button"
                  onClick={() => setIsEditing(true)}
                >
                  <div className="profile-button-content">
                    <FaEdit />
                    <span className="profile-button-text">Change</span>
                  </div>
                </button>
              </div>
              <div className="profile-item">
                <div className="profile-info">
                  <span className="profile-label">Last Name:</span>
                  <span className="profile-value">{user.lastName}</span>
                </div>
                <button
                  className="profile-button"
                  onClick={() => setIsEditing(true)}
                >
                  <div className="profile-button-content">
                    <FaEdit />
                    <span className="profile-button-text">Change</span>
                  </div>
                </button>
              </div>
              <div className="profile-item">
                <div className="profile-info">
                  <span className="profile-label">Email:</span>
                  <span className="profile-value">{user.email}</span>
                </div>
                <button
                  className="profile-button"
                  onClick={() => setIsEditing(true)}
                >
                  <div className="profile-button-content">
                    <FaEdit />
                    <span className="profile-button-text">Change</span>
                  </div>
                </button>
              </div>
              <div className="profile-item">
                <div className="profile-info">
                  <span className="profile-label">Phone:</span>
                  <span className="profile-value">{user.phone}</span>
                </div>
                <button
                  className="profile-button"
                  onClick={() => setIsEditing(true)}
                >
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
                </div>
                <button
                  className="profile-button"
                  onClick={() => setIsEditing(true)}
                >
                  <div className="profile-button-content">
                    <FaEdit />
                    <span className="profile-button-text">Change</span>
                  </div>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
