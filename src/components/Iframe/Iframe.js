import React from "react";
import { ResponsiveEmbed } from "react-bootstrap";

import "./Iframe.css";

const Iframe = ({ source }) => {
  if (!source) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ResponsiveEmbed className="iframe">
        <embed type="image/svg+xml" src={source} />
      </ResponsiveEmbed>
    </div>
  );
};
export default Iframe;
