import React, { useState, useContext } from 'react';
import AuthService from '../Services/AuthService';
import Message from '../components/Message';
import { AuthContext } from '../Context/AuthContext';

const Login = props => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [message, setMessage] = useState(null); // signify NOT to render message modal
  const authContext = useContext(AuthContext);

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    AuthService.login(user).then(data => {
      console.log(data);
      const { isAuthenticated, user, message } = data;
      // if auth then update the global context that user is auth
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push('/');
      } else {
        setMessage(message);
      }
    });
  };

  return (
    <div className="form-group">
      <h1>Login Page</h1>
      <form onSubmit={onSubmit}>
        <h3>Please sign in</h3>
        <label htmlFor="username" className="sr-only">Username: </label>
        <input type="text"
          name="username"
          onChange={onChange}
          className="form-control"
          placeholder="Enter Username" />
        <label htmlFor="password" className="sr-only">Password: </label>
        <input type="password"
          name="password"
          onChange={onChange}
          className="form-control"
          placeholder="Enter Password" />
        <button className="btn btn-lg btn-primary btn-block"
          type="submit">Log in </button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Login;

/* OLD FORM BELOW

 <form onSubmit={onSubmit}>
        <h3>Please Sign In</h3>
        <label htmlFor="username" className="sr-only">
          Username:
          <input
            type="text"
            name="username"
            onChange={onChange}
            className="form-control"
            placeholder="Enter Username"
          />
        </label>
        <label htmlFor="password" className="sr-only">
          Password:
          <input
            type="password"
            name="password"
            onChange={onChange}
            className="form-control"
            placeholder="Enter Password"
          />
        </label>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Log In
        </button>
      </form>
*/

// FRESH LOOKING FORM
/* 
<form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="InputUser">Username</label>
          <input
          type="text"
          onChange={onChange}
            className="form-control"
          id="InputUser"
          aria-describedby="emailHelp"
          placeholder="Enter username" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your details with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="InputPassword">Password</label>
            <input
            type="password"
            onChange={onChange}
            className="form-control"
             id="InputPassword"
             placeholder="Password" />
        </div>
        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="Check" />
          <label className="form-check-label" htmlFor="Check">Remember me</label>
        </div>
        <button type="submit" className="btn btn-primary">Log In</button>
      </form>
*/