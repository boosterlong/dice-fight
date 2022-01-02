import {Game} from "../types/game";
import {rndElement} from "./rand";
import {Enemy} from "../types/enemies";

type SortedEnemy = {
	idx: number,
	value: number
	dead: boolean
}

type FoundEnemy = [Enemy | undefined, number]

export function getRandomLiveEnemyIdx(game: Game) : number {
	const found : number[] = []
	game.enemies.forEach((en, idx) => {
		if (en.currentHP > 0) {
			found.push(idx)
		}
	})

	if (found.length === 0) {
		return -1
	}

	return rndElement(found)
}

export function getRandomLiveEnemy (game: Game) : FoundEnemy {
	const idx = getRandomLiveEnemyIdx(game)
	if (idx === -1) {
		return [undefined, -1]
	}
	return [game.enemies[idx], idx]
}

function getSortedLiveEnemies (game: Game, getVal: (e: Enemy) => number) : SortedEnemy[] {
	return game.enemies
		.map((e, i) => {
			return {
				idx: i,
				value: getVal(e),
				dead: e.currentHP <= 0
			}
		})
		.filter(x => !x.dead)
		.sort((a,b) => a.value > b.value ? -1 : 1)
}

export function getRandomLiveMostDamagedEnemy (game: Game) : FoundEnemy {
	const sorted = getSortedLiveEnemies(game, (e) => e.maxHP - e.currentHP)
	return getRandomSortedEnemies(game, sorted)
}

export function getRandomLiveMostShieldEnemy (game: Game) : FoundEnemy {
	const sorted = getSortedLiveEnemies(game, (e) => e.shield)
	return getRandomSortedEnemies(game, sorted)
}

// Given a pre-sorted list of enemy indexes and a given value for them
// This is so you can find "One enemy with the highest HP" for example
// If one enemy has the highest, it picks that enemy
// If multiple enemies have the highest value, it picks one of those randomly
function getRandomSortedEnemies (game: Game, sortedEnemies: SortedEnemy[]) : FoundEnemy {
	let options : SortedEnemy[] = []
	for (let i = 0; i < sortedEnemies.length; i++) {
		const se = sortedEnemies[i]
		if (i === 0) {
			options = [se]
			continue
		}
		// If this item has a value equal to the previous item, then add it to the list
		if (se.value === options[0].value) {
			options.push(se)
		} else {
			break
		}
	}

	console.log('options', options)
	const pick = rndElement(options)
	console.log('pick', pick)
	return [game.enemies[pick.idx], pick.idx]
}

