import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import md5 from 'md5';

import './newcss.css';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    general: ""
  });

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validateForm = () => {
    let valid = true;
    let errors = {
      username: "",
      password: "",
      general: ""
    };

    if (!username.trim()) {
      errors.username = "Username is required.";
      valid = false;
    }

    if (!password.trim()) {
      errors.password = "Password is required.";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };
//posts the values of username and password and compares to login
  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (validateForm()) {
      const user = { username, password };
      fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then((response) => {
          if (!response.ok) {
            return response.text().then(text => {
              try {
                const err = JSON.parse(text);
                throw new Error(err.message || 'Invalid credentials');
              } catch (e) {
                throw new Error('Invalid credentials');
              }
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log('Success:', data);
          console.log('User ID:', data.id); // Check if this logs the correct user ID

          localStorage.setItem('userId', data.id);
          localStorage.setItem('username', data.username);
          localStorage.setItem('userEmail', data.email); // Store the user's email
          const gravatarUrl = `https://www.gravatar.com/avatar/${md5(data.email.trim().toLowerCase())}`;
          localStorage.setItem('profilePhotoUrl', gravatarUrl);
  
          if (rememberMe) {
            localStorage.setItem('isLoggedIn', 'true');
          }
          navigate("/");
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error:', error);
          setErrors(prevErrors => ({ ...prevErrors, general: error.message }));
        });
    }
  };
  
//form for login
  return (
    <div id="login-tab-content" className="tabcontent">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className={`input ${errors.username && "input-error"}`}
          id="user_login"
          autoComplete="off"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        {errors.username && <p className="error">{errors.username}</p>}

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

        <input
          type="checkbox"
          className="checkbox"
          id="remember_me"
          checked={rememberMe}
          onChange={(event) => setRememberMe(event.target.checked)}
        />
        <label htmlFor="remember_me">Remember me</label>

        <input type="submit" className="button" value="Login" />
        {errors.general && <p className="error">{errors.general}</p>}
      </form>
      <div className="help-text">
        <p>
          <a href="#">Forget your password?</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
