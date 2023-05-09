import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  fetchStatus: "idle",
  error: null,
  usersList: [],
  userCard: null,
  currentPage: 0,
  totalPages: null
};

export const fetchUserData = createAsyncThunk(
  "users/fetchUserData",
  async (page) => {
    const response = await axios.get(
      `https://servers-omega.vercel.app/users/p?limit=8&page=${page}`
    );
    const data = await response.data;
    return data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    showCard(state, action) {
      const userId = action.payload.userId;
      const hoveredUser = state.usersList.find((user) => user._id == userId);
      state.userCard = {
        name: `${hoveredUser.first_name} ${hoveredUser.last_name}`,
        email: hoveredUser.email,
        avatar: hoveredUser.avatar,
        active: hoveredUser.active,
        progress: "60",
        clicksReviewed: "2,450",
        monthlyClicks: "5,000",
      };
    },
    hideCard(state) {
      state.userCard = null;
    },
    changePage(state,action){
      state.pageCount = action.payload
      console.log(action.payload)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserData.pending, (state, action) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.fetchStatus = "success";
        state.usersList = action.payload.users;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload.error
      });
  },
});

const store = configureStore({ reducer: { users: userSlice.reducer } });

export const usersAction = userSlice.actions;
export default store;
