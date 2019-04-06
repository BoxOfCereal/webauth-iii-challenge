import React, { Component } from "react";
import { Route, NavLink, withRouter } from "react-router-dom";
import Login from "./Login/Login";
import Users from "./Users/Users";

import "./App.css";

class App extends Component {
  logout = () => {
    localStorage.removeItem("jwt");
    this.props.history.push("/login");
  };

  render() {
    return (
      <>
        <header>
          <nav>
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
        </main>
      </>
    );
  }
}

export default withRouter(App);
