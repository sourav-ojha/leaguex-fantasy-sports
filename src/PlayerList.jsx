import React from "react";
import { Cell } from "./Page2";
import { usePlayerContext } from "./playerContext";

const PlayerList = ({ role, label }) => {
  const { list } = usePlayerContext();
  const players = list.filter((player) => player.role === role);

  return (
    <div style={{ flex: 1 }}>
      <h2>{role}</h2>
      <h4>{label}</h4>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Team</th>
            <th>Credit</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <PlayerBlock player={player} key={player.player_id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerList;

const PlayerBlock = ({ player }) => {
  const { handlePlayerSelect, isSelected } = usePlayerContext();

  const handleClick = () => {
    handlePlayerSelect(player);
  };

  return (
    <tr
      style={{
        border: "1px solid #ccc",
        backgroundColor: isSelected(player.player_id) ? "#ccc" : "#fff",
      }}
      onClick={handleClick}
    >
      <Cell value={player.name} />
      <Cell value={player.team_short_name} />
      <Cell value={player.event_player_credit} />
    </tr>
  );
};

//
