import {ActionResult, Game} from "../../types/game";
import {rndDice} from "../../lib/rand";
import {dealDamage} from "../../lib/combatants";
import {Enemy} from "../../types/enemies";

export type EnemyMove = {
	name: string
	intent: string
	action: (game: Game, enemy: Enemy) => ActionResult
}

function stabAction (game: Game, enemy: Enemy) : ActionResult {
	const [dmg] = rndDice(1, 4)
	dealDamage(game.player, dmg)
	return {
		logs: [`${enemy.name} stabbed you for ${dmg} damage`],
		player: true,
	}
}

const stab : EnemyMove = {
	name: 'Stab',
	intent: `Deal 1d6 damage`,
	action: stabAction
}

const protect : EnemyMove = {
	name: 'Protect',
	intent: `Gain 10 shield`,
	action: (game: Game, enemy: Enemy) : ActionResult => {
		enemy.shield += 10
		return {
			logs: [`${enemy.name} gained 10 shield`],
			enemies: true
		}
	}
}

export const MoveSetLibrary = {
	skeleton: [stab, stab, protect]
}
