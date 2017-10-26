import React from 'react'
import Link from "next/link"
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
            <Link prefetch href="/"><Button flat>Home</Button></Link>
            <Link prefetch href="/about"><Button flat>About</Button></Link>
            <Link prefetch href="/search"><Button flat>Search</Button></Link>
            <Link prefetch href="/bar"><Button flat>Bar</Button></Link>
          </span>
        )}
      />
    )
  }
}
