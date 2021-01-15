/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';

const Nav = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);
  let history = useHistory();

  const red = (params) => {
    setExpanded(false);
    history.push(params);
  }

  const onClickLogoutHandler = () => {
    AuthService.logout().then(data => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    })
  }

  const unauthenticatedNavBar = () => {
     return (
       <>
        <Link to="/">
           <li className="nav-item nav-link">Home</li>
        </Link>
         <Link to="/login">
           <li className="nav-item nav-link">Login</li>
         </Link>
         <Link to="/register">
           <li className="nav-item nav-link">Register</li>
         </Link>
         {
           user.role === "admin" ?
           <Link to="/register">
               <li className="nav-item nav-link">Admin</li>
           </Link> : null
         }
         <button type="button" className="btn btn-link nav-item nav-link" 
         onClick={ onClickLogoutHandler }>Logout</button>
       </>
     )
  }

  return (
    <div>
      <SideNav expanded={expanded} onToggle={() => setExpanded(!expanded)} style={{ background: "#90C8EA" }}
        onSelect={(selected) => {
          red(selected);
        }}
      >
        <SideNav.Toggle style={{
          background: "#39505D",
          width: "100%"
        }} />
        {/* BELOW IS THE NAVBAR MAPPING FUNCTION */}
        <SideNav.Nav defaultSelected="/">
          {!isAuthenticated ? unauthenticatedNavBar() : props.pageList.map((item) => {
            return (
              <NavItem key={item.page} eventKey={item.PagePath}>
                <NavIcon>
                  {item.icon()}
                </NavIcon>
                <NavText>
                  <b style={{ color: "black" }}>
                    {item.PageName}
                  </b>
                </NavText>
              </NavItem>);
              })
          }
        </SideNav.Nav>
      </SideNav>
    </div>)
}

export default Nav;
