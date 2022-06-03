import './App.css';
import { useState } from 'react';

function AddPlayer(props) {
  const addPlayer = () => {
    if (props.name !== "") {
      props.setList((list) => [...list, props.name])
      props.setName("")
    }
  }

  return <div>
    <input type="text" name="name" placeholder="Name" value={props.name} onChange={(e)=>props.setName(e.target.value)} />
    <button onClick={addPlayer}>Ajouter un joueur</button>
  </div>
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


function Hide () {
  const [showContent, setShowContent] = useState(false);
  const onClick = () => setShowContent(true);
  const [list] = useState([]);

  return (
    <div>
      <button onClick={() => { onClick(); }}>Commencer la partie</button>
      { showContent ? <div><AddPlayer /><PlayerList /></div> : <CardsPlayer list={list}/> }
    </div>
  )
}

function CardsPlayer (props) {
  console.log(props.list);
  return (
    <div>
      {
        props.list.map((a, index) =>
          <div key={index} className="center">
            <p>{a}</p>
          </div>)
      }
    </div>
  )
}



function App() {
  const [name,setName] = useState("");
  const [list,setList] = useState([]);

  return (
    <div className="App">
      <div className="logo"></div>
      <h1>Vélonimo</h1>
      { list.length < 5 ? <AddPlayer name={name} setName={setName} setList={setList} /> : null}
      <PlayerList setList={setList} list={list} />
      <Hide list={list} />
    </div>
  )
}

export default App;
