import {
  Button, Avatar, List, ListItem, Subheader,
} from 'react-md'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'
import App from '../components/App'

const mapStateToProps = (state) => {
  return {
    order: state.order
  }
}

export default withRedux(initStore, mapStateToProps)(({ order }) => (
  <App
    title="My Order"
  >
    <List>
      {
        order.items.map((product) => (
          <ListItem
            key={product.id}
            leftAvatar={<Avatar random>P</Avatar>}
            primaryText={product.name}
            secondaryText={`£${product.price.toFixed(2)}`}
          />
        ))
      }
    </List>
  </App>
))
