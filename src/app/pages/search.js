import React from 'react'
import {
  Button, TextField, Avatar, FontIcon,
  List, ListItem, Subheader,
} from 'react-md'
import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import Fuse from 'fuse.js'
import { initStore, getAllBars, setSearchText } from '../store'
import { Link } from '../routes'
import App from '../components/App'

const mapStateToProps = (state) => {
  return {
    bars: state.bars,
    searchText: state.searchText
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSearchText: bindActionCreators(setSearchText, dispatch)
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  class Search extends React.PureComponent {
    static async getInitialProps({ store, isServer, query }) {
      store.dispatch(getAllBars())
      return {}
    }
    handleClearSearch = () => {
      this.props.setSearchText('')
    }
    handleChange = (value) => {
      this.props.setSearchText(value)
    }
    filterdBars = () => {
      const { bars, searchText } = this.props
      const options = {
        shouldSort: true,
        threshold: 0.1,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          "name"
        ]
      }
      if (searchText) {
        const fuse = new Fuse(bars, options);
        return fuse.search(searchText)
      }

      return bars
    }
    render() {
      const { bars, searchText } = this.props
      return (
        <App
          title={(
            <TextField
              id="search-bars"
              block
              fullWidth
              value={searchText}
              placeholder="Search Bars and Pubs"
              onChange={this.handleChange}
              toolbar
              autoFocus
            />
          )}
          actions={
            (searchText) ? (
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
              {
                this.filterdBars().map((bar) => (
                  <Link
                    route="bar" key={bar.id} params={{ slug: bar.id }}
                  >
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
)
