import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data());
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, [auth.currentUser]);

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
      alert('Email changed successfully!');
      setIsChangingEmail(false);
    } catch (error) {
      console.error('Error changing email:', error.message);
    }
  };

  const handleChangeGradStatus = async () => {
    try {
      // Update grad status in Firestore
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        gradStatus: newGradStatus,
      });

      alert('Grad status changed successfully!');
      setIsChangingGradStatus(false);
    } catch (error) {
      console.error('Error changing grad status:', error.message);
    }
  };

  const handleChangeMajor = async () => {
    try {
      // Update major in Firestore
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        major: newMajor,
      });

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
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Grad Status: {user.gradStatus}</p>
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
            <option value="Undergrad">Undergraduate</option>
            <option value="Grad">Graduate</option>
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
            <option value="CompSci">Computer Science</option>
            <option value="NMD">New Media Design</option>
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
