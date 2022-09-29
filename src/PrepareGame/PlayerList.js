import {useContext} from "react";
import {PlayerListContext} from "../provider/PlayerListProvider";

function PlayerList() {
	const {playerList, setPlayerList} = useContext(PlayerListContext);

	// Supprimer un joueur de la liste

	const deleteName = (index) => {
		const newList = playerList;
		newList.splice(index, 1);
		setPlayerList((list) => [...newList]);
	}

	return (
		<div className='grid grid-cols-5 gap-4 justify-center items-center'>
			{
				playerList.map((player, index) =>
					<div key={index}>
						<div className='bg-white rounded-xl p-5 relative '>
							<div className='p-20 rounded-full bg-purple mb-5'/>
							<p className='px-5 uppercase font font-bold text-xl'>{player.name}</p>
							<button className='px-2 shadow-md absolute top-0 right-0 	bg-purple rounded-full text-white'
											onClick={() => deleteName(index)}>x
							</button>
						</div>
					</div>)
			}
		</div>
	)
}

export default PlayerList;