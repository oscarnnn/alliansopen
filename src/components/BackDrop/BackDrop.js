import React from 'react';

import './BackDrop.css';

const backDrop = props => (
    <div className="backdrop" onClick={props.click}></div>
);

export default backDrop;