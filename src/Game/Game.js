import {useContext, useState} from "react";
import {PlayerListContext} from "../provider/PlayerListProvider";
import {GamePreferenceContext} from "../provider/GamePreferenceProvider";
import CardsPlayer from "./CardPlayer";
import ScoreTable from "./ScoreTable";

function Game(props) {
	const {playerList, setPlayerList} = useContext(PlayerListContext);
	const {gamePreference} = useContext(GamePreferenceContext);

	const [arrivedPlayers, setArrivedPlayers] = useState([]);
	const [round, setRound] = useState(1);
	const [count, setCount] = useState(0);
	const [difficulty, setDifficulty] = useState(round);


	if (count === gamePreference.numberOfRound) {
		playerList.sort((a, b) => b.score - a.score)
		return (
			<>
				<div className='flex flex-col gap-4 justify-center items-center md:flex-row'>
					{playerList.map((player, index) => {
							const hightScore = Math.max(...playerList.map(player => player.score));
							return (
								<div key={index}>
									{hightScore === player.score ?
										<div className="bg-white rounded-xl p-5 relative shadow-md">
											<img src={require('../assets/crown.png')} alt="carrot"
													 className="absolute top-[-15px] right-[-10px] w-10"/>
											<p className="px-5 uppercase font font-bold text-xl">{player.name}</p>
											<p className='text-xl text-purple'>{player.score}</p>
										</div>
										:
										<div className="bg-white rounded-xl p-5 relative shadow-md">
											<p className="px-5 uppercase font font-bold text-xl">{player.name}</p>
											<p className='text-xl text-purple'>{player.score}</p>
										</div>}
								</div>
							)
						}
					)}
				</div>
				<div className='flex flex-col gap-4 justify-center content-center m-10 md:flex-row'>
					<button
						className='bg-purple rounded-full text-white p-3 hover:bg-purpleDark'
						onClick={() => {
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

					<button
						className='border-2 border-purple rounded-full text-purple bg-white p-3 hover:border-purpleDark hover:text-purpleDark'
						onClick={() => {
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
			<h2 className='text-purple'>Que la course commence !</h2>
			<p className='text-sm text-black/50 italic mb-10'>Cliquez sur le nom du joueur qui a terminé la manche</p>

			<CardsPlayer onClick={props.onClick}
									 arrivedPlayers={{arrivedPlayers, setArrivedPlayers}}
									 round={{round, setRound}}
									 difficulty={{difficulty, setDifficulty}}
			/>
			<p className='text-purple text-start ml-5 mb-10 font-bold'>{`Manche ${round} :`}</p>
			<p>Difficulté de la manche : {difficulty}</p>
			<input
				type='range'
				min='1'
				max='10'
				defaultValue={round}
				onChange={(e) => setDifficulty(parseInt(e.target.value))}/>
			<ScoreTable arrivedPlayers={{arrivedPlayers, setArrivedPlayers}}
									round={{round, setRound}}
									count={{count, setCount}}
			/>
		</div>
	)
}

export default Game;