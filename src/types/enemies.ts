import {Combatant} from "./game";

type EnemyMoveSet = 'skeleton'

export type Enemy = Combatant & {
	moveset: EnemyMoveSet
	currentMoveIdx: number
	previousMoves: number[]
}
