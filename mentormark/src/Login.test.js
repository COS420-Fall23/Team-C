import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './Login';

describe("Login", () => {
    test("Login renders", () => {
        render(<Login />);
        screen.getByRole('textbox');
    });
});