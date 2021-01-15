import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Custom components
// import Nav from "./components/Nav";
import Nav from './components/NavbarTest';
import Map from "./components/Map";
import Dashboard from "./components/Dashboard";
import Account from "./components/Account";
import LogOut from "./components/LogOut";
import PageNotFound from "./components/PageNotFound";
import Home from "./components/Home";
import Login from './components/Login';
// other imports
import { Map as MapIcon, Account as AccountIcon, Exit, Dash } from "./components/Icons";
import { listDeviceEntries } from './API';
import Logout from './components/LogOut';

// auth
import AuthProvider from './Context/AuthContext';

const App = () => {
  // list of pages to render in navbar
  const pageList = [
    {
      page: 1,
      icon: Exit,
      PagePath: "/",
      PageName: "Home"
    },
    {
      page: 2,
      icon: MapIcon,
      PagePath: "/map",
      PageName: "Map"
    },
    {
      page: 3,
      icon: Dash,
      PagePath: "/dashboard",
      PageName: "Dashboard"
    },
    {
      page: 4,
      icon: AccountIcon,
      PagePath: "/account",
      PageName: "Account"
    },
    {
      page: 5,
      icon: Exit,
      PagePath: "/login",
      PageName: "Login"
    },
    {
      page: 6,
      icon: Exit,
      PagePath: "/logout",
      PageName: "Logout"
    }
  ];

  // State variable deviceEntries starts of as an empty array
  const [deviceEntries, setDeviceEntries] = useState([]);

  const getDevices = async () => {
    const deviceEntries = await listDeviceEntries();
    setDeviceEntries(deviceEntries);
    // Loop through the array from API and convert ever first 4 bytes
    // Of _id to string and then parse that into a date
    for (let i = 0; i < deviceEntries.length; i++) {
      let obj = deviceEntries[i];
      let timestamp;
      let date;
      if (obj.image_id !== undefined) {
        timestamp = obj.image_id.toString().substring(0, 8);
        date = new Date(parseInt(timestamp, 16) * 1000);
      } else {
        date = 0;
      }
      deviceEntries[i].newDate = date;
    }
  };

  // Empty dependenciy array
  // we only want this func to run once when it gets mounted
  useEffect(() => {
    let t0 = performance.now()
    getDevices();
    var t1 = performance.now()
    console.log("Call to getDevices took " + (t1 - t0) + " milliseconds.");
  }, []); // Normaly in the array we put the dependent props/states that rerun the func but now we only want it to run once

  return ( //TODO AUTH
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Nav pageList={pageList} />
        </AuthProvider>
        <div style={{ marginLeft: "64px" }}>
          <Switch>
            <Route path="/map" exact render={() =>
              <Map deviceEntries={deviceEntries} getDevices={getDevices} />
            } />

            <Route path="/dashboard" exact render={() =>
              <Dashboard />
            } />

            <Route path="/account" exact render={() =>
              <Account />
            } />

            <Route path="/logout" exact render={() =>
              <Logout />
            } />

            <Route path="/" exact render={() =>
              <Home />
            } />

            <Route path="/login" exact render={() =>
              <Login />
            } />

            <Route path="/" render={() =>
              <PageNotFound />
            } />

          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
