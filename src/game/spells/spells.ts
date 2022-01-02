import {Game, Spell, SpellKey} from "../../types/game";
import {getRandomLiveEnemy, getRandomLiveEnemyIdx, getRandomLiveMostDamagedEnemy} from "../../lib/game";
import {rndDice} from "../../lib/rand";
import {dealDamage} from "../../lib/combatants";

const Fireball : Spell = {
	name: 'Fireball',
	description: `Deal 2d6 damage to a random enemy`,
	castTime: 800,
	cooldown: 0,
	manaCost: {
		chaos: 1,
		fire: 2,
	},
	cast: (game: Game) => {
		const [enemy, idx] = getRandomLiveEnemy(game)
		if (idx === -1) {
			return game
		}

		const [dmg, results] = rndDice(2, 6)
		dealDamage(enemy, dmg)
		return game
	}
}

const FrostShield : Spell = {
	name: 'Frost Shield',
	description: `Gain 6 shield`,
	castTime: 1000,
	cooldown: 0,
	manaCost: {
		cold: 2,
	},
	cast: (game: Game) => {
		game.player.shield += 6
		return game
	}
}

const LightningStrike : Spell = {
	name: 'Lightning Strike',
	description: `Deal 1d20 damage to the most damaged enemy`,
	castTime: 1000,
	cooldown: 0,
	manaCost: {
		lightning: 2,
		cold: 1,
	},
	cast: (game: Game) => {
		const [enemy, idx] = getRandomLiveMostDamagedEnemy(game)
		if (idx === -1) {
			return game
		}

		const [dmg, results] = rndDice(1, 20)
		console.log(`LIS: ${dmg} ${enemy}`)
		dealDamage(enemy, dmg)
		return game
	}
}

export const SpellLibrary : Record<SpellKey, Spell> = {
	fireball: Fireball,
	frost_shield: FrostShield,
	lightning_strike: LightningStrike,
}
