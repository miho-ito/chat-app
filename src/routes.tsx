import { Global } from "@emotion/core";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ChatListPage from "./pages/chat-list-page";
import ChatRoomPage from "./pages/chat-room-page";
import global from "./styles/global";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Global styles={global} />
      <Switch>
        <Route expact path="/room" component={ChatRoomPage} />
        <Route expact path="/" component={ChatListPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
