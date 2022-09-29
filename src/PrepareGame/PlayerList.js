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
							<div className='p-20 rounded-full bg-purple mb-5'>
								<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
									<path fill="#FF0066"
												d="M47.3,-47.4C60.6,-33.9,70.5,-16.9,67.3,-3.1C64.2,10.7,48.1,21.4,34.7,35.6C21.4,49.8,10.7,67.6,-4.5,72.1C-19.7,76.6,-39.3,67.8,-53.7,53.6C-68.1,39.3,-77.1,19.7,-74.9,2.2C-72.6,-15.2,-59.1,-30.3,-44.7,-43.8C-30.3,-57.3,-15.2,-69.1,0.9,-70C16.9,-70.9,33.9,-60.9,47.3,-47.4Z"
												transform="translate(100 100)"/>
								</svg>
							</div>
							<p className='px-5 uppercase font font-bold text-xl'>{player.name}</p>
							<button
								className='px-2 shadow-md absolute top-0 right-0 	bg-purple rounded-full text-white hover:bg-purpleDark'

								onClick={() => deleteName(index)}>x
							</button>
						</div>
					</div>)
			}
		</div>
	)
}

export default PlayerList;