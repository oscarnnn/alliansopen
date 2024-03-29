import React from "react";

import './IntroTwenty.css';
const IntroTwenty = () => {

  return (
    <div className="container">
      <iframe className="responsive-iframe" title="intro" width="893" height="502" src="https://www.youtube.com/embed/vq5evQkb_0w" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen"
        mozallowfullscreen="mozallowfullscreen" 
        msallowfullscreen="msallowfullscreen" 
        oallowfullscreen="oallowfullscreen" 
        webkitallowfullscreen="webkitallowfullscreen"></iframe>
    </div>
  );
};

export default IntroTwenty;
