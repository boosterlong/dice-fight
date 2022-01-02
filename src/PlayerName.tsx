import {useContext} from "react";
import {GameContext} from "./context/gameContext";

export default function PlayerName () {
	const {state, actions} = useContext(GameContext)

	function click () {
		actions.refreshName()
	}

	return <>Player Name: {state.playerName} <button onClick={click}>Refresh</button></>
}
