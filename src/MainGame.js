import {useContext} from "react";
import {PlayerListContext} from "./provider/PlayerListProvider";
import {GameInformationsContext} from "./provider/GameInformationsProvider";
import {NavigationContext} from "./provider/NavigationProvider";
import PrepareGame from "./PrepareGame/PrepareGame";
import Game from "./Game/Game";


function MainGame() {
	const {showContent, setShowContent} = useContext(NavigationContext);
	const {playerList, setPlayerList} = useContext(PlayerListContext);
	const {
		gamePreferences,
		setGamePreferences,
		setArrivedPlayers,
		setRound,
		setCount,
		setDifficulty,
		setScoreTable,
	} = useContext(GameInformationsContext);

	function setUpScoreTable(numberOfRound, playerList) {
		let scoreTable = [];
		const score = 0;
		const playerListCopy = playerList.map(player => {
			return {name: player.name, score}
		});
		for (let i = 0; i < numberOfRound; i++) {
			scoreTable.push(playerListCopy);
		}
		setScoreTable(scoreTable);
	}

	const beginGame = () => {
		if (playerList.length > 1) {
			setShowContent(false);
			setUpScoreTable(gamePreferences.numberOfRound, playerList);
		} else {
			alert('Veuillez ajouter au minimum deux joueur');
		}
	}

	const resetGame = () => {
		setPlayerList([]);
		setGamePreferences([]);
		setShowContent(true);
		setArrivedPlayers([]);
		setRound(1);
		setCount(0);
		setDifficulty(1);
	}


	return (
			<>
				<div className="static flex flex-col gap-4 bg-sand text-center max-w-full max-w-full py-10 px-3">
					<div className='flex flex-row justify-center gap-4'>
						<h1 className='font-bold text-5xl mb-10 text-center'>Vélonimo</h1>
						<button onClick={resetGame}>Reset Game</button>
					</div>
					{
						showContent ?
								<>
									<h2 className='text-purple'>Les équipes se mettent en place...</h2>
									<PrepareGame/>
									<div className='
									absolute
									bottom-10
									left-0
									right-0
									mx-auto
									w-fit'
									>
										<button
												className='
										bg-purple
										rounded-full
										text-white
										p-3
										hover:bg-purpleDark'
												onClick={beginGame}>
											Commencer la partie
										</button>
									</div>

								</>
								:
								<>
									<Game setShowContent={setShowContent}/>
								</>
					}
				</div>
			</>
	)
}

export default MainGame;
