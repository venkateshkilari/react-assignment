import CONSTANTS from "../constants";

export const BackEndAppURL = process.env.REACT_APP_BACKEND_APP_URL;

export const GetURL = function(releativeURL){
    return `${BackEndAppURL}${releativeURL}`
}

export const GetToken = function(){
    try{
    let userData = JSON.parse(sessionStorage.getItem(CONSTANTS.SESSION_KEY)||{});
    if(userData && userData.user && userData.user.token)
      return userData.user.token;
    else
      return "";
    }
    catch{ return "";}
}