import PlayerListProvider from "./provider/PlayerListProvider";
import GameInformationsProvider from "./provider/GameInformationsProvider";
import NavigationProvider from "./provider/NavigationProvider";
import MainGame from "./MainGame";


function App() {

	return (
		<>
			<PlayerListProvider>
				<GameInformationsProvider>
					<NavigationProvider>
						<MainGame/>
					</NavigationProvider>
				</GameInformationsProvider>
			</PlayerListProvider>
		</>
	)
}

export default App;
