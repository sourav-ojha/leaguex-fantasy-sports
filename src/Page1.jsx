import React from "react";
import { usePlayerContext } from "./playerContext";
import PlayerList from "./PlayerList";

const StatsBox = ({ label, value }) => {
  return (
    <div className="statsBox">
      <div>{value}</div>
      <div>{label}</div>
    </div>
  );
};

const Page1 = () => {
  const { stats, handleProceed } = usePlayerContext();
  return (
    <>
      {/* stats board */}
      <div className="header">
        <div className="flex-1"></div>
        <h1 className="flex-1">Pick Player</h1>
        <div className="statsBlock">
          <StatsBox label="Players" value={stats.players} />
          <StatsBox label="MS" value={stats.team1} />
          <StatsBox label="PS" value={stats.team2} />
          <StatsBox label="Cr Left" value={stats.credits} />
        </div>
      </div>

      <div className="playerListBlock">
        <PlayerList role="Batsman" label="min-3 , max-7" />
        <PlayerList role="Bowler" label="min-3 , max-7" />
        <PlayerList role="All-Rounder" label="min-0 , max-4" />
        <PlayerList role="Wicket-Keeper" label="min-1 , max-5" />
      </div>
      <div>
        <button type="submit" className="proceed-btn" onClick={handleProceed}>
          Proceed
        </button>
      </div>
    </>
  );
};

export default Page1;
