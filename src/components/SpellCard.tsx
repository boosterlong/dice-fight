import {SpellInstance} from "../types/game";
import {SkillLibrary} from "../game/skills/skills";
import {useContext} from "react";
import {GameContext} from "../context/gameContext";
import {ManaType} from "../types/mana-dice";
import {hasMana} from "../lib/spells";

type SpellCardProps = {
	spell: SpellInstance
	idx: number
}

type SpendableMana = {
	type: ManaType
	spendable: boolean
}

export default function SpellCard({spell, idx} : SpellCardProps) {
	const {actions, state} = useContext(GameContext)
	const spellType = SkillLibrary[spell.key]

	async function onClick () {
		actions.useSkill(idx)
	}

	const manaIcons : SpendableMana[] = []
	const spendableMana = {
		...state.mana
	}

	for (let key in spellType.manaCost) {
		const kType = key as ManaType
		const num = spellType.manaCost[kType] || 0
		for (let i = 1; i <= num; i++) {
			manaIcons.push({
				type: kType,
				spendable: spendableMana[kType] > 0,
			})
			spendableMana[kType]--
		}
	}
	manaIcons.sort((a, b) => {
		if (a.type === b.type) {
			return a.spendable ? 1 : -1
		}
		return 0
	})

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
					{manaIcons.map((x, i) => {
						return <span key={i} className={"mana-cost-icon mana-" + x.type + ' ' + (x.spendable ? 'spendable' : 'unspendable')} />
					})}
				</div>
			</div>
			<div className={"description"}>{spellType.description}</div>
		</div>
	)
}
