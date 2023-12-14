import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AccountPage from '../Account'; // Import the component

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    updateProfile: jest.fn(),
    updateEmail: jest.fn(),
    updatePassword: jest.fn(),
    deleteUser: jest.fn(),
    // Add more Firebase auth functions you're using in your component
  }));
  
  jest.mock('firebase/firestore', () => {
    const mockGetFirestore = jest.fn();
    const mockCollection = jest.fn();
    const mockGet = jest.fn();
    const mockUpdate = jest.fn();
    
    const mockDoc = jest.fn(() => ({
      get: mockGet,
      update: mockUpdate,
      // Include other Firestore document methods you are using
    }));
  
    return {
      getFirestore: mockGetFirestore,
      collection: mockCollection,
      doc: mockDoc,
      // Include other Firestore functions you are using
    };
  });
  
  jest.mock('firebase/storage', () => ({
    getStorage: jest.fn(),
    ref: jest.fn(),
    uploadBytesResumable: jest.fn(),
    getDownloadURL: jest.fn(),
    // Add more Storage functions you're using in your component
  }));

  jest.mock('../firebaseConfig.js', () => ({
    db: {
      // Mock Firestore-related functions or objects you're using in your component
      collection: jest.fn(),
      doc: jest.fn(),
      getDoc: jest.fn(),
      updateDoc: jest.fn(),
      // Add other Firestore functions you use in your component
    },
    storage: {
      // Mock Storage-related functions or objects you're using in your component
      ref: jest.fn(),
      uploadBytesResumable: jest.fn(),
      getDownloadURL: jest.fn(),
      // Add other Storage functions you use in your component
    },
    auth: {
      // Mock Authentication-related functions or objects you're using in your component
      setPersistence: jest.fn(),
      // Add other Auth functions you use in your component
    },
  }));

