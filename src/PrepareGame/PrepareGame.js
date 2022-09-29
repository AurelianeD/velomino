import {useContext} from "react";
import {PlayerListContext} from "../provider/PlayerListProvider";
import AddPlayer from "./AddPlayer";
import PlayerList from "./PlayerList";

function PrepareGame(props) {
	const {playerList, setPlayerList} = useContext(PlayerListContext);

	return (
		<div>
			{playerList.length < 5 ? <AddPlayer/> : null}
			<PlayerList/>

			<button className='bg-purple rounded-xl text-white py-4 px-2.5 mt-32 hover:bg-purpleDark' onClick={() => {
				props.onClick();
			}}>Commencer la partie
			</button>
		</div>);
}

export default PrepareGame;