// import * as React from 'react';
// import { render, screen } from '@testing-library/react';
// import Post from '../Post';
// import { MemoryRouter } from 'react-router-dom';

// const testPost = {title: "Test 1", content: "This is the first test post"}

// describe("Post", () => {
//     test("Post renders", async () => {
//         render(<MemoryRouter><Post toChild={testPost} /></MemoryRouter>);
//         expect(screen.getByRole('link')).toBeInTheDocument();
//         expect(screen.getByText(/Test 1/)).toBeInTheDocument();
//     });
//     test("Post fails ot render with bad/no props", async () => {
//         render(<MemoryRouter><Post toChild={null} /></MemoryRouter>);
//         expect(screen.getByText(/Error loading post/)).toBeInTheDocument();
//     });
// });

import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Post from '../Post';
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup);

describe('Post component', () => {
  it('Displays post content when post is provided', () => {
    const post = { title: 'Test Title', content: 'Test Content' };
    render(<MemoryRouter><Post toChild={post} /></MemoryRouter>);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('Displays error message when post is null', () => {
    render(<MemoryRouter><Post toChild={null} /></MemoryRouter>);
    expect(screen.getByText('Error loading post')).toBeInTheDocument();
  });

  it('Displays error message when post is undefined', () => {
    render(<MemoryRouter><Post /></MemoryRouter>);
    expect(screen.getByText('Error loading post')).toBeInTheDocument();
  });

  it('Back to Post List link is present', () => {
    const post = { title: 'Test Title', content: 'Test Content' };
    render(<MemoryRouter><Post toChild={post} /></MemoryRouter>);

    expect(screen.getByText('Back to Post List')).toBeInTheDocument();
  });

  it('sendToParent is called when Back to Post List link is clicked', () => {
    const mockFn = jest.fn();
    const post = { title: 'Test Title', content: 'Test Content' };
    render(<MemoryRouter><Post toChild={post} sendToParent={mockFn} /></MemoryRouter>);

    fireEvent.click(screen.getByText('Back to Post List'));

    expect(mockFn).toHaveBeenCalled();
  });

  it('sendToParent is called with null as argument when Back to Post List link is clicked', () => {
    const mockFn = jest.fn();
    const post = { title: 'Test Title', content: 'Test Content' };
    render(<MemoryRouter><Post toChild={post} sendToParent={mockFn} /></MemoryRouter>);

    fireEvent.click(screen.getByText('Back to Post List'));

    expect(mockFn).toHaveBeenCalledWith(null);
  });

  it('Renders the post-title class', () => {
    const post = { title: 'Test Title', content: 'Test Content' };
    render(<MemoryRouter><Post toChild={post} /></MemoryRouter>);

    expect(screen.getByText('Test Title')).toHaveClass('post-title');
  });

  it('Renders the post-body class', () => {
    const post = { title: 'Test Title', content: 'Test Content' };
    render(<MemoryRouter><Post toChild={post} /></MemoryRouter>);

    expect(screen.getByText('Test Content')).toHaveClass('post-body');
  });
});