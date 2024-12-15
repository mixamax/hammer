import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';

const Pages = ({ match }) => (

  <Suspense fallback={<Loading cover="content"/>}>
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/user-list`} />
      <Route path={`${match.url}/plan`} component={lazy(() => import(`./plan`))} />
      <Route path={`${match.url}/setting/:id`} component={lazy(() => import(`./setting`))} />
      <Route path={`${match.url}/user-list`} component={lazy(() => import(`./user-list`))} />
    </Switch>
  </Suspense>
);

export default Pages;

