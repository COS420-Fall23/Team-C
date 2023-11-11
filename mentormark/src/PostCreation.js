import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleCreatePost } from './Mainpage';


const PostCreation = ({ handleCreatePost }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    file: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'file' ? files[0] : value,
    });
  };

  const createPost = () => {
    const { title, content, file } = formData;

    if (title && content) {
      const newPost = {
        title,
        content,
        file,
        timestamp: new Date().toLocaleString(),
      };

      handleCreatePost(newPost);
      navigate('/mainpage'); // Redirect back to the main page
    } else {
      alert('Please provide both title and content for the post.');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Create Post</h1>
      <form>
        <label htmlFor="post-title">Title:</label>
        <input
          type="text"
          id="post-title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <br />
        <label htmlFor="post-content">Content:</label>
        <textarea
          id="post-content"
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          required
        ></textarea>
        <br />
        <label htmlFor="post-file">Upload File:</label>
        <input
          type="file"
          id="post-file"
          name="file"
          onChange={handleInputChange}
        />
        <br />
        <button type="button" onClick={createPost}>
          Create Post
        </button>
      </form>
    </div>
  );
};

export default PostCreation;
