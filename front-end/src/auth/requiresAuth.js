import React from "react";
import axios from "axios";

const endpoint = `${process.env.REACT_APP_API_URL}/api`;
axios.defaults.baseURL = endpoint;

axios.interceptors.request.use(
  function(options) {
    options.headers.authorization = localStorage.getItem("jwt");
    return options;
  },
  function(err) {
    return Promise.reject(err);
  }
);

//higher order comp
export default function(Component) {
  return props => {
    const token = localStorage.getItem("jwt");
    const notLoggedIn = <div>Please Login To See Crap</div>;
    return <>{token ? <Component {...props} /> : notLoggedIn}</>;
  };
}
