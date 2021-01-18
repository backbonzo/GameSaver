import * as React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// costume components
import ProtectedRoute from "./components/ProtectedRoute";
import Nav from "./components/Nav";
import Map from "./components/Map";
import Dashboard from "./components/Dashboard";
import Account from "./components/Account";
import LogOut from "./components/LogOut";
import PageNotFound from "./components/PageNotFound";
import { Map as MapIcon, Account as AccountIcon, Exit, Dash} from "./components/Icons";


import { listDeviceEntries } from './API';
import Logout from './components/LogOut';

const App = () => {

  // list of pages to render in navbar
  const pageList = [{
                  page: 1,
                  icon: MapIcon,
                  PagePath: "/",
                  PageName: "Map"
                    },
                  {
                  page: 2,
                  icon: Dash,
                  PagePath: "/dashboard",
                  PageName: "Dashboard"
                      },
                  {
                  page: 3,
                  icon: AccountIcon,
                  PagePath: "/account",
                  PageName: "Account"
                      },
                  {
                  page: 4,
                  icon: Exit,
                  PagePath: "/logout",
                  PageName: "Logout"
                      }                    
                  ];

  // State variable deviceEntries starts of as an empty array
  const [deviceEntries, setDeviceEntries] = useState([]);
  const [auth, setAuth] = useState(false);


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
        {auth && <Nav pageList={pageList} />}
        <div style={{marginLeft: "64px"}}>
          <Switch>
            <ProtectedRoute auth={auth} path="/login" exact render={() => 
              <Logout />
            } />
            <ProtectedRoute auth={auth} path="/" exact render={() => 
              <Map deviceEntries={deviceEntries} getDevices={getDevices} />
            } />

            <ProtectedRoute auth={auth} path="/dashboard" exact render={() => 
              <Dashboard deviceEntries={deviceEntries} />
            } />

            <ProtectedRoute auth={auth} path="/account" exact render={() => 
              <Account />
            } />

            <ProtectedRoute auth={auth} path="/logout" exact render={() => 
              <Logout />
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
