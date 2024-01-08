import React from "react";
import { Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
import VisitOtherPage from "./VisitOtherPage";
import VisitMyPage from "./VisitMyPage";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function MemberPage(props: any) {
  const member = useRouteMatch();
  console.log(member);
  const query = useQuery();
  const chosen_mb_id: string | null = query.get("mb_id") ?? null;
  const chosen_art_id: string | null = query.get("art_id") ?? null;
  console.log("query", chosen_mb_id);

  return (
    <div className="member_page">
      <Switch>
        <Route path={`${member.path}/others`}>
          <VisitOtherPage
            verifyMemberData={props.verifedMemberData}
            chosen_mb_id={chosen_mb_id}
            chosen_art_id={chosen_art_id}
          />
        </Route>
        <Route path={`${member.path}`}>
          <VisitMyPage verifyMemberData={props.verifedMemberData} />
        </Route>
      </Switch>
    </div>
  );
}
