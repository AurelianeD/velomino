import './App.css';
import {createContext, useContext, useState} from "react";
import {isDisabled} from "@testing-library/user-event/dist/utils";

const PlayerListContext = createContext(undefined);

function PlayerListProvider ({ children }) {

  const [playerList, setPlayerList] = useState(['toto', 'tata', 'tutu']);

  return (
    <PlayerListContext.Provider value={{playerList, setPlayerList}}>
        {children}
    </PlayerListContext.Provider>
  )
}

function AddPlayer() {

  const [name,setName] = useState("");
  const {playerList, setPlayerList}  = useContext(PlayerListContext);

  const addPlayer = () => {
    if (name !== "") {
      setPlayerList((list) => [...list, name])
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

  const deleteName = (index) => {
    const newList = playerList;
    newList.splice(index,1);
    setPlayerList((list) => [...newList]);
  }

  return (
    <div>
      {
        playerList.map((playerName, index)=>
          <div key={index} className="center">
            <div className="flex">
              <span>{playerName}</span>
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
  const [playerScore, setPlayerScore] = useState(0);
  const [arrivedPlayers, setArrivedPlayers] = useState([]);

  return (
    <>
      <CardsPlayer onClick={props.onClick} arrivedPlayers={{arrivedPlayers, setArrivedPlayers}}/>
      <ScoreTable arrivedPlayers={{arrivedPlayers, setArrivedPlayers}}/>
    </>
  );
}

function CardsPlayer(props) {
  const {playerList, setPlayerList}  = useContext(PlayerListContext);
  const {arrivedPlayers, setArrivedPlayers} = props.arrivedPlayers
  console.log(arrivedPlayers);

  //cette fonction ajoute l'index du joueur dans une liste par ordre d'arrivé
  function FinalList(index) {
    const playerAtIndex = playerList[index]
    setArrivedPlayers(function toto (list) {return [...list, playerAtIndex]})
  }


  return (
      <>
        {
          playerList.map((playerName, index) =>
            <div key={index} className="center">
              <button disabled={arrivedPlayers.indexOf(playerName) !== -1} onClick={() => {FinalList(index); props.onClick(); }}>{playerName}</button>
            </div>
          )
        }
      </>
  )
}

function ScoreTable (props) {
  const {arrivedPlayers, setArrivedPlayers} = props.arrivedPlayers

  return (
    <div>
      {
        arrivedPlayers.map((playerName, index)=>
          <div key={index} className="center">
            <div className="flex">
              <span>{playerName}</span>
            </div>
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
