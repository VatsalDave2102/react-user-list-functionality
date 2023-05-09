import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import ListContainer from "./components/list-container/ListContainer";
import { fetchUserData } from "./store/strore";
import Loader from "./components/loader/Loader";
import { useEffect } from "react";
import Error from "./components/error/Error";

function App() {
  const fetchStatus = useSelector(state => state.users.fetchStatus)
  console.log(fetchStatus)
  return (
    <>
     <ListContainer />
      
    </>
  );
}

export default App;
