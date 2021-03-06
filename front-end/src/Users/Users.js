import React, { useState, useEffect } from "react";
import axios from "axios";

import requiresAuth from "../auth/requiresAuth";

const Users = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // get the token from local storage
      const token = localStorage.getItem("jwt");
      // setup options for the request
      const reqOptions = {
        headers: {
          authorization: token
        }
      };
      // make the call to the API
      const URL = process.env.REACT_APP_API_URL || `http://localhost:9000/api`;
      console.log(URL);
      const result = await axios.get(`${URL}/users`, reqOptions);
      // get the users from the result and then set the users
      console.log(result);
      setUserList(result.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <h2>List Of Users</h2>
      <ul>
        {userList.map(user => {
          return <li key={user.id}>{user.username}</li>;
        })}
      </ul>
    </>
  );
};

//wrap component with protected route
export default requiresAuth(Users);
