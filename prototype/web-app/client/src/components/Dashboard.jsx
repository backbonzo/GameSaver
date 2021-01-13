import React from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import GreenIcon from "../icons/green.png";
import OrangeIcon from "../icons/orange.png";
import RedIcon from "../icons/red.png";

const Dashboard = (props) => {

  const min = 1;
  const max = 3;


  async function getAddress(at) {

   const temp =  await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/"+props.deviceEntries[at].longitude+","+props.deviceEntries[at].latitude+".json?types=poi&access_token="+process.env.REACT_APP_MAPBOX_TOKEN+"");

  const data = await temp.json();


  if(data.features[0])
      props.deviceEntries[at].address = data.features[0].place_name;
  else
    props.deviceEntries[at].address = undefined;

  }

  

  // simulate ai that assigns garbage fullness
  for(let i = 0; i< props.deviceEntries.length; i++ ){
    

    let rand = Math.round(min + Math.random() * (max - min));

    if(rand === 1){
      props.deviceEntries[i].status = GreenIcon;
    } else if (rand === 2){
      props.deviceEntries[i].status = OrangeIcon;
    } else{
      props.deviceEntries[i].status = RedIcon;
    }

    // fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/"+props.deviceEntries[i].longitude+","+props.deviceEntries[i].latitude+".json?types=poi&access_token="+process.env.REACT_APP_MAPBOX_TOKEN+"") .then(res => res.json())
    // .then(data => {
    //   if (data.features[0]) {
    //     props.deviceEntries[i].address = data.features[0].place_name;
    //   } else
    //     props.deviceEntries[i].address = "Not Found";
      
    // });

    getAddress(i);

  }

  
  //console.log(props.deviceEntries);

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
                props.deviceEntries.map((entry) => {
                  return(
                  <tr key={entry._id} >
                  <td>{entry._id}</td>
                  <td>{entry.title}</td>
                  <td>{entry.description}</td>
                  <td>{entry.address ? entry.address:`${entry.latitude},${entry.longitude}`}</td>
                  <td><img alt="status" width="25px" height="25px"  src={entry.status} ></img></td>
                  <td>
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
