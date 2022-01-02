import {ManaPool, ManaType} from "../types/mana-dice";
import {Skill} from "../types/game";

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

// ["blue", "red", "green"] => blue, red, and green
export function commaAndJoin (pieces: string[]) : string {
	if (pieces.length <= 2) {
		return pieces.join(' and ')
	}

	let last = pieces.pop()

	return pieces.join(', ') + ', and ' + last
}

export function titleCase (str: string) : string {
	return str.toUpperCase().substr(0, 1) + str.toLowerCase().substr(1)
}
