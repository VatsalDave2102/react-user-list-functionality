import { Image, Form } from "react-bootstrap";
import "./UserRow.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { usersAction } from "../../store/strore";

const UserRow = ({ name, email, status, access, img, id }) => {
  const [isOwner, setIsOwner] = useState(false);

  const dispatch = useDispatch()
  useEffect(() => {
    if (access === "Owner") {
      setIsOwner(true);
    }
  }, [access]);

  const statusColumnStyle = { color: "green", fontWeight: "bolder" };
  const accessColumnStyle = { color: "gray", fontWeight: "bolder" };
  let statusColumnData = status;
  let accessColumnData = access;
  let iconColumnData =  <span className="material-symbols-outlined">lock</span>

  if (!isOwner) {
    accessColumnData = (
      <Form.Select defaultValue = {access}>
        <option>Manager</option>
        <option>Read</option>
      </Form.Select>
    );

    statusColumnData = (
      <Form.Select>
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
            <Image src={img} roundedCircle />
          </div>
          <div className="userdata-container">
            <p className="name m-0">{name}</p>
            <p className="email m-0">{email}</p>
          </div>
        </div>
      </td>

      {/* Td for status */}
      <td style={status.length > 0 ? statusColumnStyle : undefined}>
        {statusColumnData}
      </td>

      {/* Td for access */}
      <td style={accessColumnStyle}>{accessColumnData}</td>

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
  status: PropTypes.string,
  access: PropTypes.string,
  img: PropTypes.string,
  id: PropTypes.string,
};
export default UserRow;
