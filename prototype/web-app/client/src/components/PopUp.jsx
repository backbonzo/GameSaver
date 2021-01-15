import React from "react";
import {Popup as Pop} from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';




const PopUp = (props) =>{

    

    return(
        <div>
            <Pop trigger={props.element} modal nested >
                <img onClick={() => document.getElementById(props.element.props.id).click()} style={{    width: "85vw",
                                height: "85vh",
                                maxHeight: "720px",
                                maxWidth: "1280px",
                                cursor: "pointer"
                                }} 
                alt="trash" src={props.imgSrc}>

                </img>
            </Pop>
        </div>);
}


export default PopUp;