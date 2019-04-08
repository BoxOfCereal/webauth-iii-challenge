import React, { useReducer } from "react";
import axios from "axios";

const Register = props => {
  /**honestly this probably isn't the best time to use  useReducer,
   * however I wanted to try it out in some trivial way
   */
  const [state, dispatch] = useReducer(
    (previousState, action) => {
      switch (action.type) {
        case "SET_USERNAME":
          return { ...previousState, username: action.payload };
        case "SET_PASSWORD":
          return { ...previousState, password: action.payload };
        case "SET_DEPARTMENT":
          return { ...previousState, department: action.payload };
        case "SET_ERROR":
          return { ...previousState, error: action.payload };
        case "CLEAR_ERROR":
          return { ...previousState, error: action.payload };
        default:
          throw new Error("unexpected action type");
      }
    },
    { username: "", password: "", department: "", error: "" }
  );

  const submit = e => {
    console.log({ ...state });
    e.preventDefault();
    // set the endpoint
    const endpoint = "http://localhost:9000/api/auth/register";
    // use axios to post credentials
    axios
      .post(endpoint, { ...state })
      .then(res => {
        // set JSON web token inside local storage
        console.log(res);
        localStorage.setItem("jwt", res.data.token);
        //<Redirect to="/users" />
        props.history.push("/users");
      })
      .catch(error => {
        console.log("error", error.response);
        if (error.response.status === 422) {
          dispatch({ type: "SET_ERROR", payload: "Username Exists" });
        } else {
          dispatch({ type: "SET_ERROR", payload: error.response.statusText });
        }
      });
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
              value={state.username}
              onChange={e => {
                dispatch({ type: "SET_USERNAME", payload: e.target.value });
              }}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="text"
              value={state.password}
              onChange={e => {
                dispatch({ type: "SET_PASSWORD", payload: e.target.value });
              }}
            />
          </div>
          <div>
            <label htmlFor="department">department</label>
            <input
              name="department"
              id="department"
              type="text"
              value={state.department}
              onChange={e => {
                dispatch({ type: "SET_DEPARTMENT", payload: e.target.value });
              }}
            />
          </div>
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
      {state.error && <p>{state.error}</p>}
    </>
  );
};

export default Register;
