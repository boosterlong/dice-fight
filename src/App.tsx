import React from 'react';
import './App.css';
import Dicebox from './components/dicebox';
import Enemy from './components/enemy';
import Healthbar from './components/healthbar';
import Log from './components/log';
import Spellcard from './components/spellcard';
<<<<<<< HEAD
<style>
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
</style> 

=======
import GameContext from "./context/gameContext";
>>>>>>> Added a basic game context

function App() {

  return (
<<<<<<< HEAD
    <div className="main-container crt">
        <div className="enemy-field">
            <Enemy />
            <Enemy />
            <Enemy />
            <Enemy />
        </div>
        <div className="log-field">
            <Log />
        </div>
        <div className="player-field">
            <Healthbar />
            <Dicebox />
            <Spellcard />
            <Spellcard />
            <Spellcard />
            <Spellcard />
         </div>
=======
  <GameContext>
    <div className="main-container">
      <div className="enemy-field">
        <Enemy />
        <Enemy />
        <Enemy />
        <Enemy />
      </div>
      <div className="log-field">
        <Log />
      </div>
      <div className="player-field">
        <Healthbar />
        <Dicebox />
        <Spellcard />
        <Spellcard />
        <Spellcard />
        <Spellcard />
      </div>
>>>>>>> Added a basic game context
    </div>
  </GameContext>
  );
}

export default App;
