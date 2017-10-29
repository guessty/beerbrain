import React from 'react'
import { injectInk } from 'react-md'
import { Link } from '../routes'

export default injectInk(class InkLink extends React.PureComponent {
  render() {
    const { ink, route, active, children } = this.props
    return (
      <Link route={route}>
        <a
          className={`
            md-fake-btn md-pointer--hover md-fake-btn--no-outline md-bottom-nav md-bottom-nav--fixed
            ${active(route) ? 'md-text--theme-primary' : ''}
          `}
        >
          {ink}
          {children}
        </a>
      </Link>
    )
  }
})
