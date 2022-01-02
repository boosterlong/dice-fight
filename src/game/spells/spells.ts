import {Game, Spell, SpellKey} from "../../types/game";
import {
	getRandomLiveEnemy,
	getRandomLiveEnemyIdx,
	getRandomLiveMostDamagedEnemy,
	getRandomLiveMostShieldEnemy
} from "../../lib/game";
import {rndDice} from "../../lib/rand";
import {dealDamage, healCombatant} from "../../lib/combatants";
import {deductMana} from "../../lib/helpers";

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
		if (!enemy) {
			return game
		}

		const [dmg, results] = rndDice(2, 6)
		dealDamage(enemy, dmg)
		return game
	}
}

const FrostShield : Spell = {
	name: 'Frost Shield',
	description: `Gain 6 shield. Spend 1 Fire: Heal 1d4`,
	castTime: 1000,
	cooldown: 0,
	manaCost: {
		cold: 2,
	},
	cast: (game: Game) => {
		game.player.shield += 6

		if (game.mana.fire > 0) {
			const [roll] = rndDice(1, 4)
			healCombatant(game.player, roll)
			deductMana(game.mana, {fire: 1})
		}

		return game
	}
}
const SoulSap : Spell = {
	name: 'Soul Sap',
	description: `Steal d6 shield from enemy with most shields`,
	castTime: 1000,
	cooldown: 0,
	manaCost: {
		chaos: 2,
		lightning: 1,
	},
	cast: (game: Game) => {
		const [enemy, _] = getRandomLiveMostShieldEnemy(game)
		console.log('enemy', enemy)
		if (!enemy) {
			return game
		}
		const [steal, results] = rndDice(1, 6)
		console.log('steal', steal)
		const stolen = Math.min(enemy.shield, steal)
		enemy.shield -= stolen
		game.player.shield += stolen
		return game
	}
}

const LightningStrike : Spell = {
	name: 'Lightning Strike',
	description: `Deal 1d20 damage to the most damaged enemy. 
Expend Lightning: Gain 1 advantage per mana spent`,
	castTime: 1000,
	cooldown: 0,
	manaCost: {
		lightning: 1,
		cold: 1,
	},
	cast: (game: Game) => {
		const [enemy, idx] = getRandomLiveMostDamagedEnemy(game)
		if (!enemy) {
			return game
		}

		const lMana = game.mana.lightning
		const rolls = lMana
		let max = 0
		for (let i = 1; i <= rolls; i++) {
			const [dmg, results] = rndDice(1, 20)
			console.log(`LIS: ${dmg} ${enemy}`)
			if (dmg > max) {
				max = dmg
			}
		}
		console.log(`Rolled ${rolls} times. Total dmg: ${max}`)
		dealDamage(enemy, max)

		// Deduct the excess mana that was used for rerolls.
		deductMana(game.mana, {lightning: lMana - 1})

		return game
	}
}

export const SpellLibrary : Record<SpellKey, Spell> = {
	fireball: Fireball,
	frost_shield: FrostShield,
	lightning_strike: LightningStrike,
	soul_sap: SoulSap,
}
