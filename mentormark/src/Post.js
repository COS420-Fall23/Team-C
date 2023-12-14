
import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Comment from './components/Comment';
import useNode from "./hooks/useNode";
import { getUserProfilePictureFromFirestore } from './firebaseConfig'; 
import './CSS/comment.css';
import './CSS/Post.css'
import pImage from "./logo/pImage.png";

const comments = {
  id: 1,
  items: [],
};

const Post = (props) => {
  const { toChild } = props;
  const post = props.toChild;

  const [commentsData, setCommentsData] = useState(comments);

  const { insertNode, editNode, deleteNode } = useNode();

  const [creatorProfilePicture, setCreatorProfilePicture] = useState(pImage);
  
  //need a creatorID/userID to create ownership of a post
  // Function to fetch and set the post creator's profile picture
  const fetchCreatorProfilePicture = async (creatorId) => {
    try {
      const profilePicture = await getUserProfilePictureFromFirestore(creatorId);
      console.log('Fetched profile picture URL:', profilePicture); // Log the fetched URL
      if (profilePicture) {
        setCreatorProfilePicture(profilePicture);
      } else {
        setCreatorProfilePicture(pImage);
      }
      } catch (error) {
      console.error('Error fetching user profile picture:', error);
      setCreatorProfilePicture(pImage);
      }
  };

  // Fetch post creator's profile picture when the component mounts or when post data changes
  useEffect(() => {
    if (post && post.creatorId) {
      fetchCreatorProfilePicture(post.creatorId);
    } else {
      // If post or creatorId is not available, set default profile picture
      setCreatorProfilePicture(pImage);
    }
  }, [post]);


  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertNode(commentsData, folderId, item);
    setCommentsData(finalStructure);
  };

  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(commentsData, folderId, value);
    setCommentsData(finalStructure);
  };

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = { ...finalStructure };
    setCommentsData(temp);
  };

  

  return (
    <div className="post">
      <h3 className='post-return'><Link onClick={() => props.sendToParent(null)} color='white' style={{textDecoration: 'none'}}>Back</Link></h3>
      {toChild ? (
        <div className='post-main-body'>
          {/* Displaying the user's profile picture */}
          <img className='post-profile-icon' src={creatorProfilePicture} alt='Profile' />

          <header className="post-title">{toChild.title}</header>
          <img className='post-image' src={toChild.file} alt={toChild.file} />

          <div className='post-second-body'>
            <div>{/*Empty div for spacing purposes*/}</div>
            <div>{toChild.content}</div>
            <div>{/*Empty div for spacing purposes*/}</div>
          </div>
        </div>
      ) : (
        <span>Error loading post</span>
      )}

      {/* Render comments using the Comment component */}
      <div>
          <Comment
            handleInsertNode={handleInsertNode}
            handleEditNode={handleEditNode}
            handleDeleteNode={handleDeleteNode}
            comment={commentsData}
          />
      </div>
    </div>
  );
};

export default Post;
