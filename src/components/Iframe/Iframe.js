import React from "react";
import { ResponsiveEmbed } from "react-bootstrap";

import "./Iframe.css";

const Iframe = ({ source }) => {
  if (!source) {
    return <div>Loading...</div>;
  }

  return (
    <div className="iframe">
      <h6 className="header">Sisjö GK</h6>
      <ResponsiveEmbed>
        <embed type="image/svg+xml" src={source} />
      </ResponsiveEmbed>
    </div>
  );
};
export default Iframe;
