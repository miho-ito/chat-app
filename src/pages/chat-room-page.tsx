import React from "react";
import UserList, { UserItem } from "../components/user-list";
import MessageList, { MessageItem } from "../components/message-list";
import styled from "styled-components";
import Button from "../components/button";
import JoinChatRoom from "../components/join-chat-room";
import CreateMessage from "../components/create-message";
import { RouteComponentProps, withRouter } from "react-router";
import * as H from "history";
import {
  clearCurrentRoom,
  connectWebSocket,
  getCurrentRoom,
  joinRoom,
  leaveRoom,
  sendMessage,
  setCurrentRoomId,
} from "../store/actions";
import { ApplicationState } from "../store";
import { connect } from "react-redux";

interface ChatRoomPageProps extends RouteComponentProps {
  currentRoomId: string;
  currentRoomName: string;
  currentRoomUsers: UserItem[];
  currentRoomLogs: MessageItem[];
  history: H.History;
  connectWebSocket: typeof connectWebSocket;
  getCurrentRoom: typeof getCurrentRoom;
  joinRoom: typeof joinRoom;
  sendMessage: typeof sendMessage;
  clearCurrentRoom: typeof clearCurrentRoom;
  setCurrentRoomId: typeof setCurrentRoomId;
  leaveRoom: typeof leaveRoom;
}
interface ChatRoomPageState {
  //入室フラグ
  isJoin: boolean;
  currentRoomId: string;
  text: string;
  userName: string;
}

class ChatRoomPage extends React.Component<
  ChatRoomPageProps,
  ChatRoomPageState
> {
  constructor(props: ChatRoomPageProps) {
    super(props);
    this.state = {
      isJoin: false,
      currentRoomId: this.getCurrentRoomId(),
      text: "",
      userName: "",
    };
  }

  //コンポーネントがマウントされた際の処理
  componentDidMount() {
    if (!this.state.currentRoomId) {
      this.props.history.push("/");
    } else {
      this.props.setCurrentRoomId(this.state.currentRoomId);
    }
    //WebSocketへの接続
    this.props.connectWebSocket();
    setTimeout(() => {
      this.getCurrentRoomInfo();
    }, 1000);
  }

  getCurrentRoomId(): string {
    const parameters: string = window.location.search;
    const roomIdParam: string[] = parameters
      .split("&")
      .filter((p) => p.indexOf("roomId") > 0);
    if (roomIdParam.length === 1) {
      const roomId = roomIdParam[0].split("=")[1];
      return roomId;
    }

    return "";
  }
  getCurrentRoomInfo(): void {
    this.props.getCurrentRoom({
      roomId: this.state.currentRoomId,
    });
  }
  onClickJoin(): void {
    if (this.state.text) {
      this.props.joinRoom({
        roomId: this.state.currentRoomId,
        userName: this.state.text,
      });
      this.setState({
        isJoin: true,
        userName: this.state.text,
        text: "",
      });
    }
  }

  onClickSending(): void {
    if (this.state.text) {
      this.props.sendMessage({
        roomId: this.state.currentRoomId,
        userName: this.state.userName,
        message: this.state.text,
      });
      this.setState({
        text: "",
      });
    }
  }

  onInputText(e: React.FormEvent<HTMLDivElement>): void {
    const text: string | null = e.currentTarget.textContent;
    this.setState({
      text: text ? text : "",
    });
  }

  onBlurText(e: React.FormEvent<HTMLDivElement>): void {
    e.currentTarget.textContent = "";
  }

  backToRoomList(): void {
    this.props.clearCurrentRoom();
    this.props.leaveRoom();
    this.props.history.push("/");
  }

  render() {
    return (
      <ChatRoomPageStyle isJoin={this.state.isJoin}>
        <div className="menu">
          <div className="chatRoomName">{this.props.currentRoomName}</div>
          <div className="userList">
            <UserList users={this.props.currentRoomUsers} />
          </div>
          <div className="button">
            <Button
              name="戻る"
              onClick={() => {
                this.backToRoomList();
              }}
            />
          </div>
        </div>
        <div className="message">
          <MessageList messages={this.props.currentRoomLogs} />
        </div>
        <div className="createMessage">
          <div className="notJoin">
            <JoinChatRoom
              onInputText={(e) => {
                this.onInputText(e);
              }}
              onBlurText={(e) => {
                this.onBlurText(e);
              }}
              onClickButton={() => {
                this.onClickJoin();
              }}
            />
          </div>
          <div className="join">
            <CreateMessage
              onInputText={(e) => {
                this.onInputText(e);
              }}
              onBlurText={(e) => {
                this.onBlurText(e);
              }}
              onClickButton={() => {
                this.onClickSending();
              }}
            />
          </div>
        </div>
      </ChatRoomPageStyle>
    );
  }
}
const mapStateToProps = ({ app }: ApplicationState) => ({
  currentRoomId: app.currentRoom.id,
  currentRoomName: app.currentRoom.name,
  currentRoomUsers: app.currentRoom.users,
  currentRoomLogs: app.currentRoom.logs,
});

const mapDispatchToProps = {
  getCurrentRoom,
  connectWebSocket,
  joinRoom,
  sendMessage,
  clearCurrentRoom,
  setCurrentRoomId,
  leaveRoom,
};

const ChatRoomPageStyle = styled.div<{ isJoin: boolean }>`
  display: grid;
  grid-template-rows: 1fr 80px;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
  box-sizing: border-box;

  .menu {
    background: #27224d;
    grid-row: 1 / 3;
    grid-column: 1 / 2;
    display: grid;
    grid-template-rows: 80px 1fr 80px;
    grid-template-columns: 250px;

    .chatRoomName {
      font-size: 20px;
      color: #ffffff;
      font-weight: bold;
      grid-row: 1 / 2;
      grid-column: 1 / 2;
      padding: 10px;
    }
    .userList {
      grid-row: 2 / 3;
      grid-column: 1 / 2;
      padding: 10px;
    }
    .button {
      grid-row: 3 / 4;
      grid-column: 1 / 2;
      text-align: center;
    }
  }
  > .message {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    position: relative;
    padding: 10px;
  }
  .createMessage {
    border-top: 1px solid #d3d3d3;
    grid-row: 2 / 3;
    grid-column: 2 / 3;

    .notJoin {
      display: ${(props) => (!props.isJoin ? "block" : "none")};
    }
    .join {
      display: ${(props) => (props.isJoin ? "block" : "none")};
    }
  }
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChatRoomPage));
