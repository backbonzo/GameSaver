import React, { useState, useContext } from "react";

import AuthService from '../Services/AuthService';
//import Message from '../components/Message';
import { AuthContext } from '../Context/AuthContext';

const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null); // signify NOT to render message modal
  const authContext = useContext(AuthContext);

  const onChange = e => {
    e.preventDefault();
    setUser({...user,[e.target.name]: e.target.value});
    console.log(user);
  }

  const onSubmit = () => {
    console .log("test");
  }

  return (
  <div>
    <h1>
      Login Page
    </h1>
    <form onSubmit={onSubmit}>
      <h3>Please Sign In</h3>
      <label htmlFor="username" className="sr-only">Username: </label>
      <input type="text" 
        name="username" 
        onChange={onChange} 
        className="form-control" 
        placeholder="Enter Username"/>

      <label htmlFor="password" className="sr-only">Password: </label>
      <input type="password"
        name="password"
        onChange={onChange}
        className="form-control"
        placeholder="Enter Password" />

      <button className="btn btn-lg btn-primary btn-block" 
      type="submit" >Log In</button>
    </form>
    { /*message ? <Message message={message}/> : null */}
  </div>
  );
}

export default Login;
