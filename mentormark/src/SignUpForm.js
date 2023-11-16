import { useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebaseConfig';



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
	const [Nerror, setNError] = useState(false);
	const [Merror, setMError] = useState(false);
	const [Perror, setPError] = useState(false);

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
	const handleDownload = async (e) => {
		await createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log(user);
			})
			.catch((error) => {
				console.log(error.code, error.message);
			})
	}

	// Handling the form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		let hasError = false;
		if (validateName(name)) {
			setNError(true);
			hasError = true;
		} else {
			setNError(false);
		}
	  
		if (!validateEmail(email)) {
			setMError(true);
			hasError = true;
		} else {
			setMError(false);
		}
	  
		if (!isStrongPassword(password)) {
			setPError(true);
			hasError = true;
		} else {
			setPError(false);
		}
	  
		if (hasError) {
			setSubmitted(false);
		} else {
			handleDownload(data);
			setSubmitted(true);
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
	const NameErrorMessage = () => {
		return (
			<h1
				htmlFor='name' 
				className="SignUperror"
				style={{
					display: Nerror ? '' : 'none',
				}}>
				<li>Name can not contain numbers or special characters</li>
			</h1>
		);
	};
	const EmailErrorMessage = () => {
		return (
			<h1
				htmlFor='email'
				className="SignUperror"
				style={{
					display: Merror ? '' : 'none',
				}}>
				<li>Email Invalid</li>
			</h1>
		);
	};
	const PasswordErrorMessage = () => {
		return (
			<h1
				htmlFor='password'
				className="SignUperror"
				style={{
					display: Perror ? '' : 'none',
				}}>
				<li>Password Invalid</li>
				<li>Password must have at least 8 characters, an uppercase, one number, and a special character</li>
			</h1>
		);
	};

	const goToMainpage = () => {
		// Navigate to mainpage
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
				{NameErrorMessage()}
				{EmailErrorMessage()}
				{PasswordErrorMessage()}
				{successMessage()}
			</div>

			<form>
				{/* Labels and inputs for form data */}
				<label htmlFor='name' className="SignUplabel">Name</label>
				<input onChange={handleName} className="SignUpinput"
					value={name} type="text" id='name' />
				
				<label htmlFor='email' className="SignUplabel">Email</label>
				<input onChange={handleEmail} className="SignUpinput"
					value={email} type="email" id='email' />

				<label htmlFor='password' className="SignUplabel">Password</label>
				<input onChange={handlePassword} className="SignUpinput"
					value={password} type="password" id='password' />

				<label htmlFor='GradStatus' className="SignUplabel">Graduate Status</label>
				<select onChange={handleGStatus} id="GradStatus">
					<option value="null">--</option>
					<option value="Undergrad">Undergraduate</option>
					<option value="Grad">Graduate</option>
				</select>
				
				<label htmlFor='Major' className="SignUplabel">Major</label>
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
