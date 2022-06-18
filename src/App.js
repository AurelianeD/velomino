import './App.css';
import {createContext, useContext, useState, useEffect} from "react";
import {isDisabled} from "@testing-library/user-event/dist/utils";

const PlayerListContext = createContext([undefined]);

// Variable local pour stocker la liste des joueurs
const LOCAL_STORAGE_KEY = "player-list";

// Provider qui permet d'acceder à la liste des joueurs dans tous les components sans les passer dans des props
function PlayerListProvider ({ children }) {

  const [playerList, setPlayerList] = useState([]);

  //Stocker la liste des joueurs dans variable local LOCAL_STORAGE_KEY

  useEffect(() => {
    const storagePlayerList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storagePlayerList) {
      setPlayerList(storagePlayerList);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(playerList));
  }, [playerList])

  return (
    <PlayerListContext.Provider value={{playerList, setPlayerList}}>
        {children}
    </PlayerListContext.Provider>
  )
}

function AddPlayer(props) {

  const [name, setName] = useState("");
  const {playerList, setPlayerList}  = useContext(PlayerListContext);

  const addPlayer = () => {
    if (name !== "") {
      setPlayerList((list) => [...list, {name, score: 0}])
      setName("")
    }

  }
  return(
    <div>
      <input type="text" name="name" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
      <button onClick={addPlayer}>Ajouter un joueur</button>
    </div>
  )

}
function PlayerList() {
  const {playerList, setPlayerList}  = useContext(PlayerListContext);



  // Supprimer un joueur de la liste

  const deleteName = (index) => {
    const newList = playerList;
    newList.splice(index,1);
    setPlayerList((list) => [...newList]);
  }

  return (
    <div>
      {
        playerList.map((player, index)=>
          <div key={index} className="center">
            <div className="flex">
              <span>{player.name}</span>
              <button onClick={()=>deleteName(index)}>x</button>
            </div>
          </div>)
      }
    </div>
  )



}
function PrepareGame(props) {
  const {playerList, setPlayerList}  = useContext(PlayerListContext);


  return (
    <>
      { playerList.length < 5 ? <AddPlayer /> : null}
      <PlayerList />
      <button onClick={() => { props.onClick(); }}>Commencer la partie</button>
    </>  );
}


function Game(props) {
  const [arrivedPlayers, setArrivedPlayers] = useState([]);
  const[round, setRound] = useState(2);


  return (
    <>
      <CardsPlayer onClick={props.onClick} arrivedPlayers={{arrivedPlayers, setArrivedPlayers}} round={{round, setRound}}/>
      <ScoreTable arrivedPlayers={{arrivedPlayers, setArrivedPlayers}} round={{round, setRound}}/>
    </>
  );
}

function CardsPlayer(props) {
  const {arrivedPlayers, setArrivedPlayers} = props.arrivedPlayers
  const {playerList, setPlayerList}  = useContext(PlayerListContext);


  //cette fonction ajoute l'index du joueur dans une liste par ordre d'arrivé
  function FinalList(index) {
    const playerAtIndex = playerList[index]
    playerAtIndex.score += ((playerList.length - arrivedPlayers.length) * props.round.round)

    setArrivedPlayers(function index (arrivedPlayerList) {return [...arrivedPlayerList, playerAtIndex]})


    setPlayerList(function score(playerScore) {
      playerScore[index] = playerAtIndex
      return [...playerScore]
    })

    }


  return (
      <>
        {
          playerList.map(
            (player, index) =>
            <div key={index} className="center">
              <button disabled={arrivedPlayers.indexOf(player) !== -1}
                      onClick={() =>
                      {FinalList(index);
                        props.onClick();
                      }
              }
              >
                {player.name}
              </button>
            </div>
          )
        }
      </>
  )
}

function ScoreTable (props) {
  const {arrivedPlayers, setArrivedPlayers} = props.arrivedPlayers;

  function incrementRound () {
    props.round.setRound(function round(round) {
    return (
      props.round.round + 1
    )
    })
  }

  console.log(props.round.round);
  return (
    <div>
      {
        arrivedPlayers.map((player, index)=>
          <div key={index} className="center">
            <div className="flex">
              <span>{player.name}</span>
              <span>{player.score}</span>
            </div>
            <button onClick={incrementRound}>Terminer la manche</button>
          </div>)
      }
    </div>
  )
}


function App() {
  const [showContent, setShowContent] = useState(true);
  const onClick = () => setShowContent(false);

  return (
    <div className="App">
      <PlayerListProvider>
        <h1>Vélonimo</h1>

        { showContent ? <PrepareGame onClick={onClick} />:  <Game onClick={onClick} showContent={showContent} />}
      </PlayerListProvider>
    </div>
  )
}

export default App;
