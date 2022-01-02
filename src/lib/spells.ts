import {ManaPool, ManaType} from "../types/mana-dice";
import {Spell} from "../types/game";
import {deductMana} from "./helpers";

export function hasMana (mana: ManaPool, st: Spell) : boolean {
	for (let k in st.manaCost) {
		const mType = k as ManaType
		const cost = st.manaCost[mType] || 0
		if (mana[mType] < cost) {
			return false
		}
	}
	return true
}

export function deductSpellMana (mana: ManaPool, st: Spell) {
	deductMana(mana, st.manaCost)
}
