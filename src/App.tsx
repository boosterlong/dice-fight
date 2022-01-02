import React from 'react';
import './App.css';
import Dicebox from './components/dicebox';
import Enemy from './components/enemy';
import Healthbar from './components/healthbar';
import Log from './components/log';
import GameContext from "./context/gameContext";
import SpellList from "./components/spelllist";
import EnemyList from "./components/EnemyList";

<style>
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
</style>

function App() {

  return (
  <GameContext>
    <div className="main-container crt">
      <EnemyList />
      <div className="log-field">
        <Log />
      </div>
      <div className="player-field">
        <Healthbar current={50} max={200} />
        <Dicebox />
        <SpellList />
      </div>
    </div>
  </GameContext>
  );
}

export default App;
