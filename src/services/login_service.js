import Axios from "axios";
import {GetURL} from "./common";
import CONSTANTS from "../constants"

export const SignInUser = async(email,password,isAdmin)=>{
  try{
      return (await Axios.post(GetURL(CONSTANTS.SIGN_IN_URL),JSON.stringify({email:email, password:password, isAdmin:isAdmin}), { headers:{"Content-Type":"application/json"} })).data
  }
  catch(error){ console.log(error); throw error;}
 
}
