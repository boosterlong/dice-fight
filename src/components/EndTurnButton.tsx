import {useContext} from "react";
import {GameContext} from "../context/gameContext";

export default function EndTurnButton () {
	const {actions, state} = useContext(GameContext)

	function endTurn() {
		actions.endTurn()
	}

	return <>
		<button onClick={endTurn} type={"button"}>End Turn</button>
		Current Phase: {state.phase}</>
}
