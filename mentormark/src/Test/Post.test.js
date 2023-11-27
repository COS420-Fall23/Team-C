import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Post from '../Post';
import { MemoryRouter } from 'react-router-dom';
import testImg from '../logo/MentorMarkLogoFinals-12.png';

afterEach(cleanup);
const post = { title: 'Test Title', content: 'Test Content', file: testImg };

describe('Post component', () => {
  it('Displays post content when post is provided', () => {
    render(<MemoryRouter><Post toChild={post} /></MemoryRouter>);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByAltText('MentorMarkLogoFinals-12.png')).toBeInTheDocument();
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
    render(<MemoryRouter><Post toChild={post} /></MemoryRouter>);

    expect(screen.getByText('Back to Post List')).toBeInTheDocument();
  });

  it('sendToParent is called when Back to Post List link is clicked', () => {
    const mockFn = jest.fn();
    render(<MemoryRouter><Post toChild={post} sendToParent={mockFn} /></MemoryRouter>);

    fireEvent.click(screen.getByText('Back to Post List'));

    expect(mockFn).toHaveBeenCalled();
  });
});