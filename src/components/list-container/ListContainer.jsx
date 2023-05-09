import { Container } from "react-bootstrap";
import "./ListContainer.css";
import UserTable from "../table/UserTable";
import UserCard from "../user-card/UserCard";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { fetchUserData } from "../../store/strore";
import Loader from "../loader/Loader";

const ListContainer = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(state => state.users.currentPage)
  const totalPages = useSelector(state => state.users.totalPages)

  useEffect(() => {
    dispatch(fetchUserData(currentPage));
    
  }, [dispatch, currentPage]);

  function pageChangeHandler ({selected}){
    console.log(selected)
    dispatch(fetchUserData( selected ));
  };

  const userCard = useSelector((state) => state.users.userCard);
  // const usersList = useSelector((state)=> state.users.usersList)
  const fetchStatus = useSelector((state) => state.users.fetchStatus);

  

  console.log(fetchStatus);
  console.log(currentPage);

  return (
    <>
      {/* {fetchStatus == "loading" ? (
        <Loader />
      ) : (
        <>
          {" "} */}
          <Container
            fluid="lg"
            className="list-container p-3 my-5 d-flex flex-md-row flex-column align-items-center"
          >
            <UserTable />
            {userCard && <UserCard />}
          </Container>
          <ReactPaginate
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            activeClassName={"active"}
            onPageChange={pageChangeHandler}
            pageCount={ totalPages}
            breakLabel="..."
            pageRangeDisplayed={10}
            marginPagesDisplayed={2}
          />
        {/* </> */}
      {/* )} */}
    </>
  );
};

export default ListContainer;
