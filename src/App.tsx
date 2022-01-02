import React from 'react';
import './App.css';
import Healthbar from './components/healthbar';
import Log from './components/log';
import GameContext from "./context/gameContext";
import SpellList from "./components/SpellList";
import EnemyList from "./components/EnemyList";
import ManaDiceBox from "./components/ManaDiceBox";
import EndTurnButton from "./components/EndTurnButton";

<style>
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
</style>

function App() {

  return (
  <GameContext>
    <div className="main-container">
      <EnemyList />
      <div className="log-field">
        <Log />
      </div>
      <div className="player-field">
        <Healthbar current={50} max={200} />
        <ManaDiceBox />
        <SpellList />
        <EndTurnButton />
      </div>
    </div>
  </GameContext>
  );
}

export default App;
