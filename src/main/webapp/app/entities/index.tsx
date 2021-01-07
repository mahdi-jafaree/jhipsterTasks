import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Vendor from './vendor';
import Contract from './contract';
import Invoice from './invoice';
/* jhipster-needle-add-route-import - JHipster will add routtttttes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}vendor`} component={Vendor} />
      <ErrorBoundaryRoute path={`${match.url}contract`} component={Contract} />
      <ErrorBoundaryRoute path={`${match.url}invoice`} component={Invoice} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
