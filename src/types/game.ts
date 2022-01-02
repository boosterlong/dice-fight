import {Enemy} from "./enemies";
import {ManaDie, ManaPool, ManaType} from "./mana-dice";

export type GamePhase = 'rolling' | 'actions' | 'enemies' | 'end'

export type Game = {
	round: number
	phase: GamePhase
	spells: SpellInstance[]
	enemies: Enemy[]
	player: Combatant
	manaDice: ManaDie[]
	rerolls: number,
	mana: Record<ManaType, number>
}

export type Combatant = {
	name: string
	currentHP: number
	maxHP: number
	shield: number
}

export type SpellKey = 'fireball' | 'frost_shield' | 'lightning_strike' | 'soul_sap'

export type Spell = {
	name: string
	description: string
	castTime: number
	cooldown: number
	cast: (game: Game) => Game
	manaCost: Partial<ManaPool>
}

export type SpellInstance = {
	key: SpellKey // Maps to our spell definitions
	cooldown: number
	casting: boolean
}
