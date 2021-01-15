import React, {useState, useEffect} from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import GreenIcon from "../icons/green.png";
import OrangeIcon from "../icons/orange.png";
import RedIcon from "../icons/red.png";

const Dashboard = (props) => {

  const min = 1;
  const max = 3;


  function goToGoogleMaps(lat, long){
    window.open("https://www.google.com/maps?q=" + lat + "," + long, "_blank");
  }

  const [dev, setDev] = useState([]);


  async function getAddress(at) {

  const temp =  await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/"+props.deviceEntries[at].longitude+","+props.deviceEntries[at].latitude+".json?types=poi&access_token="+process.env.REACT_APP_MAPBOX_TOKEN+"");

  const data = await temp.json();

  return data.features[0];

  }

  

 

  async function getExtraData(){

    let tempDev = props.deviceEntries;
     // simulate ai that assigns garbage fullness
     // and get location
  for(let i = 0; i< props.deviceEntries.length; i++ ){
    

    let rand = Math.round(min + Math.random() * (max - min));

    if(rand === 1){
      props.deviceEntries[i].status = GreenIcon;
    } else if (rand === 2){
      props.deviceEntries[i].status = OrangeIcon;
    } else{
      props.deviceEntries[i].status = RedIcon;
    }

    let data = await getAddress(i);

      if(data)
      tempDev[i].address = data.place_name;
      else
      tempDev[i].address = undefined;


   //console.log(data);
  }

  setDev(tempDev);
}


  useEffect(()=>{
    getExtraData();
  });



  const style = {
    width: window.innerWidth-64,
    height: window.innerHeight,
    backgroundColor: "#1b1c22"
  };


  return (
      <div style={style}>
        <Container>
          <Row className="text-center">
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Device_Id</th>
                  <th>Device Name</th>
                  <th>Description</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {
                dev.map((entry) => {
                  return(
                  <tr key={entry._id} >
                  <td style={{verticalAlign: "middle"}}>{entry._id}</td>
                  <td style={{verticalAlign: "middle"}}>{entry.title}</td>
                  <td style={{verticalAlign: "middle"}}>{entry.description}</td>
                  <td 
                    onClick={()=>{ goToGoogleMaps(entry.latitude, entry.longitude);}}
                    style={{textDecoration: "underline",cursor:'pointer', verticalAlign: "middle"}}
                  >
                      {!entry.address && "Address Not Found"}{!entry.address && <br />}{entry.address ? entry.address:(`${entry.latitude},${entry.longitude}`)}
                  </td>
                  <td style={{verticalAlign: "middle"}}><img alt="status" width="25px" height="25px"  src={entry.status} ></img></td>
                  <td style={{verticalAlign: "middle"}}>
                    <img alt="trash" width="100px" height="100px" src={ entry.image_id && process.env.REACT_APP_IMAGE_SRC + "/file/" + entry.image_id}>
                    </img>
                  </td>
                  </tr>
                  );
                })
                }
              </tbody>
            </Table>
          </Row>
        </Container>
      </div>);
}

export default Dashboard;
