import React, { useEffect } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  // const { googleSignIn, user1, facebookSignIn } = UserAuth();
  const navigate = useNavigate();

  const handleFacebookSignIn = async () => {
    try {
      // await facebookSignIn();
    } catch (error) {
      console.log("eroor hai baba", error);
    }
  };

  //google sign in
  const handleGoogleSignIn = async () => {
    try {
      // await googleSignIn();
    } catch (error) {
      console.log("eroor hai baba", error);
    }
  };
  // useEffect(() => {
  //   if (user1 !== null) {
  //     navigate("/home");
  //   }
  //   navigate("/login");
  // }, [user1]);

  // const googleAuth = async () => {
  //   console.log("ttt");
  //   window.open(`http://localhost:8080/auth/google/callback`, "_self");
  // };

  return (
    <div className={"container"}>
      <h1 className="heading">Log in Form</h1>
      <div className="form_container">
        <div className={"left"}>
          <img
            className={"img"}
            src="https://images.unsplash.com/photo-1687983827622-47a9950000c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
            alt="login"
          />
        </div>
        <div className={"right"}>
          <h2 className={"from_heading"}>Members Log in</h2>
          <input type="text" className={"input"} placeholder="Email" />
          <input type="text" className={"input"} placeholder="Password" />
          <button className={"btn"}>Log In</button>
          <p className={"text"}>or</p>
          <button
            className={"google_btn"}
            onClick={() => console.log("handleGoogleSignIn")}
          >
            <img
              src="https://w7.pngwing.com/pngs/989/129/png-transparent-google-logo-google-search-meng-meng-company-text-logo-thumbnail.png"
              alt="google icon"
            />
            <span>SignIn with Google</span>
          </button>
          <button
            className={"google_btn"}
            onClick={() => console.log("handleFacebookSignIn")}
          >
            <img
              src="https://images.unsplash.com/photo-1635756837851-d3b6edbaa11c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZhY2Vib29rJTIwbG9nb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="google icon"
            />
            <span>SignIn with Facebook</span>
          </button>
          <p className={"text"}>
            New Here ? <Link to="/signup">SignUp</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
