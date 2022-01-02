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
