import {SpellInstance} from "../types/game";
import {SpellLibrary} from "../game/spells/spells";
import {useContext} from "react";
import {GameContext} from "../context/gameContext";

type SpellCardProps = {
	spell: SpellInstance
	idx: number
}
export default function Spellcard({spell, idx} : SpellCardProps) {
	const {actions} = useContext(GameContext)
	const spellType = SpellLibrary[spell.key]

	async function onClick () {
		actions.castSpell(idx)
	}

	return (
		<div className={"spell-card spell-" + (spell.key) + (spell.casting ? (' casting ') : '') + (spell.cooldown > 0 ? ' coolingdown ' : '')} onClick={onClick}>
			<h6>{spellType.name}</h6>
			<div className={"cooldown"}>{spell.cooldown ? <>Cooldown: {spell.cooldown}</> : <>Ready!</>}</div>
			<div className={"description"}>{spellType.description}</div>
		</div>
	)
}