describe('AccountPage Component', () => {
  it('renders without crashing', () => {
    render(<AccountPage setProfilePicture={() => {}} />);
    // Check if certain elements are present after rendering
    expect(screen.getByText('Loading...')).toBeInTheDocument(); // Assuming 'Loading...' is present initially
  });

  it('allows profile picture upload', () => {
    // Mock necessary functions used within the component
    const setProfilePicture = jest.fn();
    const navigate = jest.fn();
    global.alert = jest.fn(); // Mock the global alert function
    
    render(<AccountPage setProfilePicture={setProfilePicture} />);
    
    // Simulate uploading a profile picture
    const file = new File(['(⌐□_□)'], 'profile.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText('input-prof-select'); // Assuming this label exists for the file input
    fireEvent.change(input, { target: { files: [file] } });

    // Assertions for profile picture upload
    expect(setProfilePicture).toHaveBeenCalled(); // Ensure setProfilePicture function was called
    expect(navigate).toHaveBeenCalledWith('/mainpage', { state: { profilePicture: 'mockProfilePictureURL' } }); // Mock the URL accordingly
    expect(global.alert).toHaveBeenCalledWith('Image uploaded successfully!'); // Assuming an alert is shown upon successful upload
  });

  //password testing
  it('changes password successfully', async () => {
    const mockUpdatePassword = jest.fn().mockResolvedValue();
    jest.mock('firebase/auth', () => ({
      updatePassword: mockUpdatePassword,
    }));

    render(<AccountPage setProfilePicture={() => {}} />);

    fireEvent.click(screen.getByText('Change Password'));

    const passwordInput = screen.getByPlaceholderText('Enter new password');
    fireEvent.change(passwordInput, { target: { value: 'newPassword123' } });

    fireEvent.click(screen.getByText('Save Password'));

    expect(mockUpdatePassword).toHaveBeenCalledWith(expect.any(Object), 'newPassword123');
    // Assuming you have an alert when the password changes successfully
    expect(global.alert).toHaveBeenCalledWith('Password changed successfully!');
  });

  //below for four are user credentials testing for changes

  //testing for email
  it('changes email successfully', async () => {
    const mockUpdateEmail = jest.fn().mockResolvedValue();
    const mockUpdateFirestore = jest.fn().mockResolvedValue();
    jest.mock('firebase/auth', () => ({
      updateEmail: mockUpdateEmail,
    }));
    jest.mock('./firebaseConfig', () => ({
      updateDoc: mockUpdateFirestore,
      db: jest.fn(),
      auth: {
        currentUser: {
          displayName: 'testUserName',
        },
      },
    }));

    render(<AccountPage setProfilePicture={() => {}} />);

    fireEvent.click(screen.getByText('Change Email'));

    const emailInput = screen.getByPlaceholderText('Enter new email');
    fireEvent.change(emailInput, { target: { value: 'newemail@example.com' } });

    fireEvent.click(screen.getByText('Save Email'));

    expect(mockUpdateEmail).toHaveBeenCalledWith(expect.any(Object), 'newemail@example.com');
    expect(mockUpdateFirestore).toHaveBeenCalledWith(expect.any(Object), {
      email: 'newemail@example.com',
    });
    expect(global.alert).toHaveBeenCalledWith('Email changed successfully!');
  });

  //testing for gradStatus
  it('changes graduation status successfully', async () => {
    const mockUpdateFirestore = jest.fn().mockResolvedValue();
    jest.mock('./firebaseConfig', () => ({
      updateDoc: mockUpdateFirestore,
      db: jest.fn(),
      auth: {
        currentUser: {
          displayName: 'testUserName',
        },
      },
    }));

    render(<AccountPage setProfilePicture={() => {}} />);

    fireEvent.click(screen.getByText('Change Grad Status'));

    const gradStatusInput = screen.getByLabelText('pass-input-box');
    fireEvent.change(gradStatusInput, { target: { value: 'Graduate' } });

    fireEvent.click(screen.getByText('Save Grad Status'));

    expect(mockUpdateFirestore).toHaveBeenCalledWith(expect.any(Object), {
      gStatus: 'Graduate',
    });
    expect(global.alert).toHaveBeenCalledWith('Grad status changed successfully!');
  });

  //testing for major
  it('changes major successfully', async () => {
    const mockUpdateFirestore = jest.fn().mockResolvedValue();
    jest.mock('./firebaseConfig', () => ({
      updateDoc: mockUpdateFirestore,
      db: jest.fn(),
      auth: {
        currentUser: {
          displayName: 'testUserName',
        },
      },
    }));

    render(<AccountPage setProfilePicture={() => {}} />);

    fireEvent.click(screen.getByText('Change Major'));

    const majorInput = screen.getByLabelText('pass-input-box');
    fireEvent.change(majorInput, { target: { value: 'Computer Science' } });

    fireEvent.click(screen.getByText('Save Major'));

    expect(mockUpdateFirestore).toHaveBeenCalledWith(expect.any(Object), {
      major: 'Computer Science',
    });
    expect(global.alert).toHaveBeenCalledWith('Major changed successfully!');
  });

  //testing for sign out component
  it('signs out successfully', async () => {
    const mockSignOut = jest.fn().mockResolvedValue();
    const mockNavigate = jest.fn();
    jest.mock('firebase/auth', () => ({
      signOut: mockSignOut,
    }));
    jest.mock('react-router-dom', () => ({
      useNavigate: () => mockNavigate,
      Link: jest.fn(),
    }));

    render(<AccountPage setProfilePicture={() => {}} />);

    fireEvent.click(screen.getByText('Sign Out'));

    expect(mockSignOut).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  //testing for delete account component
  it('deletes account successfully', async () => {
    const mockDeleteUser = jest.fn().mockResolvedValue();
    jest.mock('firebase/auth', () => ({
      deleteUser: mockDeleteUser,
      currentUser: {
        displayName: 'testUserName',
      },
    }));
    global.window.confirm = jest.fn().mockReturnValueOnce(true); // Mocking window.confirm to return true

    render(<AccountPage setProfilePicture={() => {}} />);

    fireEvent.click(screen.getByText('Delete Account'));

    expect(global.window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete your account? This action is irreversible.'
    );
    expect(mockDeleteUser).toHaveBeenCalled();
    // Assuming the alert is shown upon successful account deletion
    expect(global.alert).toHaveBeenCalledWith('Account deleted successfully!');
  });

});