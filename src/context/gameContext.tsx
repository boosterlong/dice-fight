import {Combatant, Game, SpellInstance, SpellKey} from "../types/game";
import React, {useRef, useState} from "react";
import {deductMana, timeout} from "../lib/helpers";
import {SpellLibrary} from "../game/spells/spells";
import {Enemy} from "../types/enemies";
import {newSkeleton} from "../game/enemies/enemies";
import {ManaDie, ManaDieFace, ManaPool, ManaType} from "../types/mana-dice";
import {rndInt} from "../lib/rand";
import {deductSpellMana, hasMana} from "../lib/spells";
import {useStateRef} from "../lib/use-state-ref";

type GameContext = {
	state: Game,
	actions: {
		castSpell: (idx: number) => void
		toggleDie: (idx: number) => void
		rollManaDice: () => void
		keepManaDice: () => void
		endTurn: () => void
	}
}

const enemies = [
	newSkeleton(),
	newSkeleton(),
	newSkeleton(),
]

enemies[1].shield = 10;

function newFace(mana: ManaType | null) : ManaDieFace {
	return {
		type: mana,
	}
}

function newManaDie (manas: string) : ManaDie {
	const faces : ManaDieFace[] = manas.split(',').map((manaType) => {
		return {
			type: manaType as ManaType
		}
	})
	for (let i = faces.length; i < 6; i++) {
		faces.push({
			type: null
		})
	}
	return {
		faces: faces,
		locked: false,
		shownFaceIdx: 0,
		rolling: false,
	}
}

const manaDice : ManaDie[] = [
	newManaDie('fire,fire,fire,lightning,cold,chaos'),
	newManaDie('lightning,lightning,lightning,fire,cold,chaos'),
	newManaDie('cold,cold,cold,lightning,fire,chaos'),
	newManaDie('lightning,cold,fire'),
]

const DEFAULT_REROLLS = 3

function defaultGameContext () : Game {
	return {
		phase: 'rolling',
		round: 1,
		rerolls: DEFAULT_REROLLS,
		player: {
			name: 'Miles',
			currentHP: 25,
			maxHP: 25,
			shield: 0,
		},
		enemies: enemies,
		manaDice: manaDice,
		mana: {
			lightning: 3,
			cold: 3,
			fire: 3,
			chaos: 3,
		},
		spells: [
			{
				key: 'fireball',
				cooldown: 0,
				casting: false,
			},
			{
				key: 'frost_shield',
				cooldown: 0,
				casting: false,
			},
			{
				key: 'lightning_strike',
				cooldown: 0,
				casting: false,
			},
			{
				key: 'soul_sap',
				cooldown: 0,
				casting: false,
			}
		]
	}
}

export const GameContext = React.createContext<GameContext>({
	actions: {
		castSpell: (idx: number) => {},
		toggleDie: (idx: number) => {},
		rollManaDice: () => {},
		keepManaDice: () => {},
		endTurn: () => {},
	},
	state: defaultGameContext()
})

