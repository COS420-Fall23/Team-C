import { Link } from 'react-router-dom';

export default function Post(props) {
    const post = props.toChild;

    return (
        <div className='post'>
            <div>
                <header className='post-title'>
                    {post.title}
                </header>
                <div className='post-body'>
                    {post.content}
                </div>
            </div>
            <Link onClick={() => {props.sendToParent(null)}}>Back to Post List</Link>
        </div>
    )
}