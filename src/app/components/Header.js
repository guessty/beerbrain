import React from 'react'
import {Link} from '../routes'
import {
  Button,
  Toolbar,
} from 'react-md';

export default class Header extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Toolbar
        colored
        nav={(
          <Button
            key="nav"
            icon
          >
            menu
          </Button>
        )}
        actions={(
          <span>
            <Link route="/"><Button flat>Home</Button></Link>
            <Link route="/search"><Button flat>Search</Button></Link>
            <Link route="/search/bar"><Button flat>Bar</Button></Link>
          </span>
        )}
      />
    )
  }
}
