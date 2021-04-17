import React from "react";

import "./Profile.css"

const Profile = (props) => (
    <div className="profileContainer">
        <div className="roundedContainer">
            <img className="roundedImg" src={require("../../assets/Competitors/" + props.imgSrc + ".png")} />
        </div>
        <div className="profileNameContainer">
            <h2 className="profileName">{props.firstName}</h2>
            <h2 className="nickName">"{props.nickName}"</h2>
            <h2 className="profileName">{props.lastName}</h2>
        </div>
    </div>
);

export default Profile;
