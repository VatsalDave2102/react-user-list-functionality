import { Container } from "react-bootstrap";
import "./ListContainer.css";
import UserTable from "../table/UserTable";
import UserCard from "../user-card/UserCard";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { fetchUserData } from "../../store/strore";
import Loader from "../loader/Loader";
import Error from "../error/Error";

const ListContainer = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.users.currentPage);
  const totalPages = useSelector((state) => state.users.totalPages);
  const userCard = useSelector((state) => state.users.userCard);
  const fetchStatus = useSelector((state) => state.users.fetchStatus);

  useEffect(() => {
    dispatch(fetchUserData(currentPage));
  }, [dispatch]);

  function pageChangeHandler({ selected }) {
    console.log(selected);
    dispatch(fetchUserData(selected));
  }

  return (
    <>
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
        <div className="pagination-container">
        <ReactPaginate
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          activeClassName={"active"}
          onPageChange={pageChangeHandler}
          pageCount={totalPages}
          breakLabel="..."
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          forcePage={currentPage}
        />
        </div>
      )}
    </>
  );
};

export default ListContainer;
