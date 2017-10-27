import React, { PureComponent } from 'react'
import {
  Button, TextField,
  Autocomplete, SelectionControlGroup,
} from 'react-md'
import Router from 'next/router'

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
      <App>
        <div>
          <p className="f1">Hello from the Home Page</p>
          <TextField
            id="searchText"
            lineDirection="center"
            placeholder="Search for a Bar"
            className="md-cell md-cell--bottom"
            ref={text => this._text = text}
          />
          <Button
            raised primary iconChildren="search"
            onClick={this.handleSearch}
          >
            Search
          </Button>
        </div>
      </App>
    )
  }
}

export default Index
