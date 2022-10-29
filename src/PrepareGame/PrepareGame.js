import {useContext, useEffect, useState} from "react";
import {PlayerListContext} from "../provider/PlayerListProvider";
import {GamePreferenceContext} from "../provider/GamePreferenceProvider";
import AddPlayer from "./AddPlayer";
import PlayerList from "./PlayerList";

function PrepareGame() {
	const {playerList, setPlayerList} = useContext(PlayerListContext);
	const {gamePreference, setGamePreference} = useContext(GamePreferenceContext);
	const [showContent, setShowContent] = useState(false);
	const show = () => setShowContent(true);

	useEffect(() => {
		setGamePreference(
			{
				numberOfRound: 3,
			},
		)
	}, []);


	return (
		<div className=''>
			<div className='flex flex-row justify-center'>
				{playerList.length < 5 ? <AddPlayer/> : null}
				<button className='bg-white p-2 rounded-full' onClick={show}>Préference</button>
			</div>
			{
				showContent ?
					<div className='flex flex-row justify-center'>
						<p>Nombre de manches : </p>
						<input type='number'
									 placeholder='Nombre de manche'
									 onChange={(e) => setGamePreference({numberOfRound: parseInt(e.target.value)})}/>
					</div>
					: null
			}
			<PlayerList/>

		</div>);
}

export default PrepareGame;