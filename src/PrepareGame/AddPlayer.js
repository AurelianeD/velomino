import {useContext, useState} from "react";
import {PlayerListContext} from "../provider/PlayerListProvider";

function AddPlayer() {

	const [name, setName] = useState("");
	const {playerList, setPlayerList} = useContext(PlayerListContext);

	const addPlayer = () => {
		if (name !== "") {
			setPlayerList((list) => [...list, {name, score: 0}])
			setName("")
		}

	}
	return (
		<div className=''>
			<div className='flex gap-5 pb-5 justify-center content-center'>
				<input className=' py-4 px-2.5 rounded-xl bg-white placeholder-black' type="text" name="name"
							 placeholder="Entrez votre nom"
							 value={name}
							 onChange={(e) => setName(e.target.value)}/>
				<button className='bg-purple rounded-xl text-white py-4 px-2.5' onClick={addPlayer}>Ajouter un joueur</button>
			</div>
		</div>
	)
}

export default AddPlayer;