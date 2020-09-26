import React from "react";
import ChatList from "../components/chat-list";
import styled from "styled-components";
import Button from "../components/button";
import CreateChatRoomModal from "../components/create-chat-room-modal";
import { RouteComponentProps, withRouter } from "react-router";
import { Room } from "../types/store";
import * as H from "history";
import { connectWebSocket, createRoom, getRoomsList } from "../store/actions";
import { ApplicationState } from "../store";
import { connect } from "react-redux";

interface ChatListPageProps extends RouteComponentProps {
  rooms: Room[];
  history: H.History;
  getRoomsList: typeof getRoomsList;
  connectWebSocket: typeof connectWebSocket;
  createRoom: typeof createRoom;
}

interface ChatListPageState {
  isCreateChatRoomModalShow: boolean;
  chatRoomName: string;
}

class ChatListPage extends React.Component<
  ChatListPageProps,
  ChatListPageState
> {
  constructor(props: ChatListPageProps) {
    super(props);
    this.state = {
      isCreateChatRoomModalShow: false,
      chatRoomName: "",
    };
  }
  //コンポーネントがマウントされた時の処理
  componentDidMount() {
    //websocketへの接続
    this.props.connectWebSocket();
    setTimeout(() => {
      //チャットルーム一覧の取得
      this.props.getRoomsList();
    }, 1000);
  }
  //チャットルーム作成モーダル表示処理
  displayCreateChatroomModal(): void {
    this.setState({ isCreateChatRoomModalShow: true });
  }
  //チャットルーム作成処理
  createChatRoom(): void {
    if (this.state.chatRoomName) {
      this.props.createRoom({
        roomName: this.state.chatRoomName,
      });
    }
    this.setState({ isCreateChatRoomModalShow: false });
  }

  //チャットルーム名取得処理
  getChatRoomName(e: React.FormEvent<HTMLDivElement>): void {
    const text: string | null = e.currentTarget.textContent;
    this.setState({
      chatRoomName: text ? text : "",
    });
  }

  //チャットルーム名クリア処理
  clearChatRoomName(e: React.FormEvent<HTMLDivElement>): void {
    // チャットルーム名⼊⼒欄からフォーカスアウトした場合クリア
    e.currentTarget.textContent = "";
  }

  render() {
    return (
      <ChatListPageStyle>
        <div className="title">
          <div className="chatRoomList">チャットルーム一覧</div>
          <div>
            <Button
              name="チャットルームを作成"
              onClick={() => {
                this.displayCreateChatroomModal();
              }}
              primary
            />
          </div>
        </div>

        <ChatList data={this.props.rooms} />

        <CreateChatRoomModal
          onClickButton={() => this.createChatRoom()}
          onBlurText={(e) => {
            this.clearChatRoomName(e);
          }}
          onInputText={(e) => {
            this.getChatRoomName(e);
          }}
          isShow={this.state.isCreateChatRoomModalShow}
        />
      </ChatListPageStyle>
    );
  }
}
const mapStateToProps = ({ app }: ApplicationState) => ({
  rooms: app.rooms,
});
const mapDispatchToProps = {
  getRoomsList,
  connectWebSocket,
  createRoom,
};

const ChatListPageStyle = styled.div`
  padding: 20px;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  .chatRoomList {
    font-weight: bold;
    font-size: 20px;
  }
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChatListPage));
