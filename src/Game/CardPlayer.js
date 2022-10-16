import {useContext} from "react";
import {PlayerListContext} from "../provider/PlayerListProvider";

function CardsPlayer(props) {
	const {arrivedPlayers, setArrivedPlayers} = props.arrivedPlayers
	const {playerList, setPlayerList} = useContext(PlayerListContext);

	//cette fonction ajoute l'index du joueur dans une liste par ordre d'arrivé
	function FinalList(index) {
		playerList[index].score += ((playerList.length - arrivedPlayers.length) * props.round.round)

		setArrivedPlayers([...arrivedPlayers, playerList[index]])
		setPlayerList(playerList)
	}

	return (
		<div className='grid grid-cols-5 gap-4 mb-5'>
			{
				playerList.map(
					(player, index) =>
						<div key={index}>
							<button
								className='bg-purple rounded-xl text-white py-2.5 px-2.5 mb-2 disabled:opacity-50'
								disabled={arrivedPlayers.indexOf(player) !== -1}
								onClick={() => {
									FinalList(index);
									props.onClick();
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