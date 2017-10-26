import App from '../components/App'
import React from 'react'
import fetch from 'isomorphic-fetch'

export default class extends React.Component {
  // static async getInitialProps () {
  //   return fetch('https://us-central1-beerme-cd9f2.cloudfunctions.net/api')
  //   .then((response) => response.json())
  //   .then((response) => {
  //     console.log(response)
  //     return { drinks: JSON.stringify(response) }
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //     return { drinks: null}
  //   })
  // }
  render () {
    return (
      <App>
        <p className="f1">About Page</p>
        <p>{`Did you know Next has had ${this.props.drinks} on npm in the last month?`}</p>
      </App>
    )
  }
}
