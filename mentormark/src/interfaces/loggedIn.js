import { createContext, useReducer } from "react";

export const LoggedContext = createContext(null);
export const LoggedDispatchContext = createContext(null);

export function LoggedProvider({ children }) {
    const [logged, dispatch] = useReducer(
        loggedReducer,
        initialLogged
    );

    return (
        <LoggedContext.Provider value={logged}>
            <LoggedDispatchContext.Provider value={dispatch}>
                {children}
            </LoggedDispatchContext.Provider>
        </LoggedContext.Provider>
    )
}

function loggedReducer(logged, action) {
    switch (action.type) {
        case 'login': {
            return true
        }
        case 'logout': {
            return false
        }
        default: {
            throw Error('Unknown Action: ' + action.type)
        }
    }
}

const initialLogged = false;