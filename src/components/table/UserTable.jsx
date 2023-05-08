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
              key={user.id}
              name={user.name}
              email={user.email}
              access={user.access}
              status = {user.status}
              img = {user.img}
              id = {user.id}
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
