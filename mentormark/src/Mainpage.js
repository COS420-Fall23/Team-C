import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db, storage } from './firebaseConfig'; 
import { getDownloadURL, ref } from 'firebase/storage';
import './Mainpage.css'

function Mainpage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [imageURLs, setImageURLs] = useState({});

  const fetchPosts = async () => {
    const postsCollection = collection(db, 'posts');
    const snapshot = await getDocs(postsCollection);
    const postsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPosts(postsData);
  };

  useEffect(() => {
    // Fetch posts and their associated image URLs
    const fetchPosts = async () => {
      const postsCollection = collection(db, 'posts');
      const snapshot = await getDocs(postsCollection);
      const postsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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

  const formatTimestamp = (timestamp) => {
    // Assuming timestamp is a Firebase timestamp object
    return timestamp.toDate().toLocaleString(); // Convert Firebase timestamp to a readable date string
  };

  return (
    <div className="container">
      <header className="top-bar">
        <h1 className="title" onClick={() => navigate('/mainpage')}>MentorMark</h1>
      </header>
      <div className="sidebar">
        <header>Communities</header>
      </div>
      <div className="main-body">
        <div className="postList">
          {posts.map((post, index) => (
            <div key={post.id} className="post">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {post.file && imageURLs[post.id] ? (
                <img src={imageURLs[post.id]} alt="Attached Image" style={{ maxWidth: '100px' }} />
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
        </div>
        <div className="add-button-container">
          <div className="addButton" onClick={() => navigate('/create-post')}>
            {/* Plus icon will be handled by the CSS styles */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
