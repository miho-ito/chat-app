import React from "react";
import { Room } from "../types/store";
import ChatListItem from "./chat-list-item";

interface ChatListProps {
  data: Room[];
}

class ChatList extends React.Component<ChatListProps> {
  render() {
    return (
      <div>
        {this.props.data &&
          this.props.data.map((item: Room) => {
            return (
              <ChatListItem
                name={item.name}
                roomId={item.id}
                numberOfPeople={item.users.length}
                key={item.id}
              />
            );
          })}
      </div>
    );
  }
}

export default ChatList;
