import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import Router from 'next/router';
import { bindActionCreators } from 'redux';
import { Button, List, Subheader } from 'react-md';
import { initStore, getBarDetails, clearBarDetails } from '../store';
import App from '../components/App';
import AddToOrderDialog from '../components/AddToOrderDialog';

class Bar extends React.Component {
  static async getInitialProps({ store, query }) {
    store.dispatch(getBarDetails(query.slug));
    return {
      id: query.slug,
    };
  }
  render() {
    const { barDetails } = this.props;
    return (
      <App
        title={barDetails.name}
        nav={
          <Button
            key="nav"
            icon
            onClick={() => {
              Router.replace('/search');
              this.props.clearBarDetails();
            }}
          >
            arrow_back
          </Button>
        }
      >
        <div>
          <List>
            <Subheader primaryText="Available Drinks" primary />
            {
              barDetails.products.map(product => (
                <AddToOrderDialog product={product} bar={barDetails} key={product.id} />
              ))
            }
          </List>
        </div>
      </App>
    );
  }
}

const mapStateToProps = state => ({
  barDetails: state.barDetails,
});

const mapDispatchToProps = dispatch => ({
  clearBarDetails: bindActionCreators(clearBarDetails, dispatch),
});

Bar.propTypes = {
  barDetails: PropTypes.object,
  clearBarDetails: PropTypes.func.isRequired,
};

Bar.defaultProps = {
  barDetails: {},
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Bar);
