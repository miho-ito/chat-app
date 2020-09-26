import React from "react";
import styled from "styled-components";
import Message from "./message";

export interface MessageItem {
  logId: number;
  userName: string;
  time: string;
  message: string;
}

interface MessageListProps {
  messages: MessageItem[];
}
class MessageList extends React.Component<MessageListProps> {
  render() {
    return (
      <MessageListStyle>
        {this.props.messages.map((item: MessageItem) => {
          return (
            <Message
              userName={item.userName}
              time={item.time}
              message={item.message}
              key={item.logId}
            />
          );
        })}
      </MessageListStyle>
    );
  }
}
const MessageListStyle = styled.div`
    position:absolute;
    bottom:0;
  }
`;

export default MessageList;
