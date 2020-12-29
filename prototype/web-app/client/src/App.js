import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL , { Marker, Popup } from 'react-map-gl';

import { listDeviceEntries } from './API';

const App = () => {
  // State variable deviceEntries starts of as an empty array
  const [deviceEntries, setDeviceEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 59.275160574709794,
    longitude: 15.205714623985314,
    zoom: 3
  });
  //TEST
  const [deviceDate, setDeviceDate] = useState([]);

  // Empty dependenciy array
  // we only want this func to run once when it gets mounted
  useEffect(() => {
    // ASYNC IFFY since whole function depends on async func
    (async () =>  {
      const deviceEntries = await listDeviceEntries();
      setDeviceEntries(deviceEntries);
      console.log(deviceEntries);
      
      //TEST Loop through the array from API and map every _id.
      const result = deviceEntries.map(person => ({id: person._id}));
      console.log(result);
      setDeviceDate(result);
    })();
  }, []); // Normaly in the array we put the dependent props/states that rerun the func but now we only want it to run once

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
          <>
            <Marker
              key={entry._id}
              latitude={entry.latitude}
              longitude={entry.longitude}
              title={entry.title}
            >
              <div
                onClick={() => setShowPopup({
                  // ...showPopup,
                  [entry._id]: true
                })}
              >
                <img 
                  className="marker"
                  style={{
                    height: 6 * `${viewport.zoom}`,
                    width: 6 * `${viewport.zoom}`,
                  }}
                  src="https://i.imgur.com/y0G5YTX.png"
                  alt="Map Marker"
                />
              </div>
            </Marker>
            {
              showPopup[entry._id] ? (
                <Popup
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  dynamicPosition={true}
                  onClose={() => setShowPopup({})}
                  anchor="top">
                  <div className="popup">
                    <h3 style={{textAlign: "center"}}>{entry.title}</h3>
                    <p style={{ textAlign: "center" }}>{entry.description}</p>
                    <small style={{ textAlign: "center" }}>"Date WILL be here soon"</small> {/* new Date(entry.something).toLocaleDateString */}
                  </div>
                </Popup>
              ) : null
            }
          </>
        ))
      }
    </ReactMapGL>
  );
}

export default App;