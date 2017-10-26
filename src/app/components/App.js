import React, {Component} from 'react'
import Head from 'next/head'
import raf from 'raf'
import Router from 'next/router'

import Header from "./Header"


Router.onRouteChangeStart = (url) => {
  console.log(Router.router.route, url)

  if (Router.router.route !== url) {
    const $container = document.getElementById('container')
    const $parentNode = $container.parentNode
    const $clone = $container.cloneNode(true)

    // document.body.classList.add('loading')
    $clone.classList.add('clone')

    $clone.addEventListener('animationend', () => {
      console.log('animation ended')
      // document.body.classList.remove('loading')
      document.getElementById('container').classList.remove('animate-in')
      $parentNode.querySelector('.clone').remove()
    }, { once: true })

    raf(() => {
      const $container2 = document.getElementById('container')
      $parentNode.insertBefore($clone, $container2.nextSibling)
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
            body {
              margin: 0;
            }

            main {
              margin: 0 auto;
              min-height: 100vh;
              max-width: 768px;
              background-color: white;
            }

            .app__main {
              padding: 16px;
            }
          `}
        </style>
        <Head>

        </Head>
        <Header />
        <div className="app__main">
          {children}
        </div>
      </main>
    )
  }
}

export default App
