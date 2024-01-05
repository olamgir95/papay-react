import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import VisitOtherPage from "./VisitOtherPage";
import VisitMyPage from "./VisitMyPage";

export function MemberPage(props: any) {
  const member = useRouteMatch();
  console.log(member);

  return (
    <div className="member_page">
      <Switch>
        <Route path={`${member.path}/other`}>
          <VisitOtherPage verifyMemberData={props.verifedMemberData} />
        </Route>
        <Route path={`${member.path}`}>
          <VisitMyPage verifyMemberData={props.verifedMemberData} />
        </Route>
      </Switch>
    </div>
  );
}
