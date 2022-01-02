import Healthbar from "./healthbar";
import {Enemy as IEnemy} from "../types/enemies";
import {MoveSetLibrary} from "../game/enemies/move-sets";

type EnemyProps = {
	enemy: IEnemy
	idx: number
}

export default function Enemy({enemy}:EnemyProps) {
	const moveset = MoveSetLibrary[enemy.moveset]
	const move = moveset[enemy.currentMoveIdx]
	return (
		<div className={"enemy section " + (enemy.currentHP <= 0 ? ' dead ' : '') + (enemy.acting ? ' acting ' : '')}>
			<h6>
				{enemy.acting && '[!]'}
				{enemy.name}
				{enemy.currentHP ? ` (${enemy.currentHP}/${enemy.maxHP})` : ' [DEAD]'}
			</h6>
			<Healthbar current={enemy.currentHP} max={enemy.maxHP} shield={enemy.shield} />
			<div>
				{move ? 'Intent: ' + move.intent : '...'}
			</div>
		</div>

	)
}
