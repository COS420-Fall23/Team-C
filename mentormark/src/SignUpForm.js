import { useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
//import { saveAs } from 'file-saver';

/*
Planned changes:
-Have submit button send inputs to validation function
	-If valid, user inputs are saved, user account is created and success message displayed
	-If invalid, user directed back to signup page to fill out form again
		-Maybe save user inputs for editing

*/


export default function SignUpForm() {

	// States for registration
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [gStatus, setgStatus] = useState('');
	const [major, setMajor] = useState('');

	// States for checking the errors
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);

	// Data variable
	let data = 
          '\r Name: ' + name + ' \r\n ' + 
          'Email: ' + email + ' \r\n ' + 
          'Password: ' + password + ' \r\n ' + 
          'GradStatus: ' + gStatus + '\r\n ' +
		  'Major: ' + major;

	// Handling the name change
	const handleName = (e) => {
		setName(e.target.value);
		setSubmitted(false);
	};

	// Handling the email change
	const handleEmail = (e) => {
		setEmail(e.target.value);
		setSubmitted(false);
	};

	// Handling the password change
	const handlePassword = (e) => {
		setPassword(e.target.value);
		setSubmitted(false);
	};

	//Handling the major change
	const handleMajor = (e) => {
		setMajor(e.target.value);
		setSubmitted(false);
	}

	//Handling the major change
	const handleGStatus = (e) => {
		setgStatus(e.target.value);
		setSubmitted(false);
	}

	// Validate Password
	function isStrongPassword(value) {
		var pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,}$/;
		return pattern.test(value);
	}

	// Validate name
	function validateName(value) {
		var re = /[^A-Za-z ']/;
		return re.test(value);
	}

	//Validate Email
	function validateEmail(value) {
		// regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
		var re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z0-9-]+\.)*[a-zA-Z]{2,}))$/;
		return re.test(value);
	}

	// Handling Save
	const handleDownload = () => {
		//const file = new Blob([data], { type: 'text/plain;charset=utf-8' });
		//saveAs(file, 'accounts.txt');
	}

	// Handling the form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateName(name) === true || validateEmail(email) === false || isStrongPassword(password) === false ) {
			setError(true);
		} else {
			handleDownload(name, email, password, gStatus, major);
			setSubmitted(true);
			setError(false);
		}
	};

	// Showing success message
	const successMessage = () => {
		return (
			<div
				className="success"
				style={{
					display: submitted ? '' : 'none',
				}}>
				<h1>User {name} successfully registered!!</h1>
			</div>
		);
	};

	// Showing error message if error is true
	const errorMessage = () => {
		return (
			<div
				className="error"
				style={{
					display: error ? '' : 'none',
				}}>
				<h1>Please enter all the fields</h1>
			</div>
		);
	};

	return (
		<div className="form">
			<button>
                <Link to="/"><h3>Home</h3></Link>
            </button>
			<div>
				<h1>Sign Up Form</h1>
			</div>

			{/* Calling to the methods */}
			<div className="messages">
				{errorMessage()}
				{successMessage()}
			</div>

			<form>
				{/* Labels and inputs for form data */}
				<label className="label">Name</label>
				<input onChange={handleName} className="input"
					value={name} type="text" />

				<label className="label">Email</label>
				<input onChange={handleEmail} className="input"
					value={email} type="email" />

				<label className="label">Password</label>
				<input onChange={handlePassword} className="input"
					value={password} type="password" />

				<label className="label">Graduate Status</label>
				<select onChange={handleGStatus} id="GradStatus">
					<option value="null">--</option>
					<option value="option1">Undergraduate</option>
					<option value="option2">Graduate</option>
				</select>
				
				<label className="label">Major</label>
				<select onChange={handleMajor} id="Major">
					<option value="null">--</option>
					<option value="option1">Computer Science</option>
					<option value="option2">New Media Design</option>
				</select>

				<button onClick={handleSubmit} className="btn"
						type="submit">
					Submit
				</button>

			</form>
		</div>
	);
}
