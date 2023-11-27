import { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import MentorMarkLogo from "./logo/MentorMarkLogoFinals-12.png";

export default function SignUpForm() {
  const history = useNavigate();

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
    major +
    "\r\n";

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
  const handleDownload = async (e) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
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
        className="SignUperror"
        style={{
          display: error ? "" : "none",
        }}
      >
        <div>
          <h1
            style={{
              backgroundColor: "#f4363f",
              color: "white",
              fontSize: "18px",
              padding: "10px",
              lineHeight: "1.2",
            }}
          >
            Please enter all the fields
          </h1>
        </div>
      </div>
    );
  };

  const goToMainpage = () => {
    // Navigate to mainpage
    history("/mainpage");
  };

  return (
    <div className="signup-form">
      <div className="signup-back-button">
        <Link to="/">
          <h3>Back</h3>
        </Link>
      </div>
      <div
        className="signup-form-container"
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          padding: "10px", // Reduced vertical padding
          boxSizing: "border-box",
          display: "block",
          height: "1000px", // Directly set the height
        }}
      >
        <img
          src={MentorMarkLogo}
          alt="MentorMark Logo"
          className="signup-logo"
          style={{
            position: "relative",
            top: "75px",
            left: "-150px",
            width: "34%",
          }}
        />
        <h1
          className="signup-heading"
          style={{ marginTop: "-25px", marginLeft: "20px" }}
        >
          entorMark
        </h1>
        <div className="signup-messages">
          {errorMessage()}
          {successMessage()}
        </div>
        <form>
          <label className="signup-label">Name</label>
          <input
            onChange={handleName}
            className="signup-input"
            value={name}
            type="text"
            style={{ width: "335px" }}
          />

          <label className="signup-label">Email</label>
          <input
            onChange={handleEmail}
            className="signup-input"
            value={email}
            type="email"
            style={{ width: "335px" }}
          />

          <label className="signup-label">Password</label>
          <input
            onChange={handlePassword}
            className="signup-input"
            value={password}
            type="password"
            style={{ width: "335px" }}
          />

          <label className="signup-label">Graduate Status</label>
          <select
            onChange={handleGStatus}
            id="GradStatus"
            className="signup-select"
          >
            <option value="null">--</option>
            <option value="Undergrad">Undergraduate</option>
            <option value="Grad">Graduate</option>
          </select>

          <label className="signup-label">Major</label>
          <select onChange={handleMajor} id="Major" className="signup-select">
            <option value="null">--</option>
            <option value="CompSci">Computer Science</option>
            <option value="NMD">New Media Design</option>
          </select>

          <button onClick={handleSubmit} className="signup-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
