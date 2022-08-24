import './App.css';
import {createContext, useContext, useState, useEffect, useCallback} from "react";

const PlayerListContext = createContext([undefined]);

// Provider qui permet d'acceder à la liste des joueurs dans tous les components sans les passer dans des props
function PlayerListProvider({children}) {

	const [playerList, setPlayerList] = useState([]);

	useEffect(() => {
		localStorage.setItem("playerList", JSON.stringify(playerList));
	}, [playerList]);

	const playerListStorage = useCallback(() => {
		JSON.parse(localStorage.getItem("playerList"));
		if (playerListStorage) {
			setPlayerList(playerListStorage);
		}
	}, [playerList]);


	return (
		<PlayerListContext.Provider value={{playerList, setPlayerList}}>
			{children}
		</PlayerListContext.Provider>
	)
}

function AddPlayer(props) {

	const [name, setName] = useState("");
	const {playerList, setPlayerList} = useContext(PlayerListContext);

	const addPlayer = () => {
		if (name !== "") {
			setPlayerList((list) => [...list, {name, score: 0}])
			setName("")
		}

	}
	return (
		<div>
			<input type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
			<button onClick={addPlayer}>Ajouter un joueur</button>
		</div>
	)

}

function PlayerList() {
	const {playerList, setPlayerList} = useContext(PlayerListContext);

	// Supprimer un joueur de la liste

	const deleteName = (index) => {
		const newList = playerList;
		newList.splice(index, 1);
		setPlayerList((list) => [...newList]);
	}

	return (
		<div>
			{
				playerList.map((player, index) =>
					<div key={index} className="center">
						<div className="flex">
							<span>{player.name}</span>
							<button onClick={() => deleteName(index)}>x</button>
						</div>
					</div>)
			}
		</div>
	)


}

function PrepareGame(props) {
	const {playerList, setPlayerList} = useContext(PlayerListContext);

	return (
		<>
			{playerList.length < 5 ? <AddPlayer/> : null}
			<PlayerList/>
			<button onClick={() => {
				props.onClick();
			}}>Commencer la partie
			</button>
		</>);
}


function Game(props) {
	const {playerList, setPlayerList} = useContext(PlayerListContext);
	const [arrivedPlayers, setArrivedPlayers] = useState([]);
	const [round, setRound] = useState(1);
	const [count, setCount] = useState(0);

	function compareNumbers(a, b) {
		return a - b;
	}

	if (count === 3) {
		return (
			<>
				{playerList.sort((compareNumbers, index, player) => {
						const hightScore = Math.max(...playerList.map(player => player.score));
						return (
							<div key={index} className="center">
								{hightScore === player.score ?
									<div className="flex">
										<img src={require("./assets/crown.png")} alt="carrot" className="carrot"/>
										<p>{player.name}</p>
										<p>{player.score}</p>
									</div>
									:
									<div className="flex">
										<p>{player.name}</p>
										<p>{player.score}</p>
									</div>}
							</div>
						)
					}
				)}
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
						<div key={index} className="center">
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
									<img src={require("./assets/carrot.png")} alt="carrot" className="carrot"/>
									<p>{player.name}</p>
									<p>{player.score}</p>
								</div>
								:
								<div className="flex">
									<p>{player.name}</p>
									<p>{player.score}</p>
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


function App() {
	const [showContent, setShowContent] = useState(true);
	const show = () => setShowContent(false);


	return (
		<div className="App">
			<PlayerListProvider>
				<h1>Vélonimo</h1>

				{
					showContent ?
						<PrepareGame onClick={show}/> :
						<Game onClick={show} setShowContent={setShowContent}/>
				}
			</PlayerListProvider>
		</div>
	)
}

export default App;
