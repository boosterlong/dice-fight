import {Game} from "../types/game";
import React, {useRef, useState} from "react";
import {timeout} from "../lib/helpers";

type GameContext = {
	state: Game,
	actions: {
		nextRound: Function,
		refreshName: Function,
	}
}

function defaultGameContext () : Game {
	return {
		round: 1,
		playerName: 'Miles'
	}
}

export const GameContext = React.createContext<GameContext>({
	actions: {
		refreshName: () => {},
		nextRound: () => {},
	},
	state: defaultGameContext()
})

export const GameProvider : React.FC = ({children}) => {
	const defaultGame = defaultGameContext()
	const [round, setRound] = useState(defaultGame.round)
	const [playerName, setPlayerName] = useState<string>(defaultGame.playerName)
	const lockRefs = useRef({
		changeName: false,
	})

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

	function nextRound () {
		setRound(round+1)
	}

	const provided = {
		state: {
			round,
			playerName,
		},
		actions: {
			refreshName,
			nextRound,
		}
	}
	return <GameContext.Provider value={provided}>
		{children}
	</GameContext.Provider>
}

export default GameProvider
