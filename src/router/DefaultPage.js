import React, { useEffect, useContext } from 'react';
import {useHistory} from 'react-router-dom';
import {Store} from "../store";

export default function(Component){
  return function(){
     const history = useHistory();
      const {state} = useContext(Store);
      useEffect(()=>{
       if(state && state.user && state.user.token ){
        history.push("/stories");
       }
      },[])    
    
    
    return <Component ></Component>
  }
    
}