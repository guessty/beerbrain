import React, {Component} from 'react'
import Head from 'next/head'
import { CircularProgress, FontIcon } from 'react-md'

import { Link } from '../routes'
import Header from "./Header"
import FooterNavigation from './FooterNavigation'

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
    <div className="app__fixed-elements">

    </div>
    <FooterNavigation />
  </main>
)
