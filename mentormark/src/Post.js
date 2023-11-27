import { Link } from 'react-router-dom';
import './CSS/Post.css';

export default function Post(props) {
    const post = props.toChild;

    return (
        <div className='post'>
            {(post) ? 
            <div>
                <header className='post-title'>
                    {post.title}
                    
                </header>
                <div className='post-body'>
                    {post.content}
                </div>
            </div>
            :
            <span>Error loading post</span>
            }
            <Link onClick={() => {props.sendToParent(null)}}>Back to Post List</Link>
        </div>
    )
}