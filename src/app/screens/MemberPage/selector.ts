import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectMemberPage = (state: AppRootState) => state.memberPage;

export const retrieveChosenMember = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.chosenMember
);

export const retrieveChosenBoArticles = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.chosenBoArticles
);

export const retrieveChosenSingleBoArticles = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.chosenSingleBoArticles
);
export const retrieveMemberFollowers = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.memberFollowers
);
export const retrieveMemberFollowings = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.memberFollowings
);
