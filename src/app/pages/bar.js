import React from 'react'
import {
  Button, Avatar, List, ListItem, Subheader,
} from 'react-md'

import App from '../components/App'


export default class Blog extends React.Component {
  static async getInitialProps ({ query }) {
    console.log(query.slug)
    return {
      id: query.slug
    }
  }
  render() {
    return (
      <App back>
        <div>
          <List>
            <Subheader primaryText="Available Drinks" primary />
            <ListItem
              disabled
              leftAvatar={<Avatar suffix="deep-purple">B</Avatar>}
              rightAvatar={<Button floating mini className="md-paper md-paper--0">add</Button>}
              primaryText="Brunch this weekend?"
              secondaryText={'Ali Connors\nI\'ll be in your neighborhood sometime this week'}
            />
            <ListItem
              leftAvatar={<Avatar suffix="green">Q</Avatar>}
              rightAvatar={<Button floating mini className="md-paper md-paper--0">add</Button>}
              primaryText="Summer BBQ"
              secondaryText={'to Alex, Scott, Jennifer\nWish I could come, but I\'m out of town this weekend.'}
            />
            <ListItem
              leftAvatar={<Avatar suffix="orange">A</Avatar>}
              rightAvatar={<Button floating mini className="md-paper md-paper--0">add</Button>}
              primaryText="Oui Oui"
              secondaryText="Sandra Adams - Do you have Paris recommendations? Have you ever been?"
            />
          </List>
        </div>
      </App>
    )
  }
}
