import React, { useState, useEffect } from "react";
import "./CSS/PostCreation.css";
import { useNavigate } from "react-router-dom";
import { storage } from "./firebaseConfig.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "./firebaseConfig.js";
import "./components/Comment.js"



function PostCreation() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    community: '',
    userID: '',
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

  const auth = getAuth();
  const [user, setUser] = useState(null);

  // Listen for changes in authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Cleanup function
    return () => unsubscribe();
  }, [auth]);

  const createPost = async () => {
    const { title, content, community, file } = formData;
  
    if (title && content && community) {
      const newPost = {
        title,
        content,
        community,
        userID: user.uid,
        timestamp: new Date().toLocaleString(),
      };
      console.log(user.uid);
  
      try {
        if (file) {
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
              newPost.file = url;
  
              const docRef = await addDoc(collection(db, 'posts'), newPost);
              console.log('Document written with ID: ', docRef.id);
              navigate('/mainpage'); // Redirect back to the main page
            }
          );
        } else {
          const docRef = await addDoc(collection(db, 'posts'), newPost);
          console.log('Document written with ID: ', docRef.id);
          navigate('/mainpage'); // Redirect back to the main page
        }
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    } else {
      alert('Please provide the title, content, and community for the post.');
    }
  };
  
  return (
    <div className="page-center">
      <div className="creation-container">
        <button className="create-home" onClick={() => navigate('/mainpage')}>Home</button>
        <h1 className="create-title">Create Post</h1>
        <form className="create-form">
          <label className="create-label" htmlFor="post-title">Title:</label>
          <input
            className="create-input"
            type="text"
            id="post-title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <br />
          <label className="create-label" htmlFor="post-content">Content:</label>
          <textarea
            className="create-textarea"
            id="post-content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
          ></textarea>
          <br />
          <label className="create-label" htmlFor="post-community">Community:</label>
          <select 
            className="create-select"
            name="community"
            id="post-community"
            value={formData.community} 
            onChange={handleInputChange} 
            required>
            <option value="null">--</option>
            <option value="Computer Science">Computer Science</option>
            <option value="New Media Design">New Media Design</option>
          </select>
          <label className="create-label" htmlFor="post-file">Upload File:</label>
          <input
            className="create-input"
            type="file"
            id="post-file"
            name="file"
            onChange={handleInputChange}
          />
          <br />
          <button className="create-button" type="button" onClick={createPost}>
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostCreation;


// Post must be created in a community