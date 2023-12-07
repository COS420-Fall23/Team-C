import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import pImage from "./logo/pImage.png";
import "./CSS/Mainpage.css";
import "./CSS/DesignPage.css";

function DesignPage() {
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState(""); //Search textbox state

  const communities = [
    { name: "COS", path: "/cos" },
    { name: "ECO", path: "/eco" },
    { name: "Business", path: "/business" },
    { name: "Finance", path: "/finance" },
    // Design is omitted since we're on the Design page
  ];

  // Reusing the Community component from the Mainpage.js
  function Community({ name, path, index }) {
    const navigate = useNavigate();
    const colorClasses = ["cos", "eco", "business", "finance"];

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
    <div className="design-container">
      <header className="design-top-bar">
        <h1 className="design-title">Design Community</h1>

        <div className="design-search-bar-container">
          <div className="design-search-bar">
            <input type="textbox" onChange={handleSearchText} />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>

        <div className="design-profile-container">
          <img
            className="design-profile-icon"
            src={pImage}
            alt="Profile"
            onClick={handleProfileClick}
          />
          {showDropdown && (
            <div className="design-dropdown-menu">
              <button onClick={() => navigate("/account")}>Account</button>
              <button onClick={handleSignOut}>Sign Out</button>
            </div>
          )}
        </div>
      </header>

      <div className="design-sidebar">
        <header className="design-sidebar-header">Communities</header>
        <div className="design-community-list">
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

export default DesignPage;
