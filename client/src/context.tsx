import { ReactNode, FC, createContext, useContext, useRef } from 'react';
import { io, Socket } from 'socket.io-client';


export type GameSocket = Socket;

export interface AppContextState {
    socket: GameSocket;
};

export const AppContext = createContext<AppContextState>({} as AppContextState);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: FC<{ children: ReactNode }> = (props) => {
    const socket = useRef<GameSocket>(io('http://localhost:8000', { autoConnect: false }));

    return (
        <AppContext.Provider value={{ socket: socket.current }}>
            { props.children }
        </AppContext.Provider>
    );
}
