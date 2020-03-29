import React from 'react';

import ExtraScoreboard from './ExtraScoreboard';
import Scoreboard from './Scoreboard';

const leaderBoard = () => (
    <div>
        <Scoreboard />
        <ExtraScoreboard />
    </div>
);

export default leaderBoard;