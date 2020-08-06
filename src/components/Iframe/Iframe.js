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
        <iframe width="893" height="502" src="https://www.youtube.com/embed/vq5evQkb_0w" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </ResponsiveEmbed>
    </div>
  );
};
export default Iframe;
