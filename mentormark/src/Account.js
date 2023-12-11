import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db, updateEmail, updatePassword, deleteUser, doc, getDoc, updateDoc } from './firebaseConfig';
import { storage, ref, uploadBytesResumable, getDownloadURL } from './firebaseConfig';
import PropTypes from 'prop-types';
import './CSS/account.css'
import { signOut } from 'firebase/auth';
import './CSS/account.css';
import mMLogo from "./logo/mMLogo.png";
import pImage from "./logo/pImage.png";

export default function AccountPage({setProfilePicture: updateProfilePicture}) {
  const navigate = useNavigate();

  const [user, setUser] = useState();
  const [profilePicture, setProfilePicture] = useState(null);

  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newGradStatus, setNewGradStatus] = useState('');
  const [newMajor, setNewMajor] = useState('');

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [isChangingGradStatus, setIsChangingGradStatus] = useState(false);
  const [isChangingMajor, setIsChangingMajor] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        const fetchUserData = async () => {
          try {
            const userDoc = await getDoc(doc(db, 'users', userAuth.displayName));
            if (userDoc.exists()) {
              setUser(userDoc.data());
            }
          } catch (error) {
            console.error('Error fetching user data:', error.message);
          }
        };
  
        fetchUserData();
      } else {
        // User is not logged in, you may want to handle this case
        setUser(null);
      }

      if (user && user.profilePicture) {
        setProfilePicture(user.profilePicture);
      } else {
        setProfilePicture(pImage); // Default image
      }
    });
  
    // Cleanup the observer when the component unmounts
    return () => unsubscribe();
  }, [user]);

  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, `/profile-pictures/${file.name}`);
  
    try {
      const snapshot = await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
  
      setProfilePicture(downloadURL); // Update the profile picture state here
      await updateDoc(doc(db, 'users', auth.currentUser.displayName), {
        profilePicture: downloadURL,
      });
      navigate('/mainpage', { state: { profilePicture: downloadURL } });
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
  };

  const handleChangePassword = async () => {
    try {
      await updatePassword(auth.currentUser, newPassword);
      alert('Password changed successfully!');
      setIsChangingPassword(false);
    } catch (error) {
      console.error('Error changing password:', error.message);
    }
  };

  const handleChangeEmail = async () => {
    try {
      console.log('New Email:', newEmail); // Check if newEmail is getting the updated value
      await updateEmail(auth.currentUser, newEmail); // Check if this function gets executed properly
      await updateDoc(doc(db, 'users', auth.currentUser.displayName), {
        email: newEmail,
      });
      console.log('Email updated in Firestore'); // Log to check if the Firestore update occurs
      alert('Email changed successfully!');
      setIsChangingEmail(false);
    } catch (error) {
      console.error('Error changing email:', error.message);
    }
  };

  const handleChangeGradStatus = async () => {
    try {
      console.log('Before state update:', auth.currentUser.gStatus);
      // Update grad status in Firestore
      await updateDoc(doc(db, 'users', auth.currentUser.displayName), {
        gStatus: newGradStatus,
      });
      console.log('After state update:', auth.currentUser.gStatus);

      alert('Grad status changed successfully!');
      setIsChangingGradStatus(false);
    } catch (error) {
      console.error('Error changing grad status:', error.message);
    }
  };

  const handleChangeMajor = async () => {
    try {
      console.log('Before state update:', auth.currentUser.major);
      // Update major in Firestore
      await updateDoc(doc(db, 'users', auth.currentUser.displayName), {
        major: newMajor,
      });
      console.log('After state update:', auth.currentUser.major);

      alert('Major changed successfully!');
      setIsChangingMajor(false);
    } catch (error) {
      console.error('Error changing major:', error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const confirmDeletion = window.confirm('Are you sure you want to delete your account? This action is irreversible.');
      if (confirmDeletion) {
        await deleteUser(auth.currentUser);
        alert('Account deleted successfully!');
        navigate('/');
      }
    } catch (error) {
      console.error('Error deleting account:', error.message);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <body>
      {/*this is the body screen*/}
      <div className="body-section">

        {/*nav bar section for buttons and the logo*/}
        <div className='header-section'>
        <button className='back-btn'><Link className='btn-a' to={{ pathname: '/mainpage', state: { profilePicture: profilePicture } }} style={{textDecoration: 'none'}}>Back</Link></button>

          <Link to={{ pathname: '/mainpage', state: { profilePicture: profilePicture } }}>
            <img className='logo' src={mMLogo} alt="logo-pic"/>
          </Link>
        </div>

        <div className="profile-pic-and-welcoome">
          <img className="profile" src={profilePicture} alt="profile-icon" />
          <h1 className="account-welcome">Welcome, {user.name}!</h1>
        </div>

        <div className="profile-with-card">

          <div className="profile-bio">
            <input className="input-prof-select" type="file" onChange={handleProfilePictureUpload} accept="image/*" />
            <h2 className="profile-full-name">{user.name} </h2>
            <h3 className="following-num">0 Following</h3>
          </div>

          <div className="card">
            <div className="profile-info">
              <h2 className="header-account-info">information:</h2>
              <p className="account-info">Email: <span className='account-actual-info'>{user.email}</span></p>
              <p className="account-info">Grad Status: <span className='account-actual-info'>{user.gStatus}</span></p>
              <p className="account-info">Major: <span className='account-actual-info'>{user.major}</span></p>
            
              {isChangingPassword ? (
                <div className="pass-input">
                  <input className="pass-input-box"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                <button className="save-input-btn" onClick={handleChangePassword}>Save Password</button>
                <button className="cancel-input-btn" onClick={() => setIsChangingPassword(false)}>Cancel</button>
                </div>
              ) : (
                <button className="change-info" onClick={() => setIsChangingPassword(true)}>Change Password</button>
              )}
  
              {isChangingEmail ? (
                <div className="pass-input">
                  <input className="pass-input-box"
                    type="email"
                    placeholder="Enter new email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                <button className="save-input-btn" onClick={handleChangeEmail}>Save Email</button>
                <button className="cancel-input-btn" onClick={() => setIsChangingEmail(false)}>Cancel</button>
                </div>
              ) : (
                <button className="change-info" onClick={() => setIsChangingEmail(true)}>Change Email</button>
              )}
  
              {isChangingGradStatus ? (
                <div className="pass-input">
                  <select className="pass-input-box" value={newGradStatus} onChange={(e) => setNewGradStatus(e.target.value)}>
                    <option value="None">--</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Graduate">Graduate</option>
                  </select>
                  <button className="save-input-btn" onClick={handleChangeGradStatus}>Save Grad Status</button>
                  <button className="cancel-input-btn" onClick={() => setIsChangingGradStatus(false)}>Cancel</button>
                </div>
              ) : (
                <button className="change-info" onClick={() => setIsChangingGradStatus(true)}>Change Grad Status</button>
              )}
  
              {isChangingMajor ? (
                <div className="pass-input">
                  <select className="pass-input-box" value={newMajor} onChange={(e) => setNewMajor(e.target.value)}>
                    <option value="None">--</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="New Media Design">New Media Design</option>
                  </select>
                  <button className="save-input-btn" onClick={handleChangeMajor}>Save Major</button>
                  <button className="cancel-input-btn" onClick={() => setIsChangingMajor(false)}>Cancel</button>
                </div>
              ) : (
                <button className="change-info" onClick={() => setIsChangingMajor(true)}>Change Major</button>
              )}
            </div>
          </div>

        </div>

        <div className="sign-out-sec">
          <button className="sign-out-btn" onClick={handleSignOut}>Sign Out</button>
        </div>

        <div className="delete-account-sec">
          <button className="delete-btn" onClick={handleDeleteAccount}>Delete Account</button>
        </div>

      </div>
    </body>
  )
}

AccountPage.propTypes = {
  setProfilePicture: PropTypes.func.isRequired, // Ensure setProfilePicture is a function
  // Add other prop types if there are more props used in AccountPage
};