import { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
// import { saveAs } from 'file-saver';
//import createFile from './serverAccess';
import serverAccess from "./serverAccess";
import MentorMarkLogo from "./logo/MentorMarkLogoFinals-12.png";

/*
Planned changes:
-Have submit button send inputs to validation function
	-If valid, user inputs are saved, user account is created and success message displayed
	-If invalid, user directed back to signup page to fill out form again
		-Maybe save user inputs for editing

*/

export default function SignUpForm() {
  // States for registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gStatus, setgStatus] = useState("");
  const [major, setMajor] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Data variable
  let data =
    "\r Name: " +
    name +
    " \r\n " +
    "Email: " +
    email +
    " \r\n " +
    "Password: " +
    password +
    " \r\n " +
    "GradStatus: " +
    gStatus +
    "\r\n " +
    "Major: " +
    major;

<<<<<<< HEAD
  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };
=======
	// Data variable
	let data = 
          '\r Name: ' + name + ' \r\n ' + 
          'Email: ' + email + ' \r\n ' + 
          'Password: ' + password + ' \r\n ' + 
          'GradStatus: ' + gStatus + '\r\n ' +
		  'Major: ' + major + '\r\n';
>>>>>>> c6b149a7ae9b1793e2ae25fd913445a54e8f5a74

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
  };

  //Handling the major change
  const handleGStatus = (e) => {
    setgStatus(e.target.value);
    setSubmitted(false);
  };

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
    var re =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z0-9-]+\.)*[a-zA-Z]{2,}))$/;
    return re.test(value);
  }

  // Handling Save
  const handleDownload = () => {
    const temp_Server = new serverAccess();
    temp_Server.createFile(data);
    // const file = new Blob([data], { type: 'text/plain;charset=utf-8' });
    // fs.writeFileSync('./accounts', data)

<<<<<<< HEAD
    //saveAs(file, 'accounts.txt');
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      validateName(name) === true ||
      validateEmail(email) === false ||
      isStrongPassword(password) === false
    ) {
      setError(true);
    } else {
      handleDownload(name, email, password, gStatus, major);
      setSubmitted(true);
      setError(false);
      return <Link to="/"></Link>;
    }
  };
=======
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
		}
	};
>>>>>>> c6b149a7ae9b1793e2ae25fd913445a54e8f5a74

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
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
          display: error ? "" : "none",
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div className="form">
      <div className="back-button">
        <Link to="/">
          <h3>Back</h3>
        </Link>
      </div>
      <div className="form-container">
        <img
          src={MentorMarkLogo}
          alt="MentorMark Logo"
          className="sign-up-logo"
        />
        <h1>entorMark</h1>
        <div className="messages">
          {errorMessage()}
          {successMessage()}
        </div>
        <form>
          <label className="label">Name</label>
          <input
            onChange={handleName}
            className="input"
            value={name}
            type="text"
            style={{ width: "430px" }}
          />

          <label className="label">Email</label>
          <input
            onChange={handleEmail}
            className="input"
            value={email}
            type="email"
            style={{ width: "430px" }}
          />

          <label className="label">Password</label>
          <input
            onChange={handlePassword}
            className="input"
            value={password}
            type="password"
            style={{ width: "430px" }}
          />

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

<<<<<<< HEAD
          <button onClick={handleSubmit} className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
=======
				<label className="label">Password</label>
				<input onChange={handlePassword} className="input"
					value={password} type="password" />

				<label className="label">Graduate Status</label>
				<select onChange={handleGStatus} id="GradStatus">
					<option value="null">--</option>
					<option value="Undergrad">Undergraduate</option>
					<option value="Grad">Graduate</option>
				</select>
				
				<label className="label">Major</label>
				<select onChange={handleMajor} id="Major">
					<option value="null">--</option>
					<option value="CompSci">Computer Science</option>
					<option value="NMD">New Media Design</option>
				</select>

				<button onClick={handleSubmit} className="btn"
						type="submit">
					Submit
				</button>

			</form>
		</div>
	);
>>>>>>> c6b149a7ae9b1793e2ae25fd913445a54e8f5a74
}
