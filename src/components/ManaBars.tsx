import {useContext} from "react";
import {GameContext} from "../context/gameContext";
import {ManaType} from "../types/mana-dice";

export default function ManaBars () {
	const {state} = useContext(GameContext)

	const manas : ManaType[] = ['cold', 'fire', 'lightning', 'chaos']

	return <div className={"mana-bars"}>
		{manas.map((key) => {
			return <div className={"mana-bar mana-" + key} key={key}>
				<div className={"label"}>{key}</div>
				<div className={"value"}>{state.mana[key]}</div>
			</div>
		})}
	</div>
}
