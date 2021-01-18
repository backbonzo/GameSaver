/* eslint-disable import/no-anonymous-default-export */
import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../Services/AuthService';

// gives Auth Context Object that gives us provider and consumer
export const AuthContext = createContext();

// export props but destrucutre/decon children from props
// the components that we want to wrap provider around
export default ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // init to false
  const [isLoaded, setIsLoaded] = useState(false);

  // use like componentDIdMount state
  useEffect(() => {
    AuthService.isAuthenticated().then(data => {
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
      });
  },[]);

  return (
    <div>
      {!isLoaded ? <h1>Loading</h1> :
      <AuthContext.Provider value={ { user, setUser, isAuthenticated, setIsAuthenticated } }>
        { children }  
      </AuthContext.Provider>}
    </div>
  )
}