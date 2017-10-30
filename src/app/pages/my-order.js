import React from 'react';
import PropTypes from 'prop-types';
import { Button, Avatar, List, ListItem, Subheader } from 'react-md';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import { Router } from '../routes';
import { initStore, setOrderId, removeItemFromOrder } from '../store';
import App from '../components/App';

const generateKey = (id, index) => `${id}_${index}`;

class MyOrder extends React.PureComponent {
  render() {
    const { order, barDetails } = this.props;
    const total = order.items.map(item => item.price).reduce((a, b) => a + b, 0);
    return (
      <App
        title="My Order"
        actions={(order.items.length) ? (
          <Button
            flat
            onClick={() => this.props.setOrderId()}
          >
            Clear Order
          </Button>
        ) : null}
        nav={(order.items.length) ? (
          <Button
            key="nav"
            icon
            onClick={() => {
              Router.replaceRoute(`/search/${order.id}`);
            }}
          >
            arrow_back
          </Button>
        ) : null}
      >
        <List>
          {
            (!order.items.length) ? (
              <Subheader primaryText="No items in order" />
            ) : (
              <Subheader primaryText={`Drink orders for ${barDetails.name}`} />
            )
          }
          {
            order.items.map((product, index) => (
              <ListItem
                key={generateKey(product.id, index)}
                leftAvatar={<Avatar random>P</Avatar>}
                rightAvatar={
                  <Button
                    floating
                    mini
                    onClick={() => this.props.removeItemFromOrder(index)}
                  >
                    remove
                  </Button>
                }
                primaryText={product.name}
                secondaryText={`£${product.price.toFixed(2)}`}
              />
            ))
          }
          {
            (order.items.length) ? (
              <h3>
                <style jsx>
                  {`
                    h3 {
                      text-align: center;
                      margin-top: 1rem;
                    }
                  `}
                </style>
                Total Cost: {`£${total.toFixed(2)}`}
              </h3>
            ) : null
          }
        </List>
      </App>
    );
  }
}

const mapStateToProps = state => ({
  order: state.order,
  barDetails: state.barDetails,
});

const mapDispatchToProps = dispatch => ({
  setOrderId: bindActionCreators(setOrderId, dispatch),
  removeItemFromOrder: bindActionCreators(removeItemFromOrder, dispatch),
});

MyOrder.propTypes = {
  order: PropTypes.object,
  barDetails: PropTypes.object,
  setOrderId: PropTypes.func.isRequired,
  removeItemFromOrder: PropTypes.func.isRequired,
};

MyOrder.defaultProps = {
  order: {
    items: [],
  },
  barDetails: {},
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(MyOrder);
