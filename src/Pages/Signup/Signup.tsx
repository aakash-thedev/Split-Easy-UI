import React from "react";
import "./Signup.scss";
import { Link } from "react-router-dom";

const Signup: React.FC = () => {
  const googleAuth = () => {
    window.open(`http://localhost:3001/auth/google/callback`, "_self");
  };

  return (
    <div className={"container"}>
      <h1 className={"heading"}>Signup Form</h1>
      <div className={"form_container"}>
        <div className={"left"}>
          <img
            className={"img"}
            src="https://images.unsplash.com/photo-1687983545598-6c35818acbda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
            alt="login"
          />
        </div>
        <div className={"right"}>
          <h2 className={"from_heading"}>Create Account</h2>
          <input type="text" className={"input"} placeholder="Username" />
          <input type="email" className={"input"} placeholder="Email" />
          <input type="password" className={"input"} placeholder="Password" />
          <button className={"btn"}>SignUp</button>
          <p className={"text"}>or</p>
          <button className={"google_btn"} onClick={googleAuth}>
            <img
              src="https://w7.pngwing.com/pngs/989/129/png-transparent-google-logo-google-search-meng-meng-company-text-logo-thumbnail.png"
              alt="google icon"
            />
            <span>SignUp with Google</span>
          </button>
          <p className={"text"}>
            Already Have Account ? <Link to="/login">Login </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
