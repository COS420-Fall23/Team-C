import { useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import serverAccess from './serverAccess';


export default function SignUpForm() {

	const history = useNavigate();

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
		  'Major: ' + major + '\r\n';

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
	const handleDownload = (e) => {
		const temp_Server = new serverAccess();
		temp_Server.createFile(e);
	}

	// Handling the form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateName(name) === true || validateEmail(email) === false || isStrongPassword(password) === false ) {
			setError(true);
		} else {
			handleDownload(data);
			setSubmitted(true);
			setError(false);
			goToMainpage();
		}
	};

	// Showing success message
	const successMessage = () => {
		return (
			<div
				className="SignUpsuccess"
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
				className="SignUperror"
				style={{
					display: error ? '' : 'none',
				}}>
				<h1>Please enter all the fields</h1>
			</div>
		);
	};

	const goToMainpage = () => {
		// Navigate to a different route
		history('/mainpage');
	};

	return (
		<div className='Signup'>
			<div className="Form">
			<button>
                <Link to="/"><h3>Home</h3></Link>
            </button>
			<div>
				<h1>Sign Up Form</h1>
			</div>

			{/* Calling to the methods */}
			<div className="SignUpmessages">
				{errorMessage()}
				{successMessage()}
			</div>

			<form>
				{/* Labels and inputs for form data */}
				<label className="SignUplabel">Name</label>
				<input onChange={handleName} className="SignUpinput"
					value={name} type="text" />

				<label className="SignUplabel">Email</label>
				<input onChange={handleEmail} className="SignUpinput"
					value={email} type="email" />

				<label className="SignUplabel">Password</label>
				<input onChange={handlePassword} className="SignUpinput"
					value={password} type="password" />

				<label className="SignUplabel">Graduate Status</label>
				<select onChange={handleGStatus} id="GradStatus">
					<option value="null">--</option>
					<option value="Undergrad">Undergraduate</option>
					<option value="Grad">Graduate</option>
				</select>
				
				<label className="SignUplabel">Major</label>
				<select onChange={handleMajor} id="Major">
					<option value="null">--</option>
					<option value="CompSci">Computer Science</option>
					<option value="NMD">New Media Design</option>
				</select>

				<button onClick={handleSubmit} className="SignUpbtn"
						type="submit">
					Submit
				</button>

			</form>
		</div>
	</div>
	);
}
