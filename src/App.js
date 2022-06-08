import './App.css';
import {createContext, useContext, useState} from "react";

const PlayerListContext = createContext(undefined);

function PlayerListProvider ({ children }) {

  const [playerList, setPlayerList] = useState([]);

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
    const newList = playerList.splice(index,1);
    setPlayerList((list) => [...newList]);

  }
  return (
    <div>
      {
        playerList.map((a, index)=>
          <div key={index} className="center">
            <div className="flex">
              <span>{a}</span>
              <button onClick={()=>deleteName(index)}>x</button>
            </div>
          </div>)
      }
    </div>
  )



}
function CardsPlayer (props) {
  const {playerList, setPlayerList}  = useContext(PlayerListContext);

  const [round, setRound] = useState(1);
  const [roundList, setRoundList] = useState("");
  const finalList = () => setRoundList(props.name);

  const [playerScore, setPlayerScore] = useState(0);
  const score = () => setPlayerScore(playerList.length-1*round);

  console.log(playerScore);
  console.log(roundList);
  return (
    <PlayerListProvider>
      <div>
        {
          playerList.map((a, index) =>
            <div key={index} className="center">
              <button onClick={() => {score(); finalList()}}>{a}</button>
            </div>)
        }
      </div>
    </PlayerListProvider>
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
  return (
    <div>
      <CardsPlayer />
    </div>
  );




}
function App() {
  const [showContent, setShowContent] = useState(true);
  const onClick = () => setShowContent(false);

  return (
    <div className="App">
      <PlayerListProvider>
        <h1>Vélonimo</h1>

        { showContent ? <PrepareGame onClick={onClick} />:  <Game />}
      </PlayerListProvider>
    </div>
  )
}

export default App;
