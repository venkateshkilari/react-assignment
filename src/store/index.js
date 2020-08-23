import React,{ useReducer} from "react";
import CONSTANTS from "../constants";

const Store = React.createContext({});
const {Provider} = Store;

const StateReducer = (state, action)=>{
 let newState = state;
   switch(action.type){
     case "user":
        newState = {...state, ...{ user: action.payload}}
      break;
      default:
   }
   sessionStorage.setItem(CONSTANTS.SESSION_KEY, JSON.stringify(newState));
   return newState;
}

const GetInitialState = ()=>{
    return JSON.parse(sessionStorage.getItem(CONSTANTS.SESSION_KEY))||{};
}

const StateProvider = ({children}) =>{
    const [state, dispatch] = useReducer(StateReducer, GetInitialState());
    return <Provider value={{state,  dispatch}}>
        {children}
    </Provider>

}

export {StateProvider, Store}
