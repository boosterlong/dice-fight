import {Game, Spell, SpellKey} from "../../types/game";
import {getRandomLiveEnemy, getRandomLiveEnemyIdx} from "../../lib/game";
import {rndDice} from "../../lib/rand";
import {dealDamage} from "../../lib/combatants";

const Fireball : Spell = {
	name: 'Fireball',
	description: `Deal 2d6 damage to a random enemy`,
	castTime: 2500,
	cooldown: 0,
	cast: (game: Game) => {
		const [enemy, idx] = getRandomLiveEnemy(game)
		if (idx === -1) {
			return game
		}

		const [dmg, results] = rndDice(2, 6)
		console.log('e', JSON.stringify(enemy))
		console.log(`Dealt ${dmg} (${results.map(x => `${x.result}`)}) to enemy [${idx}] aka ${enemy.name}`)
		dealDamage(enemy, dmg)
		console.log('e', JSON.stringify(enemy))
		return {
			...game,
		}
	}
}

const FrostShield : Spell = {
	name: 'Frost Shield',
	description: `Gain 6 shield`,
	castTime: 1000,
	cooldown: 0,
	cast: (game: Game) => {
		game.playerName = 'You Are Shield'
		return {
			...game
		}
	}
}

export const SpellLibrary : Record<SpellKey, Spell> = {
	fireball: Fireball,
	frost_shield: FrostShield
}
