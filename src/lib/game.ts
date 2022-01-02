import {Game} from "../types/game";
import {rndElement} from "./rand";
import {Enemy} from "../types/enemies";

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
