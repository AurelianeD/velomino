import {useContext} from "react";
import {PlayerListContext} from "../provider/PlayerListProvider";
import {GameInformationsContext} from "../provider/GameInformationsProvider";

function CardsPlayer(props) {
	const {arrivedPlayers, setArrivedPlayers} = useContext(GameInformationsContext);
	const {playerList, setPlayerList} = useContext(PlayerListContext);
	const {difficulty} = useContext(GameInformationsContext)


	//cette fonction ajoute l'index du joueur dans une liste par ordre d'arrivé
	function FinalList(index) {
		setArrivedPlayers([...arrivedPlayers, playerList[index]])

		playerList[index].score += ((playerList.length - (arrivedPlayers.length + 1)) * difficulty)

		setPlayerList(playerList)
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