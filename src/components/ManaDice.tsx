import {useContext} from "react";
import {GameContext} from "../context/gameContext";
import {ManaDie as IManaDie} from "../types/mana-dice";
import ManaDie from "./ManaDie";

export default function ManaDice () {
	const {state} = useContext(GameContext)

	return <div className={"mana-dice"}>
		{state.manaDice.map((die: IManaDie, idx) => {
			return <ManaDie die={die} idx={idx} key={idx} />
		})}
	</div>
}
