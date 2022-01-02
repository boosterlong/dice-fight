import {ActionResult, Game, Skill, SkillKey} from "../../types/game";
import {
	getRandomLiveEnemy,
	getRandomLiveMostDamagedEnemy,
	getRandomLiveMostShieldEnemy
} from "../../lib/game";
import {rndDice} from "../../lib/rand";
import {dealDamage, healCombatant, isDead} from "../../lib/combatants";
import {deductMana} from "../../lib/helpers";

const Fireball : Skill = {
	name: 'Fireball',
	description: `Deal 2d6 damage to a random enemy`,
	castTime: 800,
	cooldown: 0,
	manaCost: {
		chaos: 1,
		fire: 2,
	},
	use: (game: Game) => {
		const [enemy, idx] = getRandomLiveEnemy(game)
		if (!enemy) {
			return {}
		}

		const [dmg, results] = rndDice(2, 6)
		dealDamage(enemy, dmg)
		return {
			enemies: true,
			logs: [`Dealt ${dmg} to ${enemy.name}.` + (isDead(enemy) ? ' Fatality.' : '')]
		}
	}
}

const FrostShield : Skill = {
	name: 'Frost Shield',
	description: `Gain 6 shield. Spend 1 Fire: Heal 1d4`,
	castTime: 1000,
	cooldown: 0,
	manaCost: {
		cold: 2,
	},
	use: (game: Game) => {
		game.player.shield += 6

		const result : ActionResult  = {
			player: true,
			logs: [`Gained 6 shield`]
		}

		if (game.mana.fire > 0) {
			const [roll] = rndDice(1, 4)
			healCombatant(game.player, roll)
			deductMana(game.mana, {fire: 1})
			result.mana = true
			result.logs?.push(`Spent 1 fire to heal ${roll}`)
		}

		return result
	}
}
const SoulSap : Skill = {
	name: 'Soul Sap',
	description: `Steal d6 shield from enemy with most shields`,
	castTime: 1000,
	cooldown: 0,
	manaCost: {
		chaos: 2,
		lightning: 1,
	},
	use: (game: Game) : ActionResult => {
		const [enemy] = getRandomLiveMostShieldEnemy(game)
		if (!enemy) {
			return {}
		}
		const [steal, results] = rndDice(1, 6)
		const stolen = Math.min(enemy.shield, steal)
		enemy.shield -= stolen
		game.player.shield += stolen
		const logs = [`Stole ${stolen} shield form ${enemy.name}`]
		return {
			player: true,
			enemies: true,
			logs
		}
	}
}

const LightningStrike : Skill = {
	name: 'Lightning Strike',
	description: `Deal 1d20 damage to the most damaged enemy. 
Expend Lightning: Gain 1 advantage per mana spent`,
	castTime: 1000,
	cooldown: 0,
	manaCost: {
		lightning: 1,
		cold: 1,
	},
	use: (game: Game) : ActionResult => {
		const [enemy] = getRandomLiveMostDamagedEnemy(game)
		if (!enemy) {
			return {}
		}

		const lMana = game.mana.lightning
		const rolls = lMana
		let max = 0
		for (let i = 1; i <= rolls; i++) {
			const [dmg] = rndDice(1, 20)
			if (dmg > max) {
				max = dmg
			}
		}
		dealDamage(enemy, max)

		// Deduct the excess mana that was used for rerolls.
		deductMana(game.mana, {lightning: lMana - 1})

		return {
			mana: true,
			enemies: true,
			logs: [`Dealt ${max} damage to ${enemy.name}. Spent ${lMana} lightning for ${rolls-1} extra rolls.`]
		}
	}
}

export const SkillLibrary : Record<SkillKey, Skill> = {
	fireball: Fireball,
	frost_shield: FrostShield,
	lightning_strike: LightningStrike,
	soul_sap: SoulSap,
}
