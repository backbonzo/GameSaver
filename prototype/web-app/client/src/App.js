import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL , { Marker } from 'react-map-gl';

import { listDeviceEntries } from './API';

const App = () => {
  // State variable deviceEntries starts of as an empty array
  const [deviceEntries, setDeviceEntries] = useState([]);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 59.275160574709794,
    longitude: 15.205714623985314,
    zoom: 3
  });

  // Empty dependenciy array
  // we only want this func to run once when it gets mounted
  useEffect(() => {
    // ASYNC IFFY since whole function depends on async func
    (async () =>  {
      const deviceEntries = await listDeviceEntries();
      setDeviceEntries(deviceEntries);
      console.log(deviceEntries);
    })();
  }, []); // Normaly in array we put the dependent props/states that rerun the func but now we only want it to run once

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/lemorz56/ckj9rw6ac8gh219nj2znvsp8l"
      // "mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {
        deviceEntries.map(entry => (
          <Marker
            key={entry._id}
            latitude={entry.latitude}
            longitude={entry.longitude}
            offsetLeft={-12} 
            offsetTop={-24}
          >
            <div>
              {/* <svg 
                className="marker"
                style={{
                  width: '24px',//`calc(1vmin * ${viewport.zoom})`
                  height: '24px',
                }}
                viewBox="0 0 24 24"
                stroke-width="1.5"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
              </svg> */}
              <img className="marker" src="https://i.imgur.com/y0G5YTX.png" alt="Map Marker"></img>
            </div>
          </Marker>
        ))
      }
    </ReactMapGL>
  );
}

export default App;