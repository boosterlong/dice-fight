import {Enemy} from "../types/enemies";
import {EnemyMove, MoveSetLibrary} from "../game/enemies/move-sets";
import {rndInt} from "./rand";

export function redrawMove (e: Enemy) {
	const moveset = MoveSetLibrary[e.moveset]
	if (e.currentMoveIdx !== null) {
		e.previousMoves.push(e.currentMoveIdx)
	}
	if (e.previousMoves.length === moveset.length) {
		e.previousMoves = []
	}
	let idx = -1
	let breaker = 0
	do {
		idx = rndInt(0, moveset.length - 1)
		breaker++
	} while (e.previousMoves.indexOf(idx) !== -1 && breaker < 1000)

	e.currentMoveIdx = idx
}

export function getEnemyMove (e: Enemy) : EnemyMove {
	const set = MoveSetLibrary[e.moveset]
	const move = set[e.currentMoveIdx]
	return move
}
