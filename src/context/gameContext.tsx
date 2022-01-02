import {Game, SpellInstance, SpellKey} from "../types/game";
import React, {useRef, useState} from "react";
import {timeout} from "../lib/helpers";
import {SpellLibrary} from "../game/spells/spells";

type GameContext = {
	state: Game,
	actions: {
		nextRound: () => void,
		refreshName: () => void,
		castSpell: (idx: number) => void
	}
}

function defaultGameContext () : Game {
	return {
		round: 1,
		playerName: 'Miles',
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
		]
	}
}

export const GameContext = React.createContext<GameContext>({
	actions: {
		refreshName: () => {},
		nextRound: () => {},
		castSpell: (idx: number) => {},
	},
	state: defaultGameContext()
})

export const GameProvider : React.FC = ({children}) => {
	const defaultGame = defaultGameContext()
	const [round, setRound] = useState(defaultGame.round)
	const [playerName, setPlayerName] = useState<string>(defaultGame.playerName)
	const [spells, setSpells] = useState<SpellInstance[]>(defaultGame.spells)

	const lockRefs = useRef({
		changeName: false,
		useSkill: false,
	})

	function getSpellInstanceByKey (key: SpellKey) {
		return spells.find(x => x.key === key)
	}

	async function refreshName () {
		if (lockRefs.current.changeName) {
			return
		}
		lockRefs.current.changeName = true
		setPlayerName('...')
		await timeout(2000)
		setPlayerName('New Name ' + Math.random().toString().substr(2,4))
		lockRefs.current.changeName = false
	}

	async function castSpell(idx: number) {
		if (lockRefs.current.useSkill) {
			return
		}
		const instance = spells[idx]
		if (!instance) {
			throw new Error('no spell, bad!')
		}
		const st = SpellLibrary[instance.key]
		if (instance.cooldown > 0) {
			return
		}
		lockRefs.current.useSkill = true

		const copy = [...spells]
		copy[idx].cooldown = instance.cooldown === 0 ? 0 : instance.cooldown - 1
		copy[idx].casting = true
		setSpells(copy)

		await timeout(st.castTime)

		const newCopy = [...copy]
		newCopy[idx].cooldown = st.cooldown
		newCopy[idx].casting = false
		setSpells(newCopy)
		lockRefs.current.useSkill = false
	}

	function nextRound () {
		setRound(round+1)
	}

	const provided = {
		state: {
			round,
			playerName,
			spells,
		},
		actions: {
			refreshName,
			nextRound,
			castSpell,
		}
	}
	return <GameContext.Provider value={provided}>
		{children}
	</GameContext.Provider>
}

export default GameProvider
