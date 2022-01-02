import Healthbar from "./healthbar";
import React, {useContext} from "react";
import {GameContext} from "../context/gameContext";

export default function PlayerHealthBar () {
	const {state} = useContext(GameContext)
	const {player} = state
	return <Healthbar current={player.currentHP} max={player.maxHP} shield={player.shield} />
}
