import React from 'react'
import { Toolbar } from 'react-md'

export default ({ title, nav, actions }) => (
  <Toolbar
    colored
    title={title}
    nav={nav}
    actions={actions}
  />
)
