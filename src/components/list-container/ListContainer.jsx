import { Container } from "react-bootstrap";
import "./ListContainer.css";
import UserTable from "../table/UserTable";
import UserCard from "../user-card/UserCard";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { fetchUserData } from "../../store/strore";
import Loader from "../loader/Loader";
import Error from "../error/Error";
import Paginate from "../paginate/Paginate";

const ListContainer = () => {
  const dispatch = useDispatch();

  // selecting currentPage, totalPages, userCard and fetchStatus from store
  const currentPage = useSelector((state) => state.users.currentPage);
  const totalPages = useSelector((state) => state.users.totalPages);
  const userCard = useSelector((state) => state.users.userCard);
  const fetchStatus = useSelector((state) => state.users.fetchStatus);

  // useEffect to fetch data for the first time
  useEffect(() => {
    dispatch(fetchUserData(currentPage));
  }, [dispatch]);

  return (
    <>
      {/* rendering components according to the fetch state; loading, success and failed */}
      {fetchStatus == "loading" && <Loader />}
      {fetchStatus == "failed" && <Error />}
      {fetchStatus == "success" && (
        <Container
          fluid="lg"
          className="list-container p-3 my-5 d-flex flex-md-row flex-column align-items-center"
        >
          <UserTable />
          {userCard && <UserCard />}
        </Container>
      )}
      {fetchStatus == "success" && (
        <Paginate currentPage={currentPage} totalPages={totalPages} />
      )}
    </>
  );
};
const MemoizedListContainer = React.memo(ListContainer);
export default MemoizedListContainer;
