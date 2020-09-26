import { action } from "typesafe-actions";
import { ActionTypes } from "../types/action";
import {
  Conversation,
  CreateRoom,
  CurrentRoom,
  JoinRoom,
} from "../types/reception";

const URL: string = "ws://localhost:3333";

export const connectWebSocket = (url = URL) =>
  action(ActionTypes.WebSocketEvents.WEBSOCKET_CONNECT, { url });

export const createRoom = (data: CreateRoom) =>
  action(ActionTypes.WebSocketEvents.WEBSOCKET_SEND, {
    type: ActionTypes.WebSocketEvents.WEBSOCKET_CREATE_ROOM,
    ...data,
  });

export const joinRoom = (data: JoinRoom) =>
  action(ActionTypes.WebSocketEvents.WEBSOCKET_SEND, {
    type: ActionTypes.WebSocketEvents.WEBSOCKET_JOIN_ROOM,
    ...data,
  });

export const sendMessage = (data: Conversation) =>
  action(ActionTypes.WebSocketEvents.WEBSOCKET_SEND, {
    type: ActionTypes.WebSocketEvents.WEBSOCKET_CONVERSATION,
    ...data,
  });

export const getRoomsList = () =>
  action(ActionTypes.WebSocketEvents.WEBSOCKET_SEND, {
    type: ActionTypes.WebSocketEvents.WEBSOCKET_GET_ROOMS_LIST,
  });
export const getCurrentRoom = (data: CurrentRoom) =>
  action(ActionTypes.WebSocketEvents.WEBSOCKET_SEND, {
    type: ActionTypes.WebSocketEvents.WEBSOCKET_GET_CURRENT_ROOM,
    ...data,
  });

export const leaveRoom = () =>
  action(ActionTypes.WebSocketEvents.WEBSOCKET_SEND, {
    type: ActionTypes.WebSocketEvents.WEBSOCKET_LEAVE_ROOM,
  });

export const clearCurrentRoom = () =>
  action(ActionTypes.Events.NORMAL, {
    type: ActionTypes.Events.CLEAR_CURRENT_ROOM,
  });

export const setCurrentRoomId = (roomId: string) =>
  action(ActionTypes.Events.NORMAL, {
    type: ActionTypes.Events.SET_CURRENT_ROOM_ID,
    roomId,
  });
