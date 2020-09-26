import React from "react";
import styled from "styled-components";
import Button from "./button";
import InputText from "./input-text";

interface CreateChatRoomModalProps {
  onInputText: (e: React.FormEvent<HTMLDivElement>) => void;
  onBlurText: (e: React.FormEvent<HTMLDivElement>) => void;
  onClickButton: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isShow: boolean;
}

class CreateChatRoomModal extends React.Component<CreateChatRoomModalProps> {
  render() {
    return (
      <CreateChatRoomModalStyle isShow={this.props.isShow}>
        <div className="modal">
          <div>
            <InputText
              placeholder="チャットルーム名"
              onInput={this.props.onInputText}
              onBlur={this.props.onBlurText}
            />
          </div>
          <div className="button">
            <Button name="作成" onClick={this.props.onClickButton} primary />
          </div>
        </div>
      </CreateChatRoomModalStyle>
    );
  }
}
const CreateChatRoomModalStyle = styled.div<{ isShow: boolean }>`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: rgba(0, 0, 0, 0.3);
  /* モーダルの表⽰∕⾮表⽰の切り替え */
  display: ${(props) => (props.isShow ? "flex" : "none")};
  align-items: center;
  justify-content: center;

  .modal {
    opacity: initial;
    background: rgba(255, 255, 255, 1);
    width: 500px;
    padding: 20px;
  }

  .button {
    margin-top: 10px;
    text-align: right;
  }
`;

export default CreateChatRoomModal;
