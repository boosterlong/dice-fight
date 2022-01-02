import {ManaDie as IManaDie} from "../types/mana-dice";
import {useContext, useEffect, useState} from "react";
import {GameContext} from "../context/gameContext";
import {rndInt} from "../lib/rand";

type ManaDieProps = {
	die: IManaDie,
	idx: number
}

export default function ManaDie ({die, idx} : ManaDieProps) {
	const {actions} = useContext(GameContext)
	const [rollSpeed, setRollSpeed] = useState<number>(rndInt(5000, 10000))

	useEffect(() => {
		if (die.rolling) {
			setRollSpeed(rndInt(250, 500))
		}
	}, [die.rolling])

	const face = die.faces[die.shownFaceIdx]
	function toggleDie () {
		actions.toggleDie(idx)
	}

	const title = die.faces.map((face) => {
		return face.type ? face.type : 'blank'
	}).join(' + ')

	return <div style={{animationDuration: `${rollSpeed}ms`}} title={title} className={"mana-die mana-" + face.type + (die.rolling ? ' rolling ' : '')} onClick={toggleDie}>
		{face.type && !die.rolling && <div className={"mana-cost-icon mana-" + face.type} />}
		{face.shield && !die.rolling && <div className={"mana-die-shield"}>+{face.shield} Shield</div>}
		{die.locked && <span className={"locked-icon"}>locked</span>}
	</div>
}
