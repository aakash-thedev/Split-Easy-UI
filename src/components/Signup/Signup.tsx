import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "./Signup.css";
import { JWT_TOKEN, setCookie } from "../../services/cookieService";
import ApiService from "../../services/ApiService";

interface FormState {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [state, setState] = useState<FormState>({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleOnSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const { name, email, password } = state;
    try {
      const response = await ApiService().client.post('http://localhost:8080/api/users/register', { name, email, password });
      const { jwtToken, user } = response.data;
      localStorage.setItem('token', jwtToken);
      localStorage.setItem('user', JSON.stringify(user));
      setCookie(JWT_TOKEN, jwtToken);

      window.location.href = '/groups';
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setState({
        name: "",
        email: "",
        password: ""
      });
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form className="signup-form" onSubmit={handleOnSubmit}>
        <h1 className="sign-up-heading">Create Account</h1>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button className="sign-up-button" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
