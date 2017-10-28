import React, {Component} from 'react'
import Head from 'next/head'
import raf from 'raf'
import Router from 'next/router'
import { CircularProgress } from 'react-md'

import Header from "./Header"

const urlDepth = (url) => url.split('/').filter((item) => item !== "").length

Router.onRouteChangeStart = (url) => {
  if (!Router.previousUrl) Router.previousUrl = Router.router.asPath
  if (Router.previousUrl !== url) {
    const $container = document.getElementById('container')
    const $parentNode = $container.parentNode
    const $clone = $container.cloneNode(true)
    $clone.classList.remove("_original")
    $clone.classList.add('_clone')
    $parentNode.insertBefore($clone, $container.nextSibling)
    $clone.querySelector('.app__main').scrollTop = $container.querySelector('.app__main').scrollTop
    document.body.classList.add('loading')
  }
}
Router.onRouteChangeComplete = (url) => {
  if (Router.previousUrl !== url) {
    const $container = document.querySelector('._original')
    const $parentNode = $container.parentNode
    const $clone = $parentNode.querySelector('._clone')
    const direction = (urlDepth(url) >= urlDepth(Router.previousUrl)) ? 'in' : 'out'
    document.body.classList.remove('loading')

    $clone.addEventListener('animationend', () => {
      $clone.remove()
      $container.classList.remove('animate-in')
      $container.classList.remove('animate-out')
      $container.classList.remove('animate-static')
      Router.previousUrl = url
    }, { once: true })

    raf(() => {
      if (direction === 'in') {
        $clone.classList.add('animate-static')
        $container.classList.add('animate-in')
      } else {
        $clone.classList.add('animate-out')
        $container.classList.add('animate-static')
      }
    })
  }
}
Router.onRouteChangeError = () => {
  console.log('error')
}

export default ({ children, noHeader, title, nav, actions, search, back }) => (
  <main id="container" className="_original">
    <CircularProgress
      id="general-loading"
      style={{ display: 'none', position: 'absolute', left: 'calc(50% - 24px)', top: 'calc(50% - 24px)', margin: '0' }}
      scale={2}
    />
    <div className={(noHeader) ? 'app app--no-header' : 'app'}>
      <Header title={title} nav={nav} actions={actions} search={search} back={back} />
      <div className="app__main">
        {children}
      </div>
    </div>
    <div className="app__fixed-elements" />
  </main>
)
