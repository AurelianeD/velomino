import './App.css';
import { createContext, useState } from "react";


function AddPlayer(props) {
  const [name,setName] = useState("");

  const addPlayer = () => {
    if (name !== "") {
      props.setList((list) => [...list, name])
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

function PlayerList(props) {
  const deleteName = (index) => {
    const newList = props.list;
    newList.splice(index,1);
    props.setList((newList) => [...newList])
  }

  return (
    <div>
      {
        props.list.map((a, index)=>
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
  const [manche, setManche] = useState(1);
  const [playerScore, setPlayerScore] = useState(0);
  const score = () => setPlayerScore(props.list.length-1*manche);

  console.log(playerScore);

  return (
    <div>
      {
        props.list.map((a, index) =>
          <div key={index} className="center">
            <button onClick={() => {score(); }}>{a}</button>
          </div>)
      }
    </div>
  )
}



function PrepareGame(props) {
  return (
    <div>
      { props.list.length < 5 ? <AddPlayer setList={props.setList} /> : null}
      <PlayerList setList={props.setList} list={props.list} />
      <button onClick={() => { props.onClick(); }}>Commencer la partie</button>
    </div>  );
}






function Game(props) {
  return (
    <div>
      <CardsPlayer list={props.list}/>
    </div>
  );
}




function App() {
  const [showContent, setShowContent] = useState(true);
  const onClick = () => setShowContent(false);
  const [list, setList] = useState([]);

  return (
    <div className="App">
      <h1>Vélonimo</h1>

      { showContent ? <PrepareGame onClick={onClick} setList={setList} list={list}/> :  <Game list={list} />}
    </div>
  )
}

export default App;
