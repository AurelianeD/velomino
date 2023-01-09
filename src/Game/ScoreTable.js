import {useContext} from "react";
import {PlayerListContext} from "../provider/PlayerListProvider";
import {GameInformationsContext} from "../provider/GameInformationsProvider";

function ScoreTable() {
	const {playerList} = useContext(PlayerListContext);
	const {
		arrivedPlayers,
		setArrivedPlayers,
		round,
		setRound,
		count,
		setCount,
		difficulty,
		setDifficulty
	} = useContext(GameInformationsContext);
	

	function nextRound() {
		setRound(round + 1)
		setArrivedPlayers([])
		setCount(count + 1)
		setDifficulty(difficulty + 1)
	}


	return (
		<>
			<div className='flex flex-col gap-4 justify-center items-center md:flex-row'>
				{
					arrivedPlayers.map((player, index) => {
						const firstArrivedPlayer = arrivedPlayers.indexOf(player) === 0;
						return (
							<div key={index}>
								{firstArrivedPlayer ?
									<div className="bg-white rounded-xl p-5 relative shadow-md">
										<img src={require("../assets/carrot.png")} alt="carrot"
												 className="absolute top-[-15px] right-[-15px] w-10"/>
										<p className="px-5 uppercase font font-bold text-xl">{player.name}</p>
										<p className='text-xl text-purple'>Score : {player.score}</p>
									</div>
									:
									<div className="bg-white rounded-xl p-5 relative shadow-md">
										<p className="px-5 uppercase font font-bold text-xl">{player.name}</p>
										<p className='text-xl text-purple'>Score : {player.score}</p>
									</div>}
							</div>
						)
					})
				}
			</div>
			<div className='my-10'>
				<button onClick={nextRound}
								disabled={playerList.length !== arrivedPlayers.length}
								className='bg-purple rounded-full text-white p-3 hover:bg-purpleDark'>
					Terminer la manche
				</button>
			</div>
		</>
	)
}

export default ScoreTable;