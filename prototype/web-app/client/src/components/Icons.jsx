import React from "react";
import map from "../icons/map.svg";
import account from "../icons/account.svg";
import exit from "../icons/exit.svg";
import dash from "../icons/dash.svg";

function Map() {
  return <img width="25px" height="25px" alt="Map" src={map} ></img>;
}

function Account() {
  return <img width="25px" height="25px" alt="Account" src={account} ></img>;
}

function Exit() {
  return <img width="25px" height="25px" alt="Exit" src={exit} ></img>;
}

function Dash() {
  return <img width="25px" height="25px" alt="Dashboard" src={dash} ></img>;
}

function Home() {
  return <img width="25px" height="25px" alt="Exit" src={exit} ></img>;
}


export { Map, Account, Exit, Dash, Home };