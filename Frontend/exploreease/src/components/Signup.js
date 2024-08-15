import React, { useState } from "react";
import './newcss.css';

function Signup({ switchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
//validation of the form
  const validateForm = () => {
    let valid = true;
    let errors = {
      username: "",
      password: "",
      email: "",
    };

    if (!username.trim()) {
      errors.username = "Username is required.";
      valid = false;
    }

    if (!email.trim()) {
      errors.email = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid.";
      valid = false;
    }

    if (!password.trim()) {
      errors.password = "Password is required.";
      valid = false;
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
      valid = false;
    } else if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      errors.password = "Password must contain both letters and numbers.";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };
//to post the values of username email and password
  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      const user = { username, email, password };
      fetch('http://localhost:8080/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          switchToLogin();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };
//form for signup
  return (
    <div id="signup-tab-content" className="tabcontent" style={{ display: "block" }}>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className={`input ${errors.username && "input-error"}`}
          id="user_name"
          autoComplete="off"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        {errors.username && <p className="error">{errors.username}</p>}

        <input
          type="email"
          className={`input ${errors.email && "input-error"}`}
          id="user_email"
          autoComplete="off"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          className={`input ${errors.password && "input-error"}`}
          id="user_pass"
          autoComplete="off"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <input type="submit" className="button" value="Sign Up" />
      </form>
    </div>
  );
}

export default Signup;
