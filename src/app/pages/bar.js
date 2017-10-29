import React from 'react'
import withRedux from 'next-redux-wrapper'
import Router from 'next/router'
import { bindActionCreators } from 'redux'
import {
  Button, Avatar, List, ListItem, Subheader,
} from 'react-md'
import { initStore, getBarDetails, clearBarDetails } from '../store'
import App from '../components/App'
import AddToOrderDialog from '../components/AddToOrderDialog'

const mapStateToProps = (state) => {
  return {
    barDetails: state.barDetails
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearBarDetails: bindActionCreators(clearBarDetails, dispatch)
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  class Bar extends React.Component {
    static async getInitialProps({ store, isServer, query }) {
      store.dispatch(getBarDetails(query.slug))
      return {
        id: query.slug
      }
    }
    render() {
      const { barDetails } = this.props
      return (
        <App
          title={barDetails.name}
          nav={
            <Button
              key="nav"
              icon
              onClick={() => {
                Router.replace('/search')
                this.props.clearBarDetails()
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
                barDetails.products.map((product) => (
                  <ListItem
                    key={product.id}
                    leftAvatar={<Avatar random>P</Avatar>}
                    rightAvatar={<AddToOrderDialog product={product} bar={barDetails} />}
                    primaryText={product.name}
                    secondaryText={`£${product.price.toFixed(2)}`}
                  />
                ))
              }
            </List>
          </div>
        </App>
      )
    }
  }
)
