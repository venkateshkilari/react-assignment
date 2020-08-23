import Axios from "axios";
import {GetURL, GetToken} from "./common";
import CONSTANTS from "../constants"

export const GetAllStories = async()=>{
  try{
      return (await Axios.get(GetURL(CONSTANTS.STORY_URL), { headers:{"Content-Type":"application/json","Authorization": GetToken()} })).data
  }
  catch(error){ console.log(error); throw error;}
 
}


export const CreateStory = async(data)=>{
    try{
        return (await Axios.post(GetURL(CONSTANTS.STORY_URL),JSON.stringify(data), { headers:{"Content-Type":"application/json","Authorization": GetToken()} })).data
    }
    catch(error){ console.log(error); throw error;}
   
}

export const UpdateStoryStatus = async(id, status)=>{
    try{
        return (await Axios.put(GetURL(CONSTANTS.STORY_URL)+`/${id}/${status}`,{}, { headers:{"Content-Type":"application/json","Authorization": GetToken()} })).data
    }
    catch(error){ console.log(error); throw error;}
   
}