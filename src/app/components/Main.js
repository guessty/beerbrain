import React, {Component} from 'react'
import Head from 'next/head'
import raf from 'raf'
import Router from 'next/router'

import Header from "./Header"
import OrderDialog from "./OrderDialog"


Router.onRouteChangeStart = (url) => {
  if (Router.router.route !== url) {
    const $container = document.getElementById('container')
    const $parentNode = $container.parentNode
    const $clone = $container.cloneNode(true)

    // document.body.classList.add('loading')
    $clone.classList.add('clone')

    $clone.addEventListener('animationend', () => {
      console.log('animation ended')
      // document.body.classList.remove('loading')
      $parentNode.querySelector('.clone').remove()
      $parentNode.querySelector('#container').classList.remove('animate-in')
    }, { once: true })

    raf(() => {
      const $container2 = document.getElementById('container')
      $parentNode.insertBefore($clone, $parentNode.childNodes[0])
      $clone.classList.add('animate-out')
      $container2.classList.add('animate-in')
    })
  }
}


class App extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { children } = this.props
    return (
      <main id="container">
        <style global jsx>
          {`
            main {
              min-height: 100vh;
              background-color: white;
              padding: 16px;
            }
          `}
        </style>
        <Header />
        {children}
      </main>
    )
  }
}

export default App
