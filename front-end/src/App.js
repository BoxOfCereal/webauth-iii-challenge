import React, { Component } from "react";
import { Route, NavLink, withRouter } from "react-router-dom";
import Login from "./Login/Login";
import Users from "./Users/Users";
import Register from "./Register/Register";

import "./App.css";
require("dotenv").config();

class App extends Component {
  logout = () => {
    //Remove the Jason Webb token from local storage
    localStorage.removeItem("jwt");
    //<Redirect to="/login" />
    this.props.history.push("/login");
  };

  render() {
    return (
      <>
        <header>
          <nav>
            <NavLink to="/register">Register</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/login"> Login</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/users"> Users</NavLink>
            &nbsp;|&nbsp;
            <button onClick={this.logout}>Logout</button>
          </nav>
        </header>
        <main>
          <Route path="/login" component={Login} />
          <Route path="/users" component={Users} />
          <Route path="/register" component={Register} />
        </main>
      </>
    );
  }
}

export default withRouter(App);
