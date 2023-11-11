import React, { useState } from 'react';
import PostCreation from './PostCreation';
import { useNavigate } from 'react-router-dom';
import './Mainpage.css'

const Mainpage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const handleCreatePost = (newPost) => {
    setPosts([...posts, newPost]);
    navigate('/mainpage'); 
  };

  return (
    <div className="container">
      <header className="top-bar">
        <h1 className="title">Homepage</h1>
      </header>
      <div className="sidebar">
        <header>Communities</header>
      </div>
      <div className="main-body">
        <div className="postList">
            {posts.map((post, index) => (
                    <div key={index} className="post">
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    {post.file && (
                        <div>
                        <p>File attached: {post.file.name}</p>
                        <a href={URL.createObjectURL(post.file)} download={post.file.name}>
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
      <PostCreation handleCreatePost={handleCreatePost} />
    </div>
  );
};

export default Mainpage;
