import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Post from '../Post';
import { MemoryRouter } from 'react-router-dom';




describe("Post", () => {
    test("Post renders", async () => {
        render(<MemoryRouter><Post toChild={'zhcH6mDeDfuYdZ26ta2d'} /></MemoryRouter>);
        expect(screen.getByRole('link')).toBeInTheDocument();
    });
});