import React from "react";
import  {BrowserRouter as Router,
    Switch,
    Route,} from "react-router-dom";
import Login from "../Login";
import Stories from "../Stories";
import DefaultPage from "./DefaultPage";
import AuthenticatePage from "./AuthenticatedPage"
const LoginComponent = DefaultPage(Login);
const StoriesComponent = AuthenticatePage(Stories);


export default  function (){
    
   return (
    <Router>
        <Switch>
        <Route exact path="/" >
        <LoginComponent/>
        </Route>
        <Route exact path="/Stories" >
           <StoriesComponent/>
        </Route>
        </Switch>
    </Router>)
}