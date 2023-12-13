
import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Comment from './components/Comment';
import useNode from "./hooks/useNode";
import './CSS/comment.css';
import './CSS/Post.css'

const comments = {
  id: 1,
  items: [],
};

const Post = (props) => {
  const { toChild, sendToParent, profilePicture } = props;
  const post = props.toChild;

  const [commentsData, setCommentsData] = useState(comments);

  const { insertNode, editNode, deleteNode } = useNode();

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
          <img className='post-profile-icon' src={profilePicture} alt='Profile' />

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
