import {Link} from "react-router-dom";

<div className="mainpage-body">
        {(postId===null) ? 
        <>
        <div className="mainpage-postList">
            {sortedPosts.map((post, index) => (
              <div key={post.id} className="mainpage-post">
                <h3><Link onClick={() => { setViewedPost(post); } } style={{ textDecoration: 'none' }}>{post.title}</Link></h3>
                <p>{post.content}</p>
                {post.file && imageURLs[post.id] ? (
                  <img className="mainpage-image" src={imageURLs[post.id]} alt='' style={{ maxWidth: '100px' }} />
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