import {Combatant} from "./game";

type EnemyMoveSet = 'skeleton'

export type Enemy = Combatant & {
	moveset: EnemyMoveSet
	acting: boolean // Currently being animated and doing things
	currentMoveIdx: number
	previousMoves: number[]
}
