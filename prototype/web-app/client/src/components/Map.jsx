import React, { useState } from "react";
import ReactMapGL from 'react-map-gl';
import MarkerPopUP from "./MarkerPopUP";
import AddMarkerPopUP from "./AddMarkerPopUp";

const Map = (props) => {
  const [addMarkerLocation, setAddMarkerLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 59.275160574709794,
    longitude: 15.205714623985314,
    zoom: 3
  });

  function showAddMarkerPopup(event) {
    const [longitude, latitude] = event.lngLat; //destructure latitude, longitude from event.lngLat
    setAddMarkerLocation({
      longitude,
      latitude,
    });
  }

  return (<div>
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/isa080199/ckjper8fi0d9z19rn74aaklc8"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
    >
      <MarkerPopUP deviceEntries={props.deviceEntries} viewport={viewport} />
      <AddMarkerPopUP viewport={viewport} addMarkerLocation={addMarkerLocation} setAddMarkerLocation={setAddMarkerLocation} getDevices={props.getDevices} />
    </ReactMapGL>
  </div>);
}

export default Map;
