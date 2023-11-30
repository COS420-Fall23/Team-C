import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db, updateEmail, updatePassword, deleteUser, doc, getDoc, updateDoc } from './firebaseConfig';
import './CSS/account.css'

export default function AccountPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
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
    });
  
    // Cleanup the observer when the component unmounts
    return () => unsubscribe();
  }, []);

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
      await updateEmail(auth.currentUser, newEmail);
      await updateDoc(doc(db, 'users', auth.currentUser.displayName), {
        email: newEmail,
      });
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
    <div className="AccountPage">
      <button className='account-back-button'>
        <Link to="/mainpage"><h3>Back</h3></Link>
      </button>
      <h1 className="account-welcome">Welcome, {user.name}!</h1>
      <p className="account-info">Email: <span className='account-actual-info'>{user.email}</span></p>
      <p className="account-info">Grad Status: <span className='account-actual-info'>{user.gStatus}</span></p>
      <p className="account-info">Major: <span className='account-actual-info'>{user.major}</span></p>
  
      {isChangingPassword ? (
        <div className="account-action">
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button className="account-save-button" onClick={handleChangePassword}>Save Password</button>
          <button className="account-cancel-button" onClick={() => setIsChangingPassword(false)}>Cancel</button>
        </div>
      ) : (
        <button className="account-action-button" onClick={() => setIsChangingPassword(true)}>Change Password</button>
      )}
  
      {isChangingEmail ? (
        <div className="account-action">
          <input
            type="email"
            placeholder="Enter new email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <button className="account-save-button" onClick={handleChangeEmail}>Save Email</button>
          <button className="account-cancel-button" onClick={() => setIsChangingEmail(false)}>Cancel</button>
        </div>
      ) : (
        <button className="account-action-button" onClick={() => setIsChangingEmail(true)}>Change Email</button>
      )}
  
      {isChangingGradStatus ? (
        <div className="account-action">
          <select className="account-select" value={newGradStatus} onChange={(e) => setNewGradStatus(e.target.value)}>
            <option value="None">--</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Graduate">Graduate</option>
          </select>
          <button className="account-save-button" onClick={handleChangeGradStatus}>Save Grad Status</button>
          <button className="account-cancel-button" onClick={() => setIsChangingGradStatus(false)}>Cancel</button>
        </div>
      ) : (
        <button className="account-action-button" onClick={() => setIsChangingGradStatus(true)}>Change Grad Status</button>
      )}
  
      {isChangingMajor ? (
        <div className="account-action">
          <select className="account-select" value={newMajor} onChange={(e) => setNewMajor(e.target.value)}>
            <option value="None">--</option>
            <option value="Computer Science">Computer Science</option>
            <option value="New Media Design">New Media Design</option>
          </select>
          <button className="account-save-button" onClick={handleChangeMajor}>Save Major</button>
          <button className="account-cancel-button" onClick={() => setIsChangingMajor(false)}>Cancel</button>
        </div>
      ) : (
        <button className="account-action-button" onClick={() => setIsChangingMajor(true)}>Change Major</button>
      )}
  
      <button className="account-delete-button" onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
  
}
