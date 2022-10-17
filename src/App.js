import {useState} from "react";
import PlayerListProvider from "./provider/PlayerListProvider";
import PrepareGame from "./PrepareGame/PrepareGame";
import Game from "./Game/Game";


function App() {
	const [showContent, setShowContent] = useState(true);
	const show = () => setShowContent(false);


	return (
		<>
			<PlayerListProvider>
				<div className="static flex flex-col gap-4 bg-sand text-center w-screen h-screen pt-10 px-3">
					<div className=''>
						<h1 className='font-bold text-5xl mb-10'>Vélonimo</h1>
						<h2
							className='text-purple'>
							{showContent ?
								'Les équipes se mettent en place...'
								: 'Que le course commence !'}
						</h2>
					</div>
					{
						showContent ?
							<>
								<PrepareGame/>

							</>
							:
							<>
								<Game onClick={show} setShowContent={setShowContent}/>
							</>
					}
				</div>
				<div className='
					absolute
						bottom-10
						left-0
						right-0
						mx-auto
						w-fit'>
					<button
						className='
										bg-purple
										rounded-full
										text-white
										py-2
										px-2
										hover:bg-purpleDark'
						onClick={show}>
						Commencer la partie
					</button>
				</div>
			</PlayerListProvider>
		</>
	)
}

export default App;
