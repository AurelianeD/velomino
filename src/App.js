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
  console.log(props);

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
function App() {
  const [name,setName] = useState("");
  const [list,setList] = useState([]);

  return (
    <div className="App">
      <div className="logo"></div>
      <h1>Que la course commence !</h1>
      { list.length < 5 ? <AddPlayer name={name} setName={setName} setList={setList} /> : null}
      <PlayerList setList={setList} list={list} />
      <button>Commencer la partie</button>
    </div>
  )
}

export default App;
