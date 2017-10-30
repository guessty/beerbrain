import React from 'react';
import { Button, FontIcon, Grid } from 'react-md';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store';
import { Link } from '../routes';
import App from '../components/App';

const Index = () => (
  <App
    noHeader
    mainClassName="md-background--primary"
  >
    <Grid style={{ padding: '16px' }}>
      <div className=" md-text-center">
        <h1 className="md-display-3 md-background--primary">BeerBrain.io</h1>
        <FontIcon className="md-display-3" style={{ fontSize: '7rem', color: 'white' }}>local_drink</FontIcon>
        <h2 className="md-display-1 md-background--primary">Take drink orders the easy way.</h2>
        <Link route="/search" href="/search">
          <Button
            raised
            secondary
            iconChildren="fast_forward"
            iconBefore={false}
            style={{ fontSize: '1.3rem', height: '52px', marginTop: '1rem' }}
          >
            Start Your Order
          </Button>
        </Link>
      </div>
    </Grid>
  </App>
);

export default withRedux(initStore)(Index);
