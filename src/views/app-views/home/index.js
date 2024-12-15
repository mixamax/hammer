import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';

export const Home = ({ match }) => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${match.url}/pages`} component={lazy(() => import(`./pages`))} />
        {/* <Route path={`${APP_PREFIX_PATH}/plan`} component={lazy(() => import(`./plan`))} /> */}
        <Redirect from={`${match.url}`} to={`${match.url}/pages`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(Home);
