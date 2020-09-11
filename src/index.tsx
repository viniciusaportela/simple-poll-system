import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import "./global.css";

import SeeAll from "./pages/SeeAll/";
import CreateEdit from "./pages/CreateEdit/";
import Vote from "./pages/Vote/";
import _404 from "./pages/_404/";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={SeeAll} />
        <Route path={["/create", "/edit/:poll"]} component={CreateEdit} />
        <Route path="/vote/:poll" component={Vote} />
        <Route component={_404} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
