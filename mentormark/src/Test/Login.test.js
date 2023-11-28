import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../Login';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';


describe('Login Component', () => {
  test('renders login form', () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/log in/i)).toBeInTheDocument();
  });

  test('handles form submission with valid data', async () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText(/log in/i));

    // You may need to adjust the next line depending on your async logic
    await waitFor(() => {
      expect(window.location.href).toMatch(/\/mainpage$/);
    });
  });

  test('handles form submission with invalid data', async () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    fireEvent.click(screen.getByText(/log in/i));

    await waitFor(() => {
      expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
    });
  });
});
