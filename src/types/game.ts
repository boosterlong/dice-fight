import {Enemy} from "./enemies";

export type Game = {
	round: number
	playerName: string
	spells: SpellInstance[]
	enemies: Enemy[]
}

export type Combatant = {
	name: string
	currentHP: number
	maxHP: number
	shield: number
}

export type SpellKey = 'fireball' | 'frost_shield'

export type Spell = {
	name: string
	description: string
	castTime: number
	cooldown: number
	cast: (game: Game) => Game
}

export type SpellInstance = {
	key: SpellKey // Maps to our spell definitions
	cooldown: number
	casting: boolean
}
