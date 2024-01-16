import { useState } from "react";
import "./App.css";
import { Player, PlayerDraw, originalPlayers } from "./player";

function App() {
  const [currentPlayers, setCurrentPlayers] =
    useState<Player[]>(originalPlayers);
  const [teamA, setTeamA] = useState<Player[]>([]);
  const [teamB, setTeamB] = useState<Player[]>([]);
  const [error, setError] = useState("");

  function handleCurrentPlayers(event: React.ChangeEvent<HTMLInputElement>) {
    const checkBoxPlayerID = Number(event.target.value);

    let newCurrentPlayers: Player[] = currentPlayers;

    if (event.target.checked) {
      newCurrentPlayers.push(
        originalPlayers.find((player) => player.id === checkBoxPlayerID)!
      );
    } else {
      newCurrentPlayers = currentPlayers.filter((player) => {
        return player.id !== checkBoxPlayerID;
      });
    }

    resetTeams();
    setError("");
    setCurrentPlayers(newCurrentPlayers);
  }

  function handlePlayerDraw() {
    const playerDraw = new PlayerDraw(currentPlayers);

    try {
      playerDraw.drawTeams();
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }

    setTeamA(playerDraw.getTeamA());
    setTeamB(playerDraw.getTeamB());
  }

  function resetTeams() {
    setTeamA([]);
    setTeamB([]);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {error ? <h4 style={{ color: "red" }}>{error}</h4> : ""}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2>Escolha os jogadores presentes:</h2>
        <ul
          style={{
            textAlign: "left",
            listStyle: "none",
            marginTop: "-0.5rem",
          }}
        >
          {originalPlayers.map((player) => {
            return (
              <li key={player.name}>
                <input
                  type="checkbox"
                  defaultChecked
                  value={player.id}
                  onChange={handleCurrentPlayers}
                />
                {` ${player.name} - ${player.position}`}
              </li>
            );
          })}
        </ul>
      </div>
      <div style={{ display: "flex", marginTop: "-2rem" }}>
        <ul style={{ flex: 1 }}>
          <h3>Time A</h3>
          {teamA.map((player) => {
            return <li key={player.name}>{`${player.name}`}</li>;
          })}
        </ul>

        <ul style={{ flex: 1 }}>
          <h3>Time B</h3>
          {teamB.map((player) => {
            return <li key={player.name}>{`${player.name}`}</li>;
          })}
        </ul>
      </div>
      <button onClick={handlePlayerDraw}>Sortear os jogadores!</button>
    </div>
  );
}

export default App;
