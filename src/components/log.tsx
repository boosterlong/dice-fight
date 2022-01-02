import {useContext} from "react";
import {GameContext} from "../context/gameContext";

export default function Logs () {
	const {state} = useContext(GameContext)
	const {logs} = state
	return <div>
		<ol>
			{logs.map((log) => {
				return <li>{log}</li>
			})}
		</ol>
	</div>
}
