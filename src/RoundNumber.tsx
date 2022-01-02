import {useContext} from "react";
import {GameContext} from "./context/gameContext";

export default function RoundNumber () {
	const {state, actions} = useContext(GameContext)

	function click () {
		actions.nextRound()
	}

	return <>Round {state.round} <button onClick={click}>Next Round</button></>
}
