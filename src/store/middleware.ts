import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from "redux";
import io from "socket.io-client";
import { ActionTypes } from "../types/action";

let websocket: SocketIOClient.Socket;
let isInitialization = false;

export const websocketMiddleware: Middleware = <S>({
  getState,
}: MiddlewareAPI<Dispatch, S>) => (next: Dispatch<AnyAction>) => (
  action: any
): any => {
  switch (action.type) {
    case ActionTypes.WebSocketEvents.WEBSOCKET_CONNECT: {
      if (websocket === undefined || !websocket.connected) {
        websocket = io(action.payload.url);
      }
      if (!isInitialization) {
        // コールバックのアタッチ
        websocket.on("open", () =>
          next({
            type: ActionTypes.WebSocketEvents.WEBSOCKET_OPEN,
          })
        );
        websocket.on("close", (event: string) =>
          next({
            type: ActionTypes.WebSocketEvents.WEBSOCKET_CLOSE,
            payload: event,
          })
        );
        websocket.on(
          ActionTypes.WebSocketEvents.WEBSOCKET_CREATE_ROOM,
          (event: string) =>
            next({
              type: ActionTypes.WebSocketEvents.WEBSOCKET_MESSAGE,
              payload: event,
            })
        );
        websocket.on(
          ActionTypes.WebSocketEvents.WEBSOCKET_JOIN_ROOM,
          (event: string) =>
            next({
              type: ActionTypes.WebSocketEvents.WEBSOCKET_MESSAGE,
              payload: event,
            })
        );
        websocket.on(
          ActionTypes.WebSocketEvents.WEBSOCKET_CONVERSATION,
          (event: string) =>
            next({
              type: ActionTypes.WebSocketEvents.WEBSOCKET_MESSAGE,
              payload: event,
            })
        );
        websocket.on(
          ActionTypes.WebSocketEvents.WEBSOCKET_GET_ROOMS_LIST,
          (event: string) =>
            next({
              type: ActionTypes.WebSocketEvents.WEBSOCKET_MESSAGE,
              payload: event,
            })
        );
        websocket.on(
          ActionTypes.WebSocketEvents.WEBSOCKET_GET_CURRENT_ROOM,
          (event: string) =>
            next({
              type: ActionTypes.WebSocketEvents.WEBSOCKET_MESSAGE,
              payload: event,
            })
        );
        websocket.on(
          ActionTypes.WebSocketEvents.WEBSOCKET_DISCONNECT,
          (event: string) =>
            next({
              type: ActionTypes.WebSocketEvents.WEBSOCKET_MESSAGE,
              payload: event,
            })
        );
        websocket.on(
          ActionTypes.WebSocketEvents.WEBSOCKET_LEAVE_ROOM,
          (event: string) =>
            next({
              type: ActionTypes.WebSocketEvents.WEBSOCKET_MESSAGE,
              payload: event,
            })
        );
        isInitialization = true;
      }
      break;
    }
    case ActionTypes.WebSocketEvents.WEBSOCKET_SEND: {
      switch (action.payload.type) {
        case ActionTypes.WebSocketEvents.WEBSOCKET_CREATE_ROOM: {
          websocket.emit(
            ActionTypes.WebSocketEvents.WEBSOCKET_CREATE_ROOM,
            action.payload
          );
          break;
        }
        case ActionTypes.WebSocketEvents.WEBSOCKET_JOIN_ROOM: {
          websocket.emit(
            ActionTypes.WebSocketEvents.WEBSOCKET_JOIN_ROOM,
            action.payload
          );
          break;
        }
        case ActionTypes.WebSocketEvents.WEBSOCKET_CONVERSATION: {
          websocket.emit(
            ActionTypes.WebSocketEvents.WEBSOCKET_CONVERSATION,
            action.payload
          );
          break;
        }
        case ActionTypes.WebSocketEvents.WEBSOCKET_GET_ROOMS_LIST: {
          websocket.emit(
            ActionTypes.WebSocketEvents.WEBSOCKET_GET_ROOMS_LIST,
            action.payload
          );
          break;
        }
        case ActionTypes.WebSocketEvents.WEBSOCKET_GET_CURRENT_ROOM: {
          websocket.emit(
            ActionTypes.WebSocketEvents.WEBSOCKET_GET_CURRENT_ROOM,
            action.payload
          );
          break;
        }
        case ActionTypes.WebSocketEvents.WEBSOCKET_LEAVE_ROOM: {
          websocket.emit(
            ActionTypes.WebSocketEvents.WEBSOCKET_LEAVE_ROOM,
            action.payload
          );
          break;
        }
      }
      break;
    }
  }
  return next(action);
};
