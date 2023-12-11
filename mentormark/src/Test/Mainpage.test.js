import { render, fireEvent, screen } from '@testing-library/react';
import Mainpage from '../Mainpage.js';
import * as React from 'react';

// Mocking necessary modules
jest.mock('../firebaseConfig.js', () => ({
  storage: {
    ref: jest.fn((storage, path) => ({
      uploadBytesResumable: jest.fn().mockReturnValue({
        on: jest.fn((event, progress, error, success) => {
          if (event === 'state_changed') {
            progress({ bytesTransferred: 100, totalBytes: 200 });
            success();
          }
        }),
        snapshot: {
          ref: {
            getDownloadURL: jest.fn().mockResolvedValue('mock-url'),
          },
        },
      }),
    })),
  },
  db: {
    collection: jest.fn(() => ({
      addDoc: jest.fn().mockResolvedValue({ id: 'mock-id' }),
    })),
  },
}));

jest.mock('firebase/storage', () => ({
    ref: jest.fn(),
    getDownloadURL: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    signOut: jest.fn(),
}));

// Mocking the useNavigate hook from 'react-router-dom'
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useNavigate: () => jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    getDocs: jest.fn(),
}));



test('renders Mainpage without crashing', () => {
  render(<Mainpage />);
  expect(screen.getByText('MentorMark')).toBeInTheDocument();
});

test('sets searchText when typing in search input', () => {
  render(<Mainpage />);
  const searchInput = screen.getByRole('textbox');
  fireEvent.change(searchInput, { target: { value: 'Test' } });
  expect(searchInput.value).toBe('Test');
});

test('toggles dropdown when user clicks profile', () => {
  render(<Mainpage />);
  const profileButton = screen.getByAltText('Profile');
  fireEvent.click(profileButton);
  expect(screen.getByText('Account')).toBeInTheDocument();
  expect(screen.getByText('Sign Out')).toBeInTheDocument();
});

test('calls signOut when user clicks Sign Out', () => {
  const { signOut } = require('firebase/auth');
  
  render(<Mainpage />);
  const profileButton = screen.getByAltText('Profile');
  fireEvent.click(profileButton);
  const signOutButton = screen.getByText('Sign Out');
  fireEvent.click(signOutButton);
  
  expect(signOut).toHaveBeenCalled();
});