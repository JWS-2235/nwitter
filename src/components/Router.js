import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Navigation from "components/Navigation";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn, userObj }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch> 
                {isLoggedIn ? 
                    (
                        <>
                            <Route exact path="/">
                                <Home userObj={userObj}></Home>
                            </Route> 
                            <Route exact path="/profile">
                                <Profile></Profile>
                            </Route> 
                            <Redirect from="*" to="/" />
                        </>
                    ) : 
                    (
                        <>
                            <Route exact path="/">
                                <Auth></Auth>
                            </Route>
                            <Redirect from="*" to="/" />
                        </>
                    )
                 }
            </Switch>
        </Router>
    )
}

export default AppRouter;