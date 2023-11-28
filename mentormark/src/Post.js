import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import Comment from './components/Comment';
import useNode from "./hooks/useNode";
import './CSS/comment.css';
import './CSS/Post.css';

const comments = {
  id: 1,
  items: [],
};

const Post = (props) => {
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
      <h3 className='post-return'><Link onClick={() => props.sendToParent(null)}>Back to Post List</Link></h3>
      {post ? (
        <div>
          <header className="post-title">{post.title}</header>
          <img className='post-image' src={post.file} alt={post.file} />
          <div className="post-body">{post.content}</div>
        </div>
      ) : (
        <span>Error loading post</span>
      )}

      {/* Render comments using the Comment component */}
      <div className="comments-section">
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
