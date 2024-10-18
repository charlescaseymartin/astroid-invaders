import { ReactNode, FC, createContext, useContext, useReducer, useCallback } from 'react';
import { Socket } from 'socket.io-client';
import { contextReducer, ContextActionMap, ContextActions } from './reducer';


export type AppContextState = {
    socket: Socket;
    authToken: string;
};

export type Dispatcher = <T extends ContextActions['type'], P extends ContextActionMap[T]> (
    type: T,
    ...payload: P extends undefined ? [undefined?] : [P]
) => void;

export type AppContextInterface = readonly [AppContextState, Dispatcher];

export const AppContext = createContext<AppContextInterface>([{} as AppContextState, () => { }]);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: FC<{ children: ReactNode }> = (props) => {
    const [state, _dispatch] = useReducer(contextReducer, {} as AppContextState);

    const dispatch: Dispatcher = useCallback((type, ...payload) => {
        _dispatch({ type, payload: payload[0] } as ContextActions);
    }, []);

    return (
        <AppContext.Provider value={[state, dispatch]}>
            {props.children}
        </AppContext.Provider>
    );
}
