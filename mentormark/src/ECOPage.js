import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import pImage from "./logo/pImage.png";
import "./CSS/Mainpage.css";
import "./CSS/ECOPage.css";

function ECOPage() {
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState(""); //Search textbox state

  const communities = [
    { name: "COS", path: "/cos" },
    // ECO is omitted since we're on the ECO page
    { name: "Business", path: "/business" },
    { name: "Finance", path: "/finance" },
    { name: "Design", path: "/design" },
  ];

  // Reusing the Community component from the Mainpage.js
  function Community({ name, path, index }) {
    const navigate = useNavigate();
    const colorClasses = ["cos", "business", "finance", "design"];

    return (
      <button
        className={`community-button ${
          colorClasses[index % colorClasses.length]
        }`}
        onClick={() => navigate(path)}
      >
        {name}
      </button>
    );
  }

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    //implement search functionality
  };

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div className="eco-container">
      <header className="eco-top-bar">
        <button
          className="eco-back-to-mainpage-btn"
          onClick={() => navigate("/mainpage")}
        >
          Back
        </button>
        <div className="eco-center-group">
          <h1 className="eco-title">ECO Community</h1>
          <div className="eco-search-bar-container">
            <div className="eco-search-bar">
              <input type="textbox" onChange={handleSearchText} />
              <button onClick={handleSearch}>Search</button>
            </div>
          </div>
        </div>
        <div className="eco-profile-container">
          <img
            className="eco-profile-icon"
            src={pImage}
            alt="Profile"
            onClick={handleProfileClick}
          />
          {showDropdown && (
            <div className="eco-dropdown-menu">
              <button onClick={() => navigate("/account")}>Account</button>
              <button onClick={handleSignOut}>Sign Out</button>
            </div>
          )}
        </div>
      </header>

      <div className="eco-sidebar">
        <header className="eco-sidebar-header">Communities</header>
        <div className="eco-community-list">
          {communities.map((community, index) => (
            <Community
              key={community.name}
              name={community.name}
              path={community.path}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ECOPage;
