import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import PostCreation from './PostCreation';

describe('PostCreation component', () => {
  it('creates a post', async () => {
    render(
    <Router>
      <PostCreation />
    </Router>
    );

    const titleInput = screen.getByLabelText('Title:');
    const contentInput = screen.getByLabelText('Content:');
    const fileInput = screen.getByLabelText('Upload File:');

    // Mocking user input
    fireEvent.change(titleInput, { target: { value: 'Test Post Title' } });
    fireEvent.change(contentInput, { target: { value: 'Test Post Content' } });

    // Mock a file to upload
    const file = new File(['(⌐□_□)'], 'test-file.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Mock the API call and submission
    // For instance, you can mock the createPost function and check if it's called correctly
    const createPostMock = jest.fn();
    createPostMock.mockResolvedValue('Document written with ID: 12345'); // Mock the successful post creation
    // Replace the actual function with the mocked one
    PostCreation.prototype.createPost = createPostMock;

    // Trigger the button click to create the post
    fireEvent.click(screen.getByRole('button', { name: 'Create Post' }));

    // Ensure the function is called
    expect(createPostMock).toHaveBeenCalled();
  });
});
