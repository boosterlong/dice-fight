export type ManaType = 'lightning' | 'cold' | 'fire' | 'chaos'

export type RollResult = {
	min: number,
	max: number,
	result: number,
}

export type ManaDie = {
	faces: ManaDieFace[]
	locked: boolean,
	rolling: boolean
	shownFaceIdx: number
}

export type ManaDieFace = {
	type: null | ManaType
}

export type ManaPool = Record<ManaType, number>
