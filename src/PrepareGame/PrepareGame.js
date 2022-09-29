import {useContext} from "react";
import {PlayerListContext} from "../provider/PlayerListProvider";
import AddPlayer from "./AddPlayer";
import PlayerList from "./PlayerList";

function PrepareGame(props) {
	const {playerList, setPlayerList} = useContext(PlayerListContext);

	return (
		<>
			{playerList.length < 5 ? <AddPlayer/> : null}
			<PlayerList/>

			<button onClick={() => {
				props.onClick();
			}}>Commencer la partie
			</button>
		</>);
}

export default PrepareGame;