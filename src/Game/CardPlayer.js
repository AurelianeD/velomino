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
		<>
			{
				playerList.map(
					(player, index) =>
						<div key={index} className="center padding-b-2">
							<button disabled={arrivedPlayers.indexOf(player) !== -1}
											onClick={() => {
												FinalList(index);
												props.onClick();
											}}>
								{player.name}
							</button>
						</div>
				)
			}
		</>
	)
}

export default CardsPlayer