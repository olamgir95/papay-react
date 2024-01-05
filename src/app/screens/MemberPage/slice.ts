import { createSlice } from "@reduxjs/toolkit";
import { MemberPageState } from "../../../types/screen";

const initialState: MemberPageState = {
  chosenMember: null,
  chosenBoArticles: [],
  chosenSingleBoArticles: null,
  memberFollowers: [],
  memberFollowings: [],
};

const MemberPageSlice = createSlice({
  name: "memberPage",
  initialState,
  reducers: {
    setChosenMember: (state, action) => {
      state.chosenMember = action.payload;
    },
    setChosenBoArticles: (state, action) => {
      state.chosenBoArticles = action.payload;
    },
    setChosenSingleBoArticles: (state, action) => {
      state.chosenSingleBoArticles = action.payload;
    },
    setMemberFollowers: (state, action) => {
      state.memberFollowers = action.payload;
    },
    setMemberFollowings: (state, action) => {
      state.memberFollowings = action.payload;
    },
  },
});

export const {
  setChosenMember,
  setChosenBoArticles,
  setMemberFollowings,
  setMemberFollowers,
  setChosenSingleBoArticles,
} = MemberPageSlice.actions;

export const MemberPageReducer = MemberPageSlice.reducer;
