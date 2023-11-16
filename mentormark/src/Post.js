import React, { useState, useEffect } from 'react';
import { collection, getDoc, doc } from 'firebase/firestore';
import { db, storage } from './firebaseConfig'; 
import {useCollection} from 'react-firebase-hooks/firestore';


export default async function Post() {
    const postRef = doc(db, 'posts', 'test');
    const postSnap = await getDoc(postRef);

    return (
        <div>
            : Post here
        </div>
    )
}