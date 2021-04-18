import React from "react";

import './Intro.css';
const Intro = () => {

  return (
    <div className="container">
      <iframe className="responsive-iframe" title="intro" width="893" height="502" src="https://player.vimeo.com/video/534384659" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen"
        mozallowfullscreen="mozallowfullscreen" 
        msallowfullscreen="msallowfullscreen" 
        oallowfullscreen="oallowfullscreen" 
        webkitallowfullscreen="webkitallowfullscreen"></iframe>
    </div>
  );
};

export default Intro;
