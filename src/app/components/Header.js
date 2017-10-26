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
            <Link href="/"><Button flat>Home</Button></Link>
            <Link href="/about"><Button flat>About</Button></Link>
            <Link href="/search"><Button flat>Search</Button></Link>
            <Link href="/bar"><Button flat>Bar</Button></Link>
          </span>
        )}
      />
    )
  }
}
