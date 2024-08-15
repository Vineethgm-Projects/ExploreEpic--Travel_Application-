import React, { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import './App.css'
//joins the login and signup
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;

  // Hide all tab content
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the "active" class from all tab links
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  // Show the selected tab content and add the "active" class to the clicked tab link
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");
}

function App() {
  const switchToLogin = () => {
    const loginTab = document.getElementsByClassName("login-tab")[0];
    openTab({ currentTarget: loginTab }, "login-tab-content");

  };

  return (
    <div className="signlogin">
      <h1 className="apph1">Welcome to ExploreEpic</h1>
      <div className="form-wrap">
        <div className="tabs">
          <h3 className="signup-tab">
            <a className="tablink active" onClick={(e) => openTab(e, "signup-tab-content")}>
              Sign Up
            </a>
          </h3>
          <h3 className="login-tab">
            <a className="tablink" onClick={(e) => openTab(e, "login-tab-content")}>
              Login
            </a>
          </h3>
        </div>

        <div className="tabs-content">
          <Signup switchToLogin={switchToLogin} />
          <Login />
        </div>
      </div>
    </div>
  );
}

export default App;
