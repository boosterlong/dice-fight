import React, {useContext} from "react";
import {GameContext} from "../context/gameContext";
import Enemy from "./enemy";

export default function EnemyList () {
	const {state} = useContext(GameContext)

	return <div className="enemy-field">
		{state.enemies.map((e, idx) => {
			return <Enemy enemy={e} idx={idx} key={idx} />
		})}
	</div>
}
