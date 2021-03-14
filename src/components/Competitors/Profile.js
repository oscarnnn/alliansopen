import React from "react";
import { Image } from "react-bootstrap";

import "./Profile.css"

const Profile = (props) => (
    <div className="profileContainer">
        <div className="roundedContainer">
            <img className="roundedImg" src={require("../../assets/Competitors/" + props.imgSrc + ".png")} />
        </div>
        <h2 className="profileName">{props.firstName + " " + props.lastName}</h2>
    </div>
);

export default Profile;
