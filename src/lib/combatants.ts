import {Combatant} from "../types/game";

export default function hpPercent (c: Combatant) {

}

export function dealDamage (c: Combatant, dmg: number) {
	let hpLoss = dmg
	if (c.shield > 0) {
		const blocked = Math.min(c.shield, dmg)
		hpLoss -= blocked
		c.shield -= blocked
	}
	c.currentHP -= hpLoss
	if (c.currentHP < 0) {
		c.currentHP = 0
	}
}

export function healCombatant (c: Combatant, heal: number) {
	c.currentHP += heal
	if (c.currentHP > c.maxHP) {
		c.currentHP = c.maxHP
	}
}

export function isDead (c: Combatant) : boolean {
	return c.currentHP <= 0
}