export const GameProvider : React.FC = ({children}) => {
	const defaultGame = defaultGameContext()
	const [round, setRound] = useState(defaultGame.round)
	const [phase, setPhase, phaseRef] = useStateRef(defaultGame.phase)
	const [spells, setSpells] = useState<SpellInstance[]>(defaultGame.spells)
	const [enemies, setEnemies] = useState<Enemy[]>(defaultGame.enemies)
	const [player, setPlayer] = useState<Combatant>(defaultGame.player)
	const [manaDice, setManaDice, manaDiceRef] = useStateRef<ManaDie[]>(defaultGame.manaDice)
	const [mana, setMana] = useState<ManaPool>(defaultGame.mana)
	const [rerolls, setRerolls, rerollsRef] = useStateRef(defaultGame.rerolls)

	const game = {
		round,
		mana,
		phase,
		player,
		spells,
		enemies,
		manaDice,
		rerolls,
	}

	// If this value is true, we don't let the player do anything
	// we lock things while we let animations show and the like
	const lockInteractionRef = useRef(false)

	async function castSpell(idx: number) {
		if (lockInteractionRef.current) {
			return
		}
		if (phaseRef.current !== 'actions') {
			return
		}
		const instance = spells[idx]
		if (!instance) {
			throw new Error('no spell, bad!')
		}
		const st = SpellLibrary[instance.key]

		if (!hasMana(mana, st)) {
			return
		}
		if (instance.cooldown > 0) {
			return
		}
		// TODO: Check for valid target maybe?

		lockInteractionRef.current = true

		const copy = [...spells]
		copy[idx].cooldown = instance.cooldown === 0 ? 0 : instance.cooldown - 1
		copy[idx].casting = true
		setSpells(copy)
		deductSpellMana(mana, st)
		setMana({...mana})

		// Each spell has its own cast function that will change the game state
		const gameCopy = JSON.parse(JSON.stringify(game))
		const newGame = st.cast(gameCopy)

		await timeout(st.castTime)

		// Update enemies from new game
		setEnemies([...newGame.enemies])

		// Player may have changed HP or shield
		setPlayer({
			...newGame.player
		})

		// Update all the spells again
		const newCopy = [...copy]
		newCopy[idx].cooldown = st.cooldown
		newCopy[idx].casting = false
		setSpells(newCopy)
		lockInteractionRef.current = false
	}

	function toggleDie (idx: number) {
		if (lockInteractionRef.current) {
			return
		}
		if (phaseRef.current !== 'rolling') {
			return
		}
		const copy = [...manaDice]
		copy[idx].locked = !copy[idx].locked
		setManaDice(copy)
	}

	function unlockAllDice () {
		const copy = [...manaDiceRef.current].map((c) => {
			c.locked = false
			return c
		})
		setManaDice(copy)
	}

	// User clicks the button convert all rolled dice into mana to spend
	async function keepManaDice () {
		if (lockInteractionRef.current) {
			return
		}
		if (phaseRef.current !== 'rolling') {
			return
		}
		const manaResult : Partial<ManaPool> = {}
		manaDice.forEach((m) => {
			const mt = m.faces[m.shownFaceIdx]
			if (mt.type) {
				manaResult[mt.type] = manaResult[mt.type] || 0
				//@ts-ignore
				manaResult[mt.type]++
			}
		})

		for (let key in manaResult) {
			const kType = key as ManaType
			const num = manaResult[kType]
			// @ts-ignore
			mana[kType] += manaResult[kType]
		}

		setMana({
			...mana
		})
		setPhase('actions')
	}

	// Rolls all your unlocked dice
	async function rollManaDice (force = false) {
		if (lockInteractionRef.current && !force) {
			return
		}
		if (phaseRef.current !== 'rolling' && !force) {
			return
		}
		if (rerollsRef.current <= 0) {
			return
		}
		lockInteractionRef.current = true
		setRerolls(rerollsRef.current-1)
		// Make them roll
		const copy = [...manaDiceRef.current]
		copy.forEach((c) => {
			if (c.locked) {
				return
			}
			c.rolling = true
		})
		setManaDice(copy)

		// Let the animation play for a bit
		await timeout(500)

		// Give them new values
		const copy2 = [...manaDiceRef.current]
		copy2.forEach((c) => {
			if (c.locked) {
				return
			}

			c.shownFaceIdx = rndInt(0, c.faces.length - 1)
			c.rolling = false
		})
		setManaDice(copy2)
		lockInteractionRef.current = false
	}

	function endTurn () {
		if (phase === 'rolling') {
			return
		}
		unlockAllDice()
		setPhase('rolling')

		// You lose half your mana each turn
		deductMana(mana, {
			cold: Math.ceil(mana.cold/2),
			lightning: Math.ceil(mana.lightning/2),
			chaos: Math.ceil(mana.chaos/2),
			fire: Math.ceil(mana.fire/2),
		})

		setRerolls(DEFAULT_REROLLS+1) // Give you +1 since you're gonna lose another one in rollManaDice
		rollManaDice(true)
	}

	const provided = {
		state: game,
		actions: {
			castSpell,
			toggleDie,
			rollManaDice,
			keepManaDice,
			endTurn,
		}
	}
	return <GameContext.Provider value={provided}>
		{children}
	</GameContext.Provider>
}

export default GameProvider
