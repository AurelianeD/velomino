import {useContext, useEffect, useState} from "react";
import {PlayerListContext} from "../provider/PlayerListProvider";
import {GameInformationsContext} from "../provider/GameInformationsProvider";
import AddPlayer from "./AddPlayer";
import PlayerList from "./PlayerList";

function PrepareGame() {
	const {playerList} = useContext(PlayerListContext);
	const {setGamePreferences} = useContext(GameInformationsContext);
	const [showContent, setShowContent] = useState(false);
	const show = () => setShowContent(!showContent);

	useEffect(() => {
		setGamePreferences(
				{
					numberOfRound: 3,
				},
		)
	}, []);


	return (
			<div className=''>
				<div className='flex flex-col justify-center'>
					{playerList.length < 5 ? <AddPlayer/> : null}
					<button className='underline' onClick={show}>Préference</button>
				</div>
				{
					showContent ?
							<div className='flex flex-row justify-center'>
								<p>Entrer le nombre de manches souhaité : </p>
								<input
										type='number'
										placeholder='Nombre de manches'
										onChange={(e) => setGamePreferences({numberOfRound: parseInt(e.target.value)})}
								/>
							</div>
							: null
				}
				<PlayerList/>

			</div>);
}

export default PrepareGame;