import React from "react";
import styled from "styled-components";
import Button from "./button";
import InputText from "./input-text";

interface JoinChatRoomProps {
  onInputText: (e: React.FormEvent<HTMLDivElement>) => void;
  onBlurText: (e: React.FormEvent<HTMLDivElement>) => void;
  onClickButton: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

class JoinChatRoom extends React.Component<JoinChatRoomProps> {
  render() {
    return (
      <JoinChatRoomStyle>
        <div className="input">
          <InputText
            placeholder="ユーザー名"
            onInput={this.props.onInputText}
            onBlur={this.props.onBlurText}
          />
        </div>
        <div className="button">
          <Button name="入室" onClick={this.props.onClickButton} primary />
        </div>
      </JoinChatRoomStyle>
    );
  }
}
const JoinChatRoomStyle = styled.div`
  display: grid;
  grid-template-rows: 80px;
  grid-template-columns: 1fr 80px;
  align-items: center;

  .input {
    padding: 10px;
  }
`;

export default JoinChatRoom;
