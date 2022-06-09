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
    const newList = playerList.splice(index,0);
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
  const [roundList, setRoundList] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);

  return (
    <>
      <CardsPlayer roundList={roundList} setRoundList={setRoundList} playerScore={playerScore} setPlayerScore={setPlayerScore} onClick={props.onClick}/>
      {props.showContent ? null : <ScoreTable roundList={roundList} setRoundList={setRoundList} playerScore={playerScore} setPlayerScore={setPlayerScore}/> }
    </>
  );
}

function CardsPlayer (props) {
  const {playerList, setPlayerList}  = useContext(PlayerListContext);

  const [roundCounter, setRoundCounter] = useState(1);

  const finalList = (index) => {
    // TODO: Apprendre a acceder a un element d'une liste, comme ceci
    const playerAtIndex = playerList[index]
    // Not a function ici vvvvv
    const newList = playerList(index,0)
    // TODO: Ajouter le joueur qu'on vient de cliquer dans la liste d'arrivée
    // Actuellement tu remplace la liste de joueurs par newList, est-ce que c'est vraiment ce que tu veux faire?
    setPlayerList((list) => [...newList])
  }

  // Tu as plus qu'un seul joueur, tu ne peut pas y arriver comme ça.
  const score = () => props.setPlayerScore((playerList.length-1)*roundCounter);

  return (
      <>
        {
          // Tu peux arreter d'utiliser `a` comme non de variable ?
          playerList.map((a, index) =>
            <div key={index} className="center">
              <button onClick={() => {score(); finalList(); props.onClick();}}>{a}</button>
            </div>)
        }
      </>
  )
}

function ScoreTable (props) {
  return (
      <>
        {
          props.roundList.map((a, index) =>
            <div key={index} className="center">
              {/* Ta façon de faire une liste est éronée, tu est en train de créer `props.roundList.length` ul.
              Alors que tu souhaites avoir un ul et `props.roundList.length` li */}
              <ul>
                <li>
                  {a}
                </li>
              </ul>
            </div>
          )
        }
      </>
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
