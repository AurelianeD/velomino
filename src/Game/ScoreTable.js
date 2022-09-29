import {useContext} from "react";
import {PlayerListContext} from "../provider/PlayerListProvider";

function ScoreTable(props) {
	const {playerList, setPlayerList} = useContext(PlayerListContext);
	const {arrivedPlayers, setArrivedPlayers} = props.arrivedPlayers;
	const {round, setRound} = props.round;
	const {count, setCount} = props.count;
	;

	function incrementRound() {
		setRound(round + 1)
		setArrivedPlayers([])
		setCount(count + 1)
	}

	return (
		<div>
			{
				arrivedPlayers.map((player, index) => {
					const firstArrivedPlayer = arrivedPlayers.indexOf(player) === 0;
					return (
						<div key={index} className="center">
							{firstArrivedPlayer ?
								<div className="flex">
									<img src={require("../assets/carrot.png")} alt="carrot" className="carrot"/>
									<p>{player.name}</p>
									<p className='score'>{player.score}</p>
								</div>
								:
								<div className="flex">
									<p>{player.name}</p>
									<p className='score'>{player.score}</p>
								</div>}
						</div>
					)
				})
			}
			<button onClick={incrementRound}
							disabled={playerList.length !== arrivedPlayers.length}
			>Terminer la manche
			</button>
		</div>
	)
}

export default ScoreTable;