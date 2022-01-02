import {Game} from "../types/game";
import {rndElement} from "./rand";
import {Enemy} from "../types/enemies";

type SortedEnemy = {
	idx: number,
	value: number
}

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

export function getRandomLiveEnemy (game: Game) : [Enemy, number] {
	const idx = getRandomLiveEnemyIdx(game)
	return [game.enemies[idx], idx]
}

export function getRandomLiveMostDamagedEnemy (game: Game) : [Enemy, number] {
	const idxsAndDamaged : SortedEnemy[] = game.enemies.map((e, i) => {
		return {
			idx: i,
			value: e.maxHP - e.currentHP
		}
	})
	return getRandomSortedEnemies(game, idxsAndDamaged)
}

function getRandomSortedEnemies (game: Game, sortedEnemies: SortedEnemy[]) : [Enemy, number] {
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

	const pick = rndElement(options)
	return [game.enemies[pick.idx], pick.idx]
}

