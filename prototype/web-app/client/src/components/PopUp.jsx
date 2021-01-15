import React, {useState} from "react";
import {Popup as Pop} from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';




const PopUp = (props) =>{

    

    return(
        <div>
            <Pop trigger={props.element} modal nested >
                <img style={{    width: "85vw",
                                height: "85vh",
                                maxHeight: "720px",
                                maxWidth: "1280px"
                                }} 
                alt="trash" src={props.imgSrc}>

                </img>
            </Pop>
        </div>);
}


export default PopUp;