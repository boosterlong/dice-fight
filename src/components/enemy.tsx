import Healthbar from "./healthbar";
import {Enemy as IEnemy} from "../types/enemies";

type EnemyProps = {
    enemy: IEnemy
    idx: number
}

export default function CEnemy({enemy}:EnemyProps) {

    return (
        <>
        <div className={"enemy section " + (enemy.currentHP <= 0 ? ' dead ' : '')}>
            <h6>
                {enemy.name}
                {enemy.currentHP ? ` (${enemy.currentHP}/${enemy.maxHP})` : ' [DEAD]'}
            </h6>
            <Healthbar current={enemy.currentHP} max={enemy.maxHP} shield={enemy.shield} />
        </div>
        </>
    )
}
