import {useContext} from "react";
import {PlayerListContext} from "../provider/PlayerListProvider";
import {GameInformationsContext} from "../provider/GameInformationsProvider";

function CardsPlayer(props) {
	const {arrivedPlayers, setArrivedPlayers, scoreTable, setScoreTable} = useContext(GameInformationsContext);
	const {playerList, setPlayerList} = useContext(PlayerListContext);
	const {difficulty} = useContext(GameInformationsContext)


	function FinalList(index) {
		setArrivedPlayers([...arrivedPlayers, playerList[index]]);
		playerList[index].finalScore += ((playerList.length - (arrivedPlayers.length + 1)) * difficulty);
		setPlayerList(playerList);
		//TODO: find a way to update the score to the right player
	
	}

	return (
			<div className='flex flex-row gap-4 justify-center content-center mb-10'>
				{
					playerList.map(
							(player, index) =>
									<div key={index}>
										<button
												className='bg-purple rounded-xl text-white py-2.5 px-2.5 mb-2 disabled:opacity-50 hover:bg-purpleDark'
												disabled={arrivedPlayers.indexOf(player) !== -1}
												onClick={() => {
													FinalList(index);
												}}>
											{player.name}
										</button>
									</div>
					)
				}
			</div>
	)
}

export default CardsPlayer