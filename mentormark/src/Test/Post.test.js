import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Post from '../Post';
import { MemoryRouter } from 'react-router-dom';

const testPost = {title: "Test 1", content: "This is the first test post"}

describe("Post", () => {
    test("Post renders", async () => {
        render(<MemoryRouter><Post toChild={testPost} /></MemoryRouter>);
        expect(screen.getByRole('link')).toBeInTheDocument();
        expect(screen.getByText(/Test 1/)).toBeInTheDocument();
    });
    test("Post fails ot render with bad/no props", async () => {
        render(<MemoryRouter><Post toChild={null} /></MemoryRouter>);
        expect(screen.getByText(/Error loading post/)).toBeInTheDocument();
    });
});