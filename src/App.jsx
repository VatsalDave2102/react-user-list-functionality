import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import ListContainer from "./components/list-container/ListContainer";
import { fetchUserData } from "./store/strore";
import Loader from "./components/loader/Loader";
import { useEffect } from "react";

function App() {
  return (
    <>
      <ListContainer />
    </>
  );
}

export default App;
