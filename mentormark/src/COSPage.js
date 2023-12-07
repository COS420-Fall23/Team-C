import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import pImage from "./logo/pImage.png";
import "./CSS/Mainpage.css";
import "./CSS/COSPage.css";

function COSPage() {
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState(""); //Search textbox state

  const communities = [
    { name: "ECO", path: "/eco" },
    // cos is omitted since we're on the cos page
    { name: "Business", path: "/business" },
    { name: "Finance", path: "/finance" },
    { name: "Design", path: "/design" },
  ];

  // Reusing the Community component from the Mainpage.js
  function Community({ name, path, index }) {
    const navigate = useNavigate();
    const colorClasses = ["eco", "business", "finance", "design"];

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
    <div className="cos-container">
      <header className="cos-top-bar">
        <h1 className="cos-title">COS Community</h1>

        <div className="cos-search-bar-container">
          <div className="cos-search-bar">
            <input type="textbox" onChange={handleSearchText} />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>

        <div className="cos-profile-container">
          <img
            className="cos-profile-icon"
            src={pImage}
            alt="Profile"
            onClick={handleProfileClick}
          />
          {showDropdown && (
            <div className="cos-dropdown-menu">
              <button onClick={() => navigate("/account")}>Account</button>
              <button onClick={handleSignOut}>Sign Out</button>
            </div>
          )}
        </div>
      </header>

      <div className="cos-sidebar">
        <header className="cos-sidebar-header">Communities</header>
        <div className="cos-community-list">
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

export default COSPage;
