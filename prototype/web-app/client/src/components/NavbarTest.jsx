/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
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
  };

  const onClickLogoutHandler = () => {
    AuthService.logout().then( data => {
      console.log(data);
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <Link to="/">
          <li className="nav-item nav-link">
            <i className="fas fa-home"></i>
          </li>
        </Link>

        <Link to="/map">
          <li className="nav-item nav-link">
            <i className="fas fa-globe-europe"></i>
          </li>
        </Link>

        <Link to="/dashboard">
          <li className="nav-item nav-link">
            <i className="fas fa-columns"></i>
          </li>
        </Link>

        <Link to="/account">
          <li className="nav-item nav-link">
            <i className="fas fa-user-circle"></i>
          </li>
        </Link>
        {
          user.role === "admin" ?
            <Link to="/admin">
              <li className="nav-item nav-link">
                <i className="fas fa-user-shield"></i>
              </li>
            </Link> : null
        }
        <button type="button"
          className="btn btn-link nav-item nav-link"
          onClick={onClickLogoutHandler}>Logout</button>
      </>
    )
  };

  const unauthenticatedNavBar = () => {
    return (
      <>
        <Link to="/">
          <li className="nav-item nav-link">
            <i className="fas fa-home"></i>
          </li>
        </Link>
        <Link to="/login">
          <li className="nav-item nav-link">
            <i className="fas fa-sign-in-alt"></i>
          </li>
        </Link>
        <Link to="/register">
          <li className="nav-item nav-link">
            <i className="fas fa-plus-square"></i>
          </li>
        </Link>
      </>
    )
  };

  return (
    <div>
      <SideNav
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        style={{ background: '#90C8EA' }}
        onSelect={(selected) => {
          red(selected);
        }}
      >
        <SideNav.Toggle style={{
          background: '#39505D',
          width: '100%',
        }}
        />
        {/* BELOW IS THE NAVBAR MAPPING FUNCTION */}
        <SideNav.Nav defaultSelected="/">
          {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar() }
        </SideNav.Nav>
      </SideNav>
    </div>
  );
};

export default Nav;

/*
props.pageList.map((item) => (
            <NavItem key={item.page} eventKey={item.PagePath}>
              <NavIcon>
                {item.icon()}
              </NavIcon>
              <NavText>
                <b style={{ color: 'black' }}>
                  {item.PageName}
                </b>
              </NavText>
            </NavItem>))
*/