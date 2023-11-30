import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db, updateEmail, updatePassword, deleteUser, doc, getDoc, updateDoc } from './firebaseConfig';

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
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Grad Status: {user.gStatus}</p>
      <p>Major: {user.major}</p>

      {isChangingPassword ? (
        <div>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleChangePassword}>Save Password</button>
          <button onClick={() => setIsChangingPassword(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setIsChangingPassword(true)}>Change Password</button>
      )}

      {isChangingEmail ? (
        <div>
          <input
            type="email"
            placeholder="Enter new email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <button onClick={handleChangeEmail}>Save Email</button>
          <button onClick={() => setIsChangingEmail(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setIsChangingEmail(true)}>Change Email</button>
      )}

      {isChangingGradStatus ? (
        <div>
          <select value={newGradStatus} onChange={(e) => setNewGradStatus(e.target.value)}>
            <option value="None">--</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Graduate">Graduate</option>
          </select>
          <button onClick={handleChangeGradStatus}>Save Grad Status</button>
          <button onClick={() => setIsChangingGradStatus(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setIsChangingGradStatus(true)}>Change Grad Status</button>
      )}

      {isChangingMajor ? (
        <div>
          <select value={newMajor} onChange={(e) => setNewMajor(e.target.value)}>
            <option value="None">--</option>
            <option value="Computer Science">Computer Science</option>
            <option value="New Media Design">New Media Design</option>
          </select>
          <button onClick={handleChangeMajor}>Save Major</button>
          <button onClick={() => setIsChangingMajor(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setIsChangingMajor(true)}>Change Major</button>
      )}

      <button onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
}
