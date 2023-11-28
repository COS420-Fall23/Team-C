import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db, storage, auth } from "./firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
import './CSS/Mainpage.css'
import Post from './Post';
import { signOut } from 'firebase/auth';
import pImage from './logo/pImage.png'

function Mainpage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [imageURLs, setImageURLs] = useState({});
  const [postId, setPostId] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };


  const setViewedPost = async (id) => {
    setPostId(id);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, 'posts');
        const snapshot = await getDocs(postsCollection);
        const postsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
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
    <div className="mainpage-container">
      <header className="mainpage-top-bar">
        <h1 className="mainpage-title" onClick={() => navigate('/mainpage')}>MentorMark</h1>
        <div className="mainpage-profile-container">
          <img
            className="mainpage-profile-icon"
            src= {pImage} // Replace with the path to your profile image
            alt="Profile"
            onClick={handleProfileClick}
          />
          {showDropdown && (
            <div className="mainpage-dropdown-menu">
              <button onClick={() => navigate('/account')}>Account</button>
              <button onClick={handleSignOut}>Sign Out</button>
            </div>
          )}
        </div>
      </header>
      <div className="mainpage-sidebar">
        <header>Communities</header>
      </div>
      <div className="mainpage-body">
        {(postId===null) ? 
        <>
        <div className="mainpage-postList">
            {sortedPosts.map((post, index) => (
              <div key={post.id} className="mainpage-post">
                <h3><Link onClick={() => { setViewedPost(post); } } style={{ textDecoration: 'none' }}>{post.title}</Link></h3>
                <p>{post.content}</p>
                {post.file && imageURLs[post.id] ? (
                  <img src={imageURLs[post.id]} alt='' style={{ maxWidth: '100px' }} />
                ) : post.file ? (
                  <p>Error loading image</p>
                ) : (
                  <p>No image attached</p>
                )}
                <div>
                  <p>File attached:
                    <a href={post.file} download>
                      Download File
                    </a>
                  </p>
                </div>
                <small>{post.timestamp}</small>
              </div>
            ))}
            </div><div className="mainpage-add-button-container">
              <div className="mainpage-addButton" onClick={() => navigate('/create-post')}>
                {/* Plus icon will be handled by the CSS styles */}
              </div>
            </div>
        </>
        : <Post toChild={postId} sendToParent={setPostId}></Post>}
        </div>
  </div>
  );
}

export default Mainpage;
