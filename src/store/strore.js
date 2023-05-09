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
  totalPages: null,
};

// createAsyncThunk to perform async API call
export const fetchUserData = createAsyncThunk(
  "users/fetchUserData",
  // passing page as parameter to update page number
  async (page) => {
    try {
      const response = await axios.get(
        `https://servers-omega.vercel.app/users/p?limit=8&page=${page}`
      );
      const data = await response.data;
      return data;
    } catch (error) {
      throw Error("Failed to fetch users");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // reducer to set userCard state when hovered over the user row
    showCard(state, action) {
      const userId = action.payload.userId;
      const hoveredUser = state.usersList.find((user) => user._id == userId);
      state.userCard = {
        name: `${hoveredUser.first_name} ${hoveredUser.last_name}`,
        email: hoveredUser.email,
        avatar: hoveredUser.avatar,
        active: hoveredUser.active,
        progress: Math.floor(Math.random() * 101),
        clicksReviewed: Math.floor(Math.random() * 1001 + 2000),
        monthlyClicks: Math.floor(Math.random() * 2001 + 4000),
      };
    },
    // reducer to set userCard state when hovered out of the user row
    hideCard(state) {
      state.userCard = null;
    },
  },
  // extraReducers to handle the API call
  extraReducers(builder) {
    builder
      .addCase(fetchUserData.pending, (state, action) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.fetchStatus = "success";
        state.usersList = action.payload.users;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = "Page not found";
      });
  },
});

const store = configureStore({ reducer: { users: userSlice.reducer } });

export const usersAction = userSlice.actions;
export default store;
