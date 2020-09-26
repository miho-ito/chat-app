import React from "react";
import User from "./user";

export interface UserItem {
  name: string;
  socketId: string;
}
interface UserListProps {
  users: UserItem[];
}

class UserList extends React.Component<UserListProps> {
  render() {
    return (
      <div>
        {this.props.users &&
          this.props.users.map((item: UserItem) => {
            return <User name={item.name} key={item.socketId}></User>;
          })}
      </div>
    );
  }
}
export default UserList;
