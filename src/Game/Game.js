import {useContext, useState} from "react";
import {PlayerListContext} from "../provider/PlayerListProvider";
import CardsPlayer from "./CardPlayer";
import ScoreTable from "./ScoreTable";

function Game(props) {
	const {playerList, setPlayerList} = useContext(PlayerListContext);
	const [arrivedPlayers, setArrivedPlayers] = useState([]);
	const [round, setRound] = useState(1);
	const [count, setCount] = useState(0);


	if (count === 5) {
		playerList.sort((a, b) => b.score - a.score)
		return (
			<>
				{playerList.map((player, index) => {
						const hightScore = Math.max(...playerList.map(player => player.score));
						return (
							<div key={player.score} className="center">
								{hightScore === player.score ?
									<div className="flex">
										<img src={require('../assets/crown.png')} alt="carrot" className="carrot"/>
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
					}
				)}
				<div className='flex'>
					<button onClick={() => {
						setArrivedPlayers([]);
						setRound(1);
						setCount(0);
						setPlayerList(
							playerList.map((player) => {
								player.score = 0
								return player;
							}))
					}}
					>Recommencer la partie
					</button>

					<button onClick={() => {
						setPlayerList([]);
						setArrivedPlayers([]);
						setRound(1);
						setCount(0);
						props.setShowContent(true);
					}}>
						Quitter la partie
					</button>
				</div>
			</>
		)
	}
	return (
		<div>
			<CardsPlayer onClick={props.onClick} arrivedPlayers={{arrivedPlayers, setArrivedPlayers}}
									 round={{round, setRound}}/>
			<ScoreTable arrivedPlayers={{arrivedPlayers, setArrivedPlayers}} round={{round, setRound}}
									count={{count, setCount}}/>
		</div>
	)
}

export default Game;