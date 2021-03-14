import React from "react";
import CompetitionsTwenty from "./CompetitionsTwenty";
import IntroTwenty from "./IntroTwenty";
import ScoreBoardTwenty from "./ScoreboardTwenty";

const TwentyTwenty = () => (
  <div style={{marginTop: "100px"}}>
    <div style={{ paddingTop: "10px" }}>
      <IntroTwenty />
    </div>

    <div style={{ paddingTop: "40px" }}>
      <ScoreBoardTwenty />
    </div>

    <div style={{ paddingTop: "40px" }}>
      <CompetitionsTwenty />
    </div>

  </div>
);

export default TwentyTwenty;