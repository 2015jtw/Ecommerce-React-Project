import { useEffect, createContext, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocFromAuth } from "../utils/firebase/firebase.utils";

// the aCTUALY VALUE you want to acess
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,

});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {

    const {type, payload} = action;

    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return{
                ...state,
                currentUser: payload
            }

        default:
            throw new Error(`Unhandled type ${type} in the userReducer`);
    }

    return 
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({children}) => {
    // const [currentUser, setCurrentUser] = useState(null);
    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
    const {currentUser} = state; 

    const setCurrentUser = (user) => {
        dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user});
    }

    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user){
                createUserDocFromAuth(user);
            }
            setCurrentUser(user);
        })
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

// 