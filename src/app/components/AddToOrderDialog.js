import React from 'react'
import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import { Button, DialogContainer, Toolbar } from 'react-md'
import { initStore, addItemToOrder, setOrderId } from '../store'

const mapStateToProps = (state) => {
  return {
    order: state.order
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToOrder: bindActionCreators(addItemToOrder, dispatch),
    setOrderId: bindActionCreators(setOrderId, dispatch)
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(class AddToOrderDialog extends React.PureComponent {
  state = { visible: false, quantity: 1 }
  show = () => {
    this.setState({ visible: true })
  }
  hide = () => {
    this.setState({ visible: false, quantity: 1 })
  }
  increase = () => {
    this.setState({ quantity: this.state.quantity + 1 })
  }
  decrease = () => {
    this.setState({ quantity: this.state.quantity - 1 })
  }
  render() {
    const { visible, quantity } = this.state
    const { bar, product, order } = this.props
    const actions = [{
      onClick: this.hide,
      primary: true,
      children: 'Add to Order',
    }]
    return (
      <div>
        <Button floating mini onClick={this.show}>add</Button>
        <DialogContainer
          id="add-to-order"
          visible={visible}
          onHide={this.hide}
          aria-describedby="add-product-to-order"
          modal
          actions={[
            <Button
              raised primary
              onClick={() => {
                if (bar.id !== order.id) {
                  this.props.setOrderId(bar.id)
                }
                for (let i = 0; i < quantity; i++) {
                  this.props.addItemToOrder(product)
                }
                this.hide()
              }}
            >Add to Order</Button>
          ]}
          width={320}
          height={320}
          contentStyle={{
            padding: 0
          }}
          footerStyle={{
            position: 'absolute',
            bottom: 0,
            width: '100%'
          }}
        >
          <Toolbar
            colored
            title={`Add ${product ? product.name : 'Product'} to Order`}
            actions={<Button icon onClick={this.hide}>close</Button>}
          />
          <div>
            <style jsx>
              {`
                h1 {
                  display: inline-block;
                  vertical-align: top;
                  margin: 4px;
                }
                h3 {
                  text-align: center;
                  margin-top: 1rem;
                }
                .add-to__quantity {
                  text-align: center;
                  padding: 40px 0;
                }
              `}
            </style>
            <div className="add-to__quantity">
              <h3 id="speed-boost-description" className="md-color--secondary-text">
                Select your quantity
              </h3>
              <div>
                <Button icon onClick={() => this.decrease()} disabled={(quantity === 1) ? true : false}>remove</Button>
                <h1>{quantity}</h1>
                <Button icon onClick={() => this.increase()} disabled={(quantity === 10) ? true : false}>add</Button>
              </div>
            </div>
          </div>
        </DialogContainer>
      </div>
    );
  }
})
