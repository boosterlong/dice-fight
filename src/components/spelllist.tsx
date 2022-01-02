import {useContext} from "react";
import {GameContext} from "../context/gameContext";
import Spellcard from "./spellcard";
import {SpellInstance} from "../types/game";

export default function SpellList () {
	const {state} = useContext(GameContext)

	const spells = state.spells

	return <div className={"spell-list"}>
		{spells.map((spell : SpellInstance, idx: number) => {
			return <Spellcard spell={spell} idx={idx} key={idx} />
		})}
	</div>
}
