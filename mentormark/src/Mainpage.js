import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig'; 
import './Mainpage.css'

function Mainpage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    const postsCollection = collection(db, 'posts');
    const snapshot = await getDocs(postsCollection);
    const postsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPosts(postsData);
  };

  useEffect(() => {
    fetchPosts();
  }, []); // Runs only once when the component mounts

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
              {post.file && (
                <div>
                  <p>File attached: {post.file}</p>
                  {/* Link to download file */}
                  <a href={post.file} download>
                    Download File
                  </a>
                </div>
              )}
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
