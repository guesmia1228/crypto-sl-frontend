import { createContext, useState } from "react";

export const MessageContext = createContext({
	infoMessage: undefined,
	errorMessage: undefined,
	setInfoMessage: () => {alert("Init")},
	setErrorMessage: () => {},
});

export function MessageContextProvider({children}) {
	const [infoMessage, setInfoMessage] = useState(undefined);
	const [errorMessage, setErrorMessage] = useState(undefined);

	function clearMessages() {
		setInfoMessage(undefined);
		setErrorMessage(undefined);
	}

	return (
		<MessageContext.Provider
			value={{
				infoMessage: infoMessage,
				errorMessage: errorMessage,
				setInfoMessage: setInfoMessage,
				setErrorMessage: setErrorMessage,
				clearMessages: clearMessages,
			}}
		>
			{children}
		</MessageContext.Provider>
	);
}