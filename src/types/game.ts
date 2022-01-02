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
	logs: string[]
}

export type Combatant = {
	name: string
	currentHP: number
	maxHP: number
	shield: number
}

export type SkillKey = 'fireball' | 'frost_shield' | 'lightning_strike' | 'soul_sap'

export type Skill = {
	name: string
	description: string
	castTime: number
	cooldown: number
	use: (game: Game) => ActionResult
	manaCost: Partial<ManaPool>
}

export type SpellInstance = {
	key: SkillKey // Maps to our spell definitions
	cooldown: number
	casting: boolean
}

// When you use a skill or an enemy does a move, this is returned
// Any key that exists here will be added/replaced into the game's state
export type ActionResult = {
	logs?: string[]
	enemies?: boolean
	player?: boolean
	mana?: boolean
}
