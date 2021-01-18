import React, {useState} from "react";
import { Marker, Popup } from 'react-map-gl';

const MarkerPopUP = (props) => {
    const [showPopup, setShowPopup] = useState({});
    return (
    <div>
      {
        props.deviceEntries.map(entry => (
          // We are mapping every entry from deviceEntries array
          // Into a fragment(with no parents) for each one (every marker is a created fragment)
          <React.Fragment key={entry._id}>
                <Marker
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
                        height: 6 * `${props.viewport.zoom}`,
                        width: 6 * `${props.viewport.zoom}`,
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

                <div>
                {
                  // IF showPopup(true) then show it, otherwise show null
                  showPopup[entry._id] ? (
                    <Popup
                    // This is the popup for the information once we click
                      latitude={entry.latitude}
                      longitude={entry.longitude}
                      image_src={entry.image}

                      closeButton={true}
                      closeOnClick={false}
                      dynamicPosition={true}
                      onClose={() => setShowPopup({})}
                      anchor="top">
                      <div className="popup">
                        <h3 style={{textAlign: "center"}}>{entry.title}</h3>
                        <p style={{ textAlign: "center" }}>{entry.description}</p>
                        {entry.image_id && <img src={`${process.env.REACT_APP_IMAGE_SRC}/file/${entry.image_id}`} alt="Not Found" />}
                        <small style={{ textAlign: "center", display: "block" }}>Last update at: {new Date(entry.newDate).toLocaleDateString()}</small>
                      </div>
                    </Popup>
                  ) : null
                }
                </div>
              </React.Fragment>
            ))
          }
    </div>
    );
}

export default MarkerPopUP;
