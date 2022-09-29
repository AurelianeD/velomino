import {useState} from "react";
import PlayerListProvider from "./provider/PlayerListProvider";
import PrepareGame from "./PrepareGame/PrepareGame";
import Game from "./Game/Game";


function App() {
	const [showContent, setShowContent] = useState(true);
	const show = () => setShowContent(false);


	return (
		<div className="bg-sand grid justify-center content-center text-center w-screen h-screen">
			<PlayerListProvider>
				<h1 className='mt-3 font-bold text-5xl'>Vélonimo</h1>
				{
					showContent ?
						<div>
							<h2 className='text-purple pb-5'>Les équipes se mettent en place...</h2>
							<div className='pb-20 px-40'>
								<PrepareGame onClick={show}/>
							</div>
						</div> :
						<div>

							<h2 className='text-purple pb-5'>Que la course commence !</h2>
							<div>
								<Game onClick={show} setShowContent={setShowContent}/>
							</div>
						</div>
				}
			</PlayerListProvider>
		</div>
	)
}

export default App;
