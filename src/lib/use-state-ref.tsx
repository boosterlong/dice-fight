import { useCallback, useRef, useState } from "react";

type Ref<T> = {
	current: T
}

export function useStateRef<T>(defaultVal: T) : [T, Function, Ref<T>] {
	const [state, setState] = useState<T>(defaultVal);
	const ref = useRef(state);

	const dispatch = useCallback(function(newState: T) {
		ref.current = newState;
		setState(newState);
	}, [])

	return [state, dispatch, ref];
}
