import {useContext} from "react";
import {PlayerListContext} from "../provider/PlayerListProvider";
import AddPlayer from "./AddPlayer";
import PlayerList from "./PlayerList";

function PrepareGame(props) {
	const {playerList, setPlayerList} = useContext(PlayerListContext);

	return (
		<div className=''>
			{playerList.length < 5 ? <AddPlayer/> : null}
			<div
				// className='grid grid-rows-5 lg:grid-col-5 gap-4'
			>
				<PlayerList/>
			</div>

		</div>);
}

export default PrepareGame;