import useLocalStorage from "../hooks/useLocalStorage";
import {createContext} from "react";

export const PlayerListContext = createContext([]);

function PlayerListProvider({children}) {

	const [playerList, setPlayerList] = useLocalStorage(["playerList"], []);


	return (
		<PlayerListContext.Provider value={{playerList, setPlayerList}}>
			{children}
		</PlayerListContext.Provider>
	)
}

export default PlayerListProvider;