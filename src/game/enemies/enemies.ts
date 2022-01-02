import {Enemy} from "../../types/enemies";

export function newSkeleton () : Enemy {
	return {
		name: 'Skeleton',
		currentHP: 10,
		maxHP: 10,
		acting: false,
		moveset: 'skeleton',
		shield: 0,
		currentMoveIdx: -1,
		previousMoves: [],
	}
}
