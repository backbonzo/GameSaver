import * as React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

// costume components
import Nav from "./components/Nav";
import Map from "./components/Map";
import Dashboard from "./components/Dashboard";
import Account from "./components/Account";
import LogOut from "./components/LogOut";
import PageNotFound from "./components/PageNotFound";

import { listDeviceEntries } from './API';

const App = () => {
  // State variable deviceEntries starts of as an empty array
  const [deviceEntries, setDeviceEntries] = useState([]);


  const getDevices = async () => {
    const deviceEntries = await listDeviceEntries();
    setDeviceEntries(deviceEntries);
    // Loop through the array from API and convert ever first 4 bytes
    // Of _id to string and then parse that into a date
    //console.log(deviceEntries);
    for (let i = 0; i < deviceEntries.length; i++) {
      let obj = deviceEntries[i];
      let timestamp;
      let date;
      if (obj.image_id !== undefined) {
        timestamp = obj.image_id.toString().substring(0, 8);
        date = new Date(parseInt(timestamp, 16) * 1000);
      }
      else {
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

  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route path="/" exact render={() =>
            <Map deviceEntries={deviceEntries} getDevices={getDevices} />
          } />

          <Route path="/dashboard" exact render={() =>
            <Dashboard />
          } />

          <Route path="/account" exact render={() =>
            <Account />
          } />

          <Route path="/" render={() =>
            <PageNotFound />
          } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
