import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import SignUpForm from '../SignUpForm';

describe('SignUpForm component', () => {
  it('submits the form with valid input', () => {
    render(
    <Router>
      <SignUpForm />
    </Router>
    );
    
    // Fill in the form inputs
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const gradStatusSelect = screen.getByLabelText('Graduate Status');
    const majorSelect = screen.getByLabelText('Major');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'StrongP@ssword123' } });
    fireEvent.change(gradStatusSelect, { target: { value: 'Grad' } });
    fireEvent.change(majorSelect, { target: { value: 'CompSci' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Verify success message
    expect(screen.getByText('User John Doe successfully registered!!')).toBeInTheDocument();
  });

  it('displays error message for invalid input', () => {
    render(
      <Router>
        <SignUpForm />
      </Router>
    );
    
    // Fill in the form with invalid input
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const gradStatusSelect = screen.getByLabelText('Graduate Status');
    const majorSelect = screen.getByLabelText('Major');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(nameInput, { target: { value: '123' } }); // Invalid name
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } }); // Invalid email
    fireEvent.change(passwordInput, { target: { value: 'weakpass' } }); // Weak password
    fireEvent.change(gradStatusSelect, { target: { value: 'null' } }); // No grad status selected
    fireEvent.change(majorSelect, { target: { value: 'null' } }); // No major selected

    // Submit the form
    fireEvent.click(submitButton);

    // Verify error message
    expect(screen.getByText('Name can not contain numbers or special characters')).toBeInTheDocument();
    expect(screen.getByText('Email Invalid')).toBeInTheDocument();
    expect(screen.getByText('Password Invalid')).toBeInTheDocument();
    expect(screen.getByText('Password must have at least 8 characters, an uppercase, one number, and a special character')).toBeInTheDocument();
  });

  // Add more test cases to cover other scenarios like edge cases, validation checks, etc.
});
