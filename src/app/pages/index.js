import React, { PureComponent } from 'react'
import {
  Button, TextField, FontIcon,
  IconSeparator, Avatar,
} from 'react-md'
import Router from 'next/router'
import { Link } from '../routes'

import App from '../components/App'

// Home with Search and Recent => Results List  => Bar with Rounds Dialog

class Index extends PureComponent {
  handleSearch = () => {
    console.log(this._text.value)
    Router.push({
      pathname: '/search',
      query: { text: this._text.value }
    })
  }
  render () {
    return (
      <App
        title={(
          <IconSeparator label="Beer2.me" iconBefore component="span">
            <Avatar suffix="light_blue" icon={<FontIcon>local_drink</FontIcon>} />
          </IconSeparator>
        )}
        search
        noHeader
      >
        <div className="md-text-center">
          <FontIcon className="md-display-3">local_drink</FontIcon>
          <h1 className="md-display-3">BeerBrain.io</h1>
          <h2 className="md-display-1">The easy way to remember your order</h2>
          <Link route="/search">
            <Button
              raised primary iconChildren="search"
              style={{ fontSize: '1.3rem', height: '52px' }}
            >
              Find a bar or pub
            </Button>
          </Link>
        </div>
      </App>
    )
  }
}

export default Index
