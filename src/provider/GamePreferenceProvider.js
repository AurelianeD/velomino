import useLocalStorage from "../hooks/useLocalStorage";
import {createContext} from "react";

export const GamePreferenceContext = createContext([]);

function GamePreferenceProvider({children}) {

	const [gamePreference, setGamePreference] = useLocalStorage(["gamePreference"], []);


	return (
		<GamePreferenceContext.Provider value={{gamePreference, setGamePreference}}>
			{children}
		</GamePreferenceContext.Provider>
	)
}

export default GamePreferenceProvider;