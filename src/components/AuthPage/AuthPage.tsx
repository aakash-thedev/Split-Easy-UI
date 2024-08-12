import React, { useState } from "react";
import Login from "../Login/Login";
import SignUp from "../Signup/Signup";
import './AuthPage.css'

type FormType = "signIn" | "signUp";

const AuthPage: React.FC = () => {
  const [type, setType] = useState<FormType>("signIn");

  const handleOnClick = (text: FormType) => {
    if (text !== type) {
      setType(text);
    }
  };

  const containerClass = `container ${type === "signUp" ? "right-panel-active" : ""}`;

  return (
    <div className="auth-wrapper">
      <div className={containerClass} id="container">
        {type === "signUp" ? <SignUp /> : <Login />}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p style={{ maxWidth: '386px', lineHeight: '1.5' }}>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
                style={{ marginTop: '12px' }}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Welcome to Split Easy</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
                style={{ marginTop: '12px' }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
