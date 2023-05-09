import { Table } from "react-bootstrap";
import React from "react"
import "./UserTable.css";
import UserRow from "../user-row/UserRow";
// import users from "../../DUMMY_DATA";
import PropTypes from 'prop-types'
import { useSelector } from "react-redux";

const UserTable = ( ) => {
  const users = useSelector(state => state.users.usersList)
 
  return (
    <>
      <Table responsive borderless className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Access</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user._id}
              name={`${user.first_name} ${user.last_name}`}
              email={user.email}
              role={user.role}
              owner = {user.owner}
              active = {user.active}
              avatar = {user.avatar}
              id = {user._id}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};

UserTable.propTypes = {
  users: PropTypes.array
}
const MemoizedUserTable = React.memo(UserTable) ;
export default MemoizedUserTable
