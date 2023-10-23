import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="top-bar">
          <div className="buttons">
            <button
              className="sign-up-button"
              onClick={() => console.log("Refer to Sign up page.")}
            >
              Sign Up
            </button>
            <div className="log-in-button-frame">
              <button
                className="log-in-button"
                onClick={() => console.log("Refer to Log In page.")}
              >
                Log In
              </button>
            </div>
          </div>
          <p className="app-name">Mentor Mark</p>
        </div>
      </header>
    </div>
  );
}

export default App;
