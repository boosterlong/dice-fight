import {ManaPool, ManaType} from "../types/mana-dice";
import {Spell} from "../types/game";

export async function timeout (ms: number) {
	return new Promise((res) => {
		setTimeout(() => {
			res(null)
		}, ms)
	})
}

export function deductMana (mana: ManaPool, costs: Partial<ManaPool>) {
	for (let k in costs) {
		const mType = k as ManaType
		const cost = costs[mType] || 0
		mana[mType] -= cost
		mana[mType] = Math.max(0, mana[mType])
	}
}
