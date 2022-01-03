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
	let [dmg] = rndDice(1, 6)

	let msg = `${enemy.name} stabbed you for ${dmg}`

	if (game.mana.chaos === 0) {
		const [extra] = rndDice(1,4)
		msg += `+${extra}`
		dmg += extra
	}

	dealDamage(game.player, dmg)
	msg += ` damage`

	return {
		logs: [msg],
		player: true,
	}
}

const stab : EnemyMove = {
	name: 'Stab',
	intent: `Deal 1d6 damage. If you have no Chaos mana, deal +1d4 damage.`,
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
