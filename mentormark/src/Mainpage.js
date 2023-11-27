import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "./firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
import "./Mainpage.css";
import MentorMarkLogo from "./logo/MentorMarkLogoFinals-12.png";
import { AiOutlineSearch } from "react-icons/ai";

function Mainpage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [imageURLs, setImageURLs] = useState({});
  const [postId, setPostId] = useState(null);

  const fetchPosts = async () => {
    const postsCollection = collection(db, "posts");
    const snapshot = await getDocs(postsCollection);
    const postsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPosts(postsData);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, "posts");
      const snapshot = await getDocs(postsCollection);
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);

      const urls = {}; // Object to hold image URLs associated with post IDs

      postsData.forEach((post) => {
        if (post.file) {
          const imageRef = ref(storage, post.file); // Assuming post.file contains the path to the image in Firebase Storage
          getDownloadURL(imageRef)
            .then((url) => {
              urls[post.id] = url; // Assign the URL to the corresponding post ID
              setImageURLs(urls); // Update the state with the new URLs
            })
            .catch((error) => {
              // Handle any potential errors in fetching the image URL
              console.error("Error fetching image URL:", error);
            });
        }
      });
    };
    fetchPosts();
  }, []);

  // const formatTimestamp = (timestamp) => {
  //   // Assuming timestamp is a Firebase timestamp object
  //   return timestamp.toDate().toLocaleString(); // Convert Firebase timestamp to a readable date string
  // };

  return (
    <div className="mainpage-container">
      <header className="mainpage-top-bar">
        <h1
          className="mainpage-title"
          onClick={() => navigate("/mainpage")}
          style={{
            fontSize: "28px", // Makes the text slightly bigger
            marginLeft: "20px", // Moves the text more to the right
            marginTop: "-10px",
          }}
        >
          MentorMark
        </h1>
        <div className="mainpage-search-container">
          <input
            className="mainpage-search-input"
            type="text"
            placeholder="Search"
          />
          <AiOutlineSearch className="mainpage-search-icon" />
        </div>
      </header>
      <div className="mainpage-sidebar">
        <header className="mainpage-sidebar-header">Communities</header>
      </div>
      <div className="mainpage-main-body">
        <div className="mainpage-postList">
          {posts.map((post, index) => (
            <div key={post.id} className="mainpage-post">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              {post.file && imageURLs[post.id] ? (
                <img
                  src={imageURLs[post.id]}
                  alt="Attached Image"
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
          <button
            className="mainpage-addButton"
            onClick={() => navigate("/create-post")}
          >
            +
          </button>
          {/* Plus icon will be handled by the CSS styles */}
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
