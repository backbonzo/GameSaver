import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL , { Marker, Popup } from 'react-map-gl';

import { listDeviceEntries } from './API';
import { DeviceForm } from './DeviceForm';

const App = () => {
  // State variable deviceEntries starts of as an empty array
  const [deviceEntries, setDeviceEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addMarkerLocation, setAddMarkerLocation] = useState(null);
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
      
      // Loop through the array from API and convert ever first 4 bytes
      // Of _id to string and then parse that into a date
      for (let i = 0; i < deviceEntries.length; i++) {
        let obj = deviceEntries[i];
        //console.log("This is number " + i);
        //console.log(obj._id);
        let timestamp = obj._id.toString().substring(0, 8);
        let date = new Date(parseInt(timestamp, 16) * 1000); 
        deviceEntries[i].newDate = date;
        //console.log(deviceEntries[i]);
      }
    })();
  }, []); // Normaly in the array we put the dependent props/states that rerun the func but now we only want it to run once

  const showAddMarkerPopup = (event) => {
    const [ longitude, latitude  ] = event.lngLat; //destructure latitude, longitude from event.lngLat
    setAddMarkerLocation({
      longitude,
      latitude,
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/lemorz56/ckj9rw6ac8gh219nj2znvsp8l"
      // "mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
    >
      {
        deviceEntries.map(entry => (
          <>
            <Marker
              key={entry._id}
              latitude={entry.latitude}
              longitude={entry.longitude}
              title={entry.title}
              ddate={entry.newDate}
            >
              <div
                onClick={() => setShowPopup({
                  // ...showPopup,
                  [entry._id]: true
                })}
              >
                <svg 
                  className="marker yellow"
                  style={{
                    height: 6 * `${viewport.zoom}`,
                    width: 6 * `${viewport.zoom}`,
                  }}
                version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512">
                <g>
                  <g>
                    <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                      c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                      c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                  </g>
                </g>
                </svg>
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
              <small style={{ textAlign: "center" }}>Last update at: {new Date(entry.newDate).toLocaleDateString()}</small> {/* new Date(entry.something).toLocaleDateString */}
                  </div>
                </Popup>
              ) : null
            }
          </>
        ))
      }
      {
        // IF addMarkerLocation is a thing then show popup otherwise show nothing
        addMarkerLocation ? (
          <>
            <Marker
              latitude={addMarkerLocation.latitude}
              longitude={addMarkerLocation.longitude}
              title={addMarkerLocation.title}
            >
              <div>
                <svg 
                  className="marker red"
                  style={{
                    height: 6 * `${viewport.zoom}`,
                    width: 6 * `${viewport.zoom}`,
                  }}
                version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512">
                <g>
                  <g>
                    <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                      c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                      c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                  </g>
                </g>
                </svg>
              </div>
            </Marker>
            <Popup
              latitude={addMarkerLocation.latitude}
              longitude={addMarkerLocation.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setAddMarkerLocation(null)}
              anchor="top">
              <div className="popup">
                <DeviceForm />
              </div>
            </Popup>
          </>
        ) : null
      }
    </ReactMapGL>
  );
}

export default App;