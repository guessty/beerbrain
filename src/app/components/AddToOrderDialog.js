import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, DialogContainer, Toolbar, ListItem, Avatar, FontIcon } from 'react-md';
import { addItemToOrder, setOrderId } from '../store';

class AddToOrderDialog extends React.PureComponent {
  state = { visible: false, quantity: 1 }
  show() {
    this.setState({ visible: true });
  }
  hide() {
    this.setState({ visible: false, quantity: 1 });
  }
  increase() {
    this.setState({ quantity: this.state.quantity + 1 });
  }
  decrease() {
    this.setState({ quantity: this.state.quantity - 1 });
  }
  renderQuantitySelect() {
    const { quantity } = this.state;
    const { product } = this.props;
    return (
      <div>
        <Toolbar
          colored
          title={product.name}
          actions={<Button icon onClick={() => this.hide()}>close</Button>}
        />
        <div>
          <style jsx>
            {`
              h1 {
                display: inline-block;
                vertical-align: top;
                margin: 4px;
                width: 100px;
              }
              h3 {
                text-align: center;
                margin-top: 1rem;
              }
              .add-to__quantity {
                text-align: center;
                padding: 20px 0;
              }
            `}
          </style>
          <div>
            <h3 id="speed-boost-description" className="md-color--secondary-text">
              Select your quantity
            </h3>
            <div className="add-to__quantity">
              <Button
                icon
                onClick={() => this.decrease()}
                disabled={(quantity === 1)}
              >
                remove
              </Button>
              <h1>{quantity}</h1>
              <Button
                icon
                onClick={() => this.increase()}
                disabled={(quantity === 10)}
              >
                add
              </Button>
            </div>
            <h3>
              Cost: {`£${(product.price * quantity).toFixed(2)}`}
            </h3>
          </div>
        </div>
      </div>
    );
  }
  renderClearOrder() {
    const { order } = this.props;
    return (
      <div>
        <Toolbar
          colored
          title="Existing Order Detected"
          actions={<Button icon onClick={() => this.hide()}>close</Button>}
        />
        <div style={{ padding: '16px' }}>
          <p>
            {`It looks like your current 'My Order' contains items from a different bar (${order.name}).`}
          </p>
          <p>
            Please clear your current order to continue.
          </p>
        </div>
      </div>
    );
  }
  render() {
    const { visible, quantity } = this.state;
    const { bar, product, order } = this.props;
    return (
      <div>
        <ListItem
          leftAvatar={<Avatar random>P</Avatar>}
          rightIcon={<FontIcon>plus</FontIcon>}
          primaryText={product.name}
          secondaryText={`£${product.price.toFixed(2)}`}
          onClick={() => this.show()}
        />
        <DialogContainer
          id="add-to-order"
          visible={visible}
          onHide={this.hide}
          aria-describedby="add-product-to-order"
          modal
          actions={(
            <Button
              raised
              primary
              onClick={() => {
                if (order.id && order.id !== bar.id) {
                  this.props.setOrderId(bar.id, bar.name);
                } else {
                  if (!order.id) this.props.setOrderId(bar.id, bar.name);
                  for (let i = 0; i < quantity; i += 1) {
                    this.props.addItemToOrder(product);
                  }
                  this.hide();
                }
              }}
            >
              {(!order.id || order.id === bar.id) ? 'Add to Order' : 'Clear My Order and Continue'}
            </Button>
          )}
          width={320}
          height={320}
          contentStyle={{
            padding: 0,
          }}
          footerStyle={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            padding: '16px',
          }}
        >
          {
            (!order.id || order.id === bar.id) ?
              this.renderQuantitySelect() : this.renderClearOrder()
          }
        </DialogContainer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  order: state.order,
});

const mapDispatchToProps = dispatch => ({
  addItemToOrder: bindActionCreators(addItemToOrder, dispatch),
  setOrderId: bindActionCreators(setOrderId, dispatch),
});


AddToOrderDialog.propTypes = {
  bar: PropTypes.object,
  product: PropTypes.object,
  order: PropTypes.object,
  addItemToOrder: PropTypes.func.isRequired,
  setOrderId: PropTypes.func.isRequired,
};

AddToOrderDialog.defaultProps = {
  bar: {},
  product: {},
  order: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToOrderDialog);
