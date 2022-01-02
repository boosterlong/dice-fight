import {useContext} from "react";
import {GameContext} from "../context/gameContext";
import ManaDice from "./ManaDice";
import ManaBars from "./ManaBars";

export default function ManaDiceBox () {
	const {actions, state} = useContext(GameContext)
	function clickRoll () {
		actions.rollManaDice()
	}

	function clickKeep () {
		actions.keepManaDice()
	}

	function clickEndTurn() {
		actions.endTurn()
	}

	return <div className={"dice-box"}>
		<ManaDice />
		<div className={"dice-box-buttons"}>
			<button className={"roll-dice"} onClick={clickRoll} disabled={state.phase !== 'rolling' && state.rerolls > 0}>Reroll ({state.rerolls})</button>
			<button className={"keep-dice"} onClick={clickKeep} disabled={state.phase !== 'rolling'}>Channel</button>
			<button className={"end-turn"} onClick={clickEndTurn} disabled={state.phase !== 'actions'}>End Turn</button>
		</div>
		<ManaBars />
	</div>
}
