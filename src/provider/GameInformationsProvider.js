import useLocalStorage from "../hooks/useLocalStorage";
import {createContext} from "react";

export const GameInformationsContext = createContext([]);

function GameInformationsProvider({children}) {

	const [gamePreferences, setGamePreferences] = useLocalStorage(["gameInformations"], []);
	const [arrivedPlayers, setArrivedPlayers] = useLocalStorage(["arrivedPlayers"], []);
	const [round, setRound] = useLocalStorage(["round"], 1);
	const [count, setCount] = useLocalStorage(["count"], 0);
	const [difficulty, setDifficulty] = useLocalStorage(["difficulty"], round);
	const [scoreTable, setScoreTable] = useLocalStorage(["scoreTable"], []);

	return (
			<GameInformationsContext.Provider value={{
				gamePreferences,
				setGamePreferences,
				arrivedPlayers,
				setArrivedPlayers,
				round,
				setRound,
				count,
				setCount,
				difficulty,
				setDifficulty,
				scoreTable,
				setScoreTable
			}}>
				{children}
			</GameInformationsContext.Provider>
	)
}

export default GameInformationsProvider;