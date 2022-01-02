export type Game = {
	round: number
	playerName: string
	spells: SpellInstance[]
}

export type SpellKey = 'fireball' | 'frost_shield'

export type Spell = {
	name: string
	description: string
	castTime: number
	cooldown: number
}

export type SpellInstance = {
	key: SpellKey // Maps to our spell definitions
	cooldown: number
	casting: boolean
}
