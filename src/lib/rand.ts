import {RollResult} from "../types/mana-dice";

export function rndElement<T>(items: T[]) : T {
	return items[Math.floor(Math.random()*items.length)];
}

export function rndInt (min: number, max: number) : number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function rndDice (dice: number, sides: number) : [number, RollResult[]] {
	let total = 0
	let results : RollResult[] = []
	for (let i = 1; i <= dice; i++) {
		const roll = rndInt(1, sides)
		console.log('roll', roll)
		results.push({
			min: 1,
			max: sides,
			result: roll
		})
		total += roll
	}

	return [total, results]
}
