import React, {useEffect} from 'react';
import '../../styles/styles.scss'

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Main from "../../pages/main";
import Header from "../header";
import Footer from "../footer/footer";
import Cart from "../../pages/cart";
import Article from "../../pages/article";

interface Props {
    getRooms: () => void,

}
function App({getRooms}: Props) {
    useEffect(()=>{

       getRooms()
    });



    return (
        <div className="app">
            <div className="app-container">
                <Router>
                    <Header />
                    <Switch>
                        <Route exact path={["/home", "/"]} >
                            <Main/>
                        </Route>
                        <Route path="/cart" component={Cart}/>
                        <Route path="/article/:id" component={Article}/>

                    </Switch>
                </Router>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
