import {Spell, SpellKey} from "../../types/game";

const Fireball : Spell = {
	name: 'Fireball',
	description: `Deal 2d6 damage to a random enemy`,
	castTime: 2500,
	cooldown: 3,
}

const FrostShield : Spell = {
	name: 'Frost Shield',
	description: `Gain 6 shield`,
	castTime: 1000,
	cooldown: 0,
}

export const SpellLibrary : Record<SpellKey, Spell> = {
	fireball: Fireball,
	frost_shield: FrostShield
}
