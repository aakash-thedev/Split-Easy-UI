import axios from "axios";
import './Login.css';
import React, { useState, ChangeEvent } from "react";
import { JWT_TOKEN, setCookie } from "../../services/cookieService";
import ApiService from "../../services/ApiService";

interface FormState {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [state, setState] = useState<FormState>({
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { email, password } = state;
      const response = await ApiService().client.post('http://localhost:8080/api/users/login', { email, password });
      const { jwtToken, user } = response.data;
      localStorage.setItem('token', jwtToken);
      localStorage.setItem('user', JSON.stringify(user));
      setCookie(JWT_TOKEN, jwtToken);

      setState({
        email: "",
        password: ""
      });

      window.location.href = '/groups';
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="form-container login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1 className="login-heading">LOGIN</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />

        <button className="sign-in-button" type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Login;