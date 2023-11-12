import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from "./firebase-config.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase-config.js"; // Assuming db points to your Firebase Firestore database



function PostCreation() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    file: null,
  });
  const [percent, setPercent] = useState(0);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'file' ? files[0] : value,
    });
  };

  const createPost = async () => {
    const { title, content, file } = formData;

    if (title && content && file) {
      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercent(percent);
        },
        async (err) => console.log(err),
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          const newPost = {
            title,
            content,
            file: url,
            timestamp: new Date().toLocaleString(),
          };
          try {
            const docRef = await addDoc(collection(db, 'posts'), newPost);
            console.log('Document written with ID: ', docRef.id);
            navigate('/mainpage'); // Redirect back to the main page
          } catch (e) {
            console.error('Error adding document: ', e);
          }
        }
      );
    } else {
      alert('Please provide both title, content, and upload a file for the post.');
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
