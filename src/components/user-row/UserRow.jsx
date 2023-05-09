import { Image, Form } from "react-bootstrap";
import "./UserRow.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { usersAction } from "../../store/strore";

const UserRow = ({ name, email, active, owner, role, avatar, id }) => {
  const [isOwner, setIsOwner] = useState(false);

  const dispatch = useDispatch()
  useEffect(() => {
    if (owner) {
      setIsOwner(true);
    }
  }, [owner]);

  const statusColumnStyle = { color: "green", fontWeight: "bolder" };
  const accessColumnStyle = { color: "gray", fontWeight: "bolder" };

  let statusColumnData = 'Active'
  let accessColumnData = role;
  let iconColumnData =  <span className="material-symbols-outlined">lock</span>

  if (!isOwner) {
    accessColumnData = (
      <Form.Select defaultValue = {role}>
        <option>Manager</option>
        <option>Read</option>
      </Form.Select>
    );

    statusColumnData = (
      <Form.Select defaultValue={active ? 'Active': 'Inactive'}>
        <option>Inactive</option>
        <option>Active</option>
      </Form.Select>
    );

    iconColumnData = <span className="material-symbols-outlined">
    delete
    </span>
  }

  function showCard(id){
    dispatch(usersAction.showCard({userId:id}))
  }
  function hideCard(){
    dispatch(usersAction.hideCard())
  }
  return (
    <tr className="align-middle">
      {/* This contains namge, image and email */}
      <td>
        <div className="profile-container d-flex justify-content-start" onMouseEnter={()=>showCard(id)} onMouseLeave={()=>hideCard(id)}>
          <div className="img-container me-4">
            <Image src={avatar} roundedCircle />
          </div>
          <div className="userdata-container">
            <p className="name m-0">{name}</p>
            <p className="email m-0">{email}</p>
          </div>
        </div>
      </td>

      {/* Td for status */}
      <td style={isOwner ? statusColumnStyle : undefined}>
        {statusColumnData}
      </td>

      {/* Td for access */}
      <td style={isOwner ? accessColumnStyle : undefined}>{accessColumnData}</td>

      {/* Lock / Dustbin icon */}
      <td style={{color: "gray"}}>
        {iconColumnData}
      </td>
    </tr>
  );
};

UserRow.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.string,
  active: PropTypes.bool,
  avatar: PropTypes.string,
  id: PropTypes.string,
  owner : PropTypes.bool,
};
export default UserRow;
