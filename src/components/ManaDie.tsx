import {ManaDie as IManaDie} from "../types/mana-dice";
import {useContext} from "react";
import {GameContext} from "../context/gameContext";

type ManaDieProps = {
	die: IManaDie,
	idx: number
}

export default function ManaDie ({die, idx} : ManaDieProps) {
	const {actions} = useContext(GameContext)
	const face = die.faces[die.shownFaceIdx]
	function toggleDie () {
		actions.toggleDie(idx)
	}

	const title = die.faces.map((face) => {
		return face.type ? face.type : 'blank'
	}).join(' + ')

	return <div title={title} className={"mana-die mana-" + face.type + (die.rolling ? ' rolling ' : '')} onClick={toggleDie}>
		{face.type && !die.rolling && <div className={"mana-cost-icon mana-" + face.type} />}
		{die.locked && <span className={"locked-icon"}>locked</span>}
	</div>
}
