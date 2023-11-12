import { Link } from "react-router-dom"
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from "firebase/firestore";
import { db } from "./firebase-config";

//Creates a list of Post Titles with links to a post component.
//When clicked, replaces/redirects post list to post
export default function PostListView() {
    const [value, loading, error] = useCollection(collection(db, 'posts'));

    return <div>
    {(value)? <div>
      {value.docs.map((obj) => (
        <div>
          <div>Title: {obj.data().Title}</div>
        </div>
      ))}
    </div> : <div>Loading Posts</div>}
  </div>
}