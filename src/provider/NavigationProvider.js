import useLocalStorage from "../hooks/useLocalStorage";
import {createContext} from "react";

export const NavigationContext = createContext([]);

function NavigationProvider({children}) {

	const [showContent, setShowContent] = useLocalStorage(['showContent'], true);


	return (
		<NavigationContext.Provider value={{showContent, setShowContent}}>
			{children}
		</NavigationContext.Provider>
	)
}

export default NavigationProvider;