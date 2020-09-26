export interface AppState {
  currentRoom: CurrentRoom;
  currentUser: {
    name: string;
  };
  rooms: Room[];
}
export interface CurrentRoom {
  id: string;
  name: string;
  users: {
    name: string;
    socketId: string;
  }[];
  logs: {
    logId: number;
    userName: string;
    time: string;
    message: string;
  }[];
}

export interface User {
  name: string;
  socketId: string;
}

export interface Room {
  id: string;
  name: string;
  users: User[];
}
