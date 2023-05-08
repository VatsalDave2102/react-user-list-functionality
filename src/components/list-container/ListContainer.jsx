import { Container } from "react-bootstrap";
import "./ListContainer.css";
import UserTable from "../table/UserTable";
import UserCard from "../user-card/UserCard";
import { useSelector } from "react-redux";

const ListContainer = () => {
  const userCard = useSelector((state) => state.users.userCard);
   
  return ( 
    <Container
      fluid="lg"
      className="list-container p-3 my-5 d-flex flex-md-row flex-column align-items-center"
    >
      <UserTable />
      {userCard && <UserCard />}
    </Container>
  );
};

export default ListContainer;
