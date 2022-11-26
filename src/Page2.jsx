import React from "react";
import { usePlayerContext } from "./playerContext";
const Page2 = () => {
  const { selectedPlayers, list } = usePlayerContext();

  const players = list.filter((player) =>
    selectedPlayers.includes(player.player_id)
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Picked Players</h1>
      <table
        style={{
          width: "80%",
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
            <tr style={{ border: "1px solid #ccc" }}>
              <Cell value={player.name} />
              <Cell value={player.team_short_name} />
              <Cell value={player.event_player_credit} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page2;

export const Cell = ({ value, ...props }) => {
  return (
    <td
      style={{
        padding: "5px",
        textAlign: "center",
        border: "1px solid #ccc",
      }}
      {...props}
    >
      {value}
    </td>
  );
};
