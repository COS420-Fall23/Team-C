import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, getDoc, doc, db } from "./firebaseConfig";
import pImage from "./logo/pImage.png";
import "./CSS/Mainpage.css";
import "./CSS/BusinessPage.css";

function BusinessPage() {
  const navigate = useNavigate();

  const [profilePicture, setProfilePicture] = useState(pImage); // Default profile picture

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if there's a logged-in user
        if (auth.currentUser) {
          // Replace 'currentUserId' with the actual identifier for the logged-in user
          const userDoc = await getDoc(doc(db, 'users', auth.currentUser.displayName));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            // Update 'profilePicture' state with the fetched profile picture URL
            // Use the profile picture from Firestore or default image if not available
            setProfilePicture(userData.profilePicture || pImage);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState(""); //Search textbox state

  const communities = [
    { name: "COS", path: "/cos" },
    { name: "ECO", path: "/eco" },
    //business is omitted since we are on the Business page
    { name: "Finance", path: "/finance" },
    { name: "Design", path: "/design" },
  ];

  // Reusing the Community component from the Mainpage.js
  function Community({ name, path, index }) {
    const navigate = useNavigate();
    const colorClasses = ["cos", "eco", "finance", "design"];

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
    <div className="business-container">
      <header className="business-top-bar">
        <button
          className="business-back-to-mainpage-btn"
          onClick={() => navigate("/mainpage")}
        >
          Back
        </button>
        <div className="business-center-group">
          <h1 className="business-title">Business Community</h1>
          <div className="business-search-bar-container">
            <div className="business-search-bar">
              <input type="textbox" onChange={handleSearchText} />
              <button onClick={handleSearch}>Search</button>
            </div>
          </div>
        </div>

        <div className="business-profile-container">
          {/*Use the profilePicture prop here*/}
          <img
            className="business-profile-icon" src={profilePicture} alt="Profile" onClick={handleProfileClick}/>
          {showDropdown && (
            <div className="business-dropdown-menu">
              <Link to={{ pathname: '/account', state: { profilePicture: profilePicture } }} style={{textDecoration: 'none'}}><button >Account</button></Link>
              <button onClick={handleSignOut}>Sign Out</button>
            </div>
          )}
        </div>
      </header>

      <div className="business-sidebar">
        <header className="business-sidebar-header">Communities</header>
        <div className="business-community-list">
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

export default BusinessPage;
