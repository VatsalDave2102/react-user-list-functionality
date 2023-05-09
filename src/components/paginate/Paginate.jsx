import React from "react";
import { fetchUserData } from "../../store/strore";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import './Paginate.css'

const Paginate = ({ currentPage, totalPages }) => {
  const dispatch = useDispatch();

  // function to fetch user data of specific page
  function pageChangeHandler({ selected }) {
    dispatch(fetchUserData(selected));
  }

  return (
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
  );
};
const MemoizedPaginate = React.memo(Paginate);
export default MemoizedPaginate;
