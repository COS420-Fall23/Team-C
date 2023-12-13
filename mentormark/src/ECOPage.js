import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db, getDoc, doc } from "./firebaseConfig";
import pImage from "./logo/pImage.png";
import "./CSS/Mainpage.css";
import "./CSS/ECOPage.css";

function ECOPage() {
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
          {/*Use the profilePicture prop here*/}
          <img
            className="eco-profile-icon" src={profilePicture} alt="Profile" onClick={handleProfileClick}/>
          {showDropdown && (
            <div className="eco-dropdown-menu">
              <Link to={{ pathname: '/account', state: { profilePicture: profilePicture } }} style={{textDecoration: 'none'}}><button >Account</button></Link>
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
