import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { storage, db } from '../firebaseConfig.js';
import PostCreation from '../PostCreation';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

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

describe('<PostCreation />', () => {
  test('renders without crashing', () => {
    render(<PostCreation />);
  });

  test('renders form with title, content and file input', () => {
    render(<PostCreation />);
    expect(screen.getByLabelText('Title:')).toBeInTheDocument();
    expect(screen.getByLabelText('Content:')).toBeInTheDocument();
    expect(screen.getByLabelText('Upload File:')).toBeInTheDocument();
  });

  test('calls handleInputChange when title input changes', () => {
    render(<PostCreation />);
    fireEvent.change(screen.getByLabelText('Title:'), { target: { value: 'Test Title' } });
    expect(screen.getByLabelText('Title:').value).toBe('Test Title');
  });

  test('calls handleInputChange when content input changes', () => {
    render(<PostCreation />);
    fireEvent.change(screen.getByLabelText('Content:'), { target: { value: 'Test Content' } });
    expect(screen.getByLabelText('Content:').value).toBe('Test Content');
  });

  test('calls createPost when Create Post button is clicked', async () => {
    render(<PostCreation />);
    fireEvent.change(screen.getByLabelText('Title:'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText('Content:'), { target: { value: 'Test Content' } });
    fireEvent.change(screen.getByLabelText('Upload File:'), { target: { files: [new File(['file'], 'test.png', { type: 'image/png' })] } });
    const button = screen.getByRole('button', { name: /Create Post/i });
    fireEvent.click(button);
    await waitFor(() => expect(useNavigate).toHaveBeenCalled());
  });

  test('shows alert when Create Post button is clicked with incomplete form', () => {
    window.alert = jest.fn();
    render(<PostCreation />);
    const button = screen.getByRole('button', { name: /Create Post/i });
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalled();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<PostCreation />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders form with a submit button', () => {
    render(<PostCreation />);
    const button = screen.getByRole('button', { name: /Create Post/i });
    expect(button).toBeInTheDocument();
  });

  test('title input is initially empty', () => {
    render(<PostCreation />);
    expect(screen.getByLabelText('Title:').value).toBe('');
  });

  test('content textarea is initially empty', () => {
    render(<PostCreation />);
    expect(screen.getByLabelText('Content:').value).toBe('');
  });
});