import React, { useEffect, useState } from "react";
import {
  CREDIT,
  FETCH_URL,
  MAX_PLAYERS,
  MAX_PLAYERS_FOR,
  MAX_PLAYERS_PER_TEAM,
  MIN_PLAYERS_FOR,
} from "./constants";
const playerContext = React.createContext(null);
// import list from "./list.json";

const PlayerContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [listOfPlayers, setListOfPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const [stats, setStats] = useState({
    players: 0,
    credits: CREDIT,
    team1: 0,
    team2: 0,
  });
  const [playerCount, setPlayerCount] = useState({
    Batsman: 0,
    Bowler: 0,
    "All-Rounder": 0,
    "Wicket-Keeper": 0,
  });

  const fetchPlayers = async () => {
    setLoading(true);
    let response = await fetch(FETCH_URL);
    let data = await response.json();
    setListOfPlayers(data);
    setLoading(false);
  };

  const validateCredit = (player) => {
    return stats.credits - player.event_player_credit >= 0;
  };

  const validateTeam = (player) => {
    if (player.team_short_name === "MS") {
      return stats.team1 < MAX_PLAYERS_PER_TEAM;
    } else {
      return stats.team2 < MAX_PLAYERS_PER_TEAM;
    }
  };

  const validatePlayerCount = () => {
    return stats.players < MAX_PLAYERS;
  };

  const validatePlayerCountByRole = (role, type) => {
    if (type === "max") return playerCount[role] < MAX_PLAYERS_FOR[role];
    if (type === "min") return playerCount[role] >= MIN_PLAYERS_FOR[role];
  };

  const handlePlayerSelect = (player) => {
    const { player_id, event_player_credit, role } = player;
    const { players, credits, team1, team2 } = stats;

    if (selectedPlayers.includes(player_id)) {
      setSelectedPlayers(selectedPlayers.filter((id) => id !== player_id));
      setStats({
        players: players - 1,
        credits: credits + parseFloat(event_player_credit),
        team1: team1 - (player.team_short_name === "MS" ? 1 : 0),
        team2: team2 - (player.team_short_name === "PS" ? 1 : 0),
      });
      setPlayerCount({
        ...playerCount,
        [role]: playerCount[player.role] - 1,
      });
    } else {
      if (!validatePlayerCount())
        return alert("You can't select more than 11 players");
      if (!validateTeam(player))
        return alert("You can't select more than 7 players from a single team");
      if (!validateCredit(player))
        return alert("You don't have enough credits");
      if (!validatePlayerCountByRole(player.role, "max"))
        return alert(
          `You can can't select more than ${MAX_PLAYERS_FOR[role]} ${role}s`
        );

      setSelectedPlayers([...selectedPlayers, player_id]);
      setStats({
        players: players + 1,
        credits: credits - parseFloat(event_player_credit),
        team1: team1 + (player.team_short_name === "MS" ? 1 : 0),
        team2: team2 + (player.team_short_name === "PS" ? 1 : 0),
      });
      setPlayerCount({
        ...playerCount,
        [player.role]: playerCount[player.role] + 1,
      });
    }
  };

  const handleProceed = () => {
    let msg = [];
    if (!validatePlayerCountByRole("Batsman", "min"))
      return alert(`You must select min ${MIN_PLAYERS_FOR.Batsman} Batsman`);
    if (!validatePlayerCountByRole("Bowler", "min"))
      return alert(`You must select min ${MIN_PLAYERS_FOR.Bowler} Bowler`);
    if (!validatePlayerCountByRole("All-Rounder", "min"))
      return alert(
        `You must select min ${MIN_PLAYERS_FOR["All-Rounder"]} All Rounder`
      );
    if (!validatePlayerCountByRole("Wicket-Keeper", "min"))
      return alert(
        `You must select min ${MIN_PLAYERS_FOR["Wicket-Keeper"]} Wicket Keeper`
      );
    setPage(2);
  };

  const isSelected = (player_id) => {
    return selectedPlayers.includes(player_id);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const value = {
    selectedPlayers,
    page,
    list: listOfPlayers,
    stats,
    handlePlayerSelect,
    isSelected,
    handleProceed,
  };

  return (
    <playerContext.Provider value={value}>
      {loading || !listOfPlayers ? (
        <div className="loading">
          <h2>Fetching player list . . .</h2>
        </div>
      ) : (
        children
      )}
    </playerContext.Provider>
  );
};

const usePlayerContext = () => {
  const context = React.useContext(playerContext);
  if (context === undefined) {
    throw new Error(
      "usePlayerContext must be used within a PlayerContextProvider"
    );
  }
  return context;
};

export { PlayerContextProvider, usePlayerContext };
