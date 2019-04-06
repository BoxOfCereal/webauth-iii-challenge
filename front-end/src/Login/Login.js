import React, { useState } from "react";
import axios from "axios";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = e => {
    e.preventDefault();
    // set the endpoint
    const endpoint = "http://localhost:9000/api/auth/login";
    // use axios to post credentials
    axios
      .post(endpoint, { username, password })
      .then(res => {
        // set JSON web token inside local storage
        localStorage.setItem("jwt", res.data.token);
        //<Redirect to="/users" />
        props.history.push("/users");
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={submit}>
        {/* div>(label+input)*2 */}
        <div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              id="username"
              type="text"
              value={username}
              onChange={e => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="text"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
};

export default Login;
