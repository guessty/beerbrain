import React from 'react'
import {
  Button, TextField, Avatar, FontIcon,
  List, ListItem, Subheader,
} from 'react-md'
import { Link } from '../routes'

import App from '../components/App'
import Bars from '../_data/bars'

export default class Search extends React.PureComponent {
  state = { value: '' }
  handleClearSearch = () => {
    this.setState({ value: '' })
  }
  handleChange = (value) => {
    this.setState({ value })
  }
  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.search(this.state.value);
    }
  }
  search = (value) => {
    this.setState({ value })
    console.log('will search with: ', value)
  }
  render() {
    const { value } = this.state
    return (
      <App
        title={(
          <TextField
            id="search-bars"
            block
            fullWidth
            value={value}
            placeholder="Search Bars and Pubs"
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            toolbar
            autoFocus
          />
        )}
        nav={(
          <Link route="/">
            <Button
              key="nav"
              icon
            >
              local_drink
            </Button>
          </Link>
        )}
        actions={
          (value) ? (
            <Button
              key="nav"
              icon
              onClick={this.handleClearSearch}
            >
              close
            </Button>
          ) : null
        }
      >
        <div>
          <List>
            <Subheader primaryText="Browse Pubs and Bars in your area" primary />
            {
              Bars().map((bar) => (
                <Link route="/search/bar" key={bar.id}>
                  <ListItem
                    leftAvatar={<Avatar random>B</Avatar>}
                    primaryText={bar.name}
                    rightIcon={<FontIcon>arrow_forward</FontIcon>}
                  />
                </Link>
              ))
            }
          </List>
        </div>
      </App>
    )
  }
}
