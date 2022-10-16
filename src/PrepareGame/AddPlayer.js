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
		<>
			<div className='flex gap-5 mb-10 justify-center content-center'>
				<input className=' py-2 pl-4 pr-2 rounded-full bg-white placeholder-gray-400 focus:outline-purpleDark'
							 type="text"
							 name="name"
							 placeholder="Entrez votre nom"
							 value={name}
							 onChange={(e) => setName(e.target.value)}/>
				<button className='bg-purple rounded-full text-white py-1 px-4 text-base'
								onClick={addPlayer}>
					+
				</button>
			</div>
		</>
	)
}

export default AddPlayer;