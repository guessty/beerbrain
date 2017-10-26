import React, {Component} from 'react'

import App from '../components/App'


class Index extends Component {
  constructor (props, context) {
    super(props, context)
  }

  render () {
    return (
      <App>
        <div>
          <p className="f1">Hello from the Home Page</p>
        </div>
      </App>
    )
  }
}

export default Index
