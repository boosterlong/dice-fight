import {SpellInstance} from "../types/game";
import {SpellLibrary} from "../game/spells/spells";
import {useContext} from "react";
import {GameContext} from "../context/gameContext";
import {ManaType} from "../types/mana-dice";
import {hasMana} from "../lib/spells";

type SpellCardProps = {
	spell: SpellInstance
	idx: number
}
export default function Spellcard({spell, idx} : SpellCardProps) {
	const {actions, state} = useContext(GameContext)
	const spellType = SpellLibrary[spell.key]

	async function onClick () {
		actions.castSpell(idx)
	}

	const manaIcons : ManaType[] = []
	for (let key in spellType.manaCost) {
		const kType = key as ManaType
		const num = spellType.manaCost[kType] || 0
		for (let i = 1; i <= num; i++) {
			manaIcons.push(kType)
		}
	}

	const classes = ['spell-card', 'spell-' + spell.key]
	if (spell.cooldown) {
		classes.push('cooling-down')
	}
	if (spell.casting) {
		classes.push('casting')
	}
	if (hasMana(state.mana, spellType)) {
		classes.push('has-mana')
	}

	return (
		<div className={classes.join(' ')} onClick={onClick}>
			<div className={"spell-header"}>
				<h6>{spellType.name}</h6>
				<div className={"spell-cost"}>
					{manaIcons.map((x, i) => <span key={i} className={"mana-cost-icon mana-" + x} />)}
				</div>
			</div>
			<div className={"cooldown"}>{spell.cooldown ? <>Cooldown: {spell.cooldown}</> : <>Ready!</>}</div>
			<div className={"description"}>{spellType.description}</div>
		</div>
	)
}
