import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { db, storage, auth, getDoc, doc } from "./firebaseConfig";
import pImage from "./logo/pImage.png";
import "./CSS/Mainpage.css";
import "./CSS/COSPage.css";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import Post from "./Post";

function COSPage() {
  const navigate = useNavigate();
  
  const [posts, setPosts] = useState([]);
  const [imageURLs, setImageURLs] = useState({});
  const [postId, setPostId] = useState(null);

  const [searchParams, setSearchParams] = useState(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState(""); //Search textbox state

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

  const communities = [
    { name: "ECO", path: "/eco" },
    // cos is omitted since we're on the cos page
    { name: "Business", path: "/business" },
    { name: "Finance", path: "/finance" },
    { name: "New Media Design", path: "/design" },
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

  const mapDropdownToCommunityName = (selectedValue) => {
    switch (selectedValue) {
      case "Computer Science":
        return "/cos"; // This should match the community route
      case "New Media Design":
        return "/design"; // This should match the community route
      default:
        return ""; // Handle the default case or return an empty string
    }
  };

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

  const setViewedPost = async (id) => {
    setPostId(id);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, "posts");
        const snapshot = await getDocs(postsCollection);
        const postsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const imageURLPromises = postsData.map((post) => {
          if (post.file) {
            const imageRef = ref(storage, post.file);
            return getDownloadURL(imageRef)
              .then((url) => ({ id: post.id, url })) // Return an object with post ID and image URL
              .catch((error) => {
                console.error("Error fetching image URL:", error);
                return { id: post.id, url: null }; // Return null URL in case of an error
              });
          }
          return Promise.resolve({ id: post.id, url: null }); // If there's no file, resolve the promise immediately with null URL
        });

        // Wait for all promises to resolve
        const resolvedImageURLs = await Promise.all(imageURLPromises);

        const urls = {};
        resolvedImageURLs.forEach(({ id, url }) => {
          urls[id] = url; // Assign the URL to the corresponding post ID
        });

        setImageURLs(urls); // Update the state with the new URLs
        setPosts(postsData); // Update the state with the posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  return (
    <div className="cos-container">
      <header className="cos-top-bar">
        <button
          className="cos-back-to-mainpage-btn"
          onClick={() => navigate("/mainpage")}
        >
          Back
        </button>

        {/* Center group for title and search bar */}

        <div className="cos-center-group">
          <h1 className="cos-title">COS Community</h1>
          <div className="cos-search-bar-container">
            <div className="cos-search-bar">
              <input type="textbox" onChange={handleSearchText} />
              <button onClick={handleSearch}>Search</button>
            </div>
          </div>
        </div>

        <div className="cos-profile-container">
          {/*Use the profilePicture prop here*/}
          <img
            className="cos-profile-icon" src={profilePicture} alt="Profile" onClick={handleProfileClick}/>
          {showDropdown && (
            <div className="cos-dropdown-menu">
              <Link to={{ pathname: '/account', state: { profilePicture: profilePicture } }} style={{textDecoration: 'none'}}><button >Account</button></Link>
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
              index={index} // Pass index for unique color
            />
          ))}
        </div>
      </div>
      <div className="mainpage-body">
        {postId === null ? (
          <>
            <div className="mainpage-postList">
              {sortedPosts
                .filter((post) => post.community === "Computer Science")
                .filter(
                  (post) =>
                    searchParams !== null //filters posts that include search parameters
                      ? post.title.includes(searchParams) ||
                        post.content.includes(searchParams)
                      : post //if no parameters, displays full list
                )
                .map((post, index) => (
                  <div key={post.id} className="mainpage-post">
                    <div>
                      <Link to={mapDropdownToCommunityName(post.community)}>
                        {post.community}
                      </Link>
                    </div>
                    <h3>
                      <Link
                        onClick={() => {
                          setViewedPost(post);
                        }}
                        style={{ textDecoration: "none" }}
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p>{post.content}</p>
                    {post.file && imageURLs[post.id] ? (
                      <img
                        className="mainpage-image"
                        src={imageURLs[post.id]}
                        alt=""
                        style={{ maxWidth: "100px" }}
                      />
                    ) : post.file ? (
                      <p>Error loading image</p>
                    ) : (
                      <p>No image attached</p>
                    )}
                    <div>
                      <p>
                        File attached:
                        <a href={post.file} download>
                          Download File
                        </a>
                      </p>
                    </div>
                    <small>{post.timestamp}</small>
                  </div>
                ))}
            </div>
            <div className="mainpage-add-button-container">
              <div
                className="mainpage-addButton"
                onClick={() => navigate("/create-post")}
              >
                {/* Plus icon will be handled by the CSS styles */}
              </div>
            </div>
          </>
        ) : (
          <Post toChild={postId} sendToParent={setPostId}></Post>
        )}
      </div>

      <div className="cos-right-sidebar">
        <header className="cos-right-sidebar-header"></header>
      </div>
    </div>
  );
}

export default COSPage;
