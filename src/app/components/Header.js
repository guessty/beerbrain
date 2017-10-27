import React from 'react'
import { Button, Toolbar } from 'react-md'
import { withRouter } from 'next/router'

import { Link } from '../routes'

export default withRouter(({ title, nav, actions, back, search, router }) => (
  <Toolbar
    colored
    title={title}
    nav={
      <div>
        {
          (back) ? (
            <Button
              key="nav"
              icon
              onClick={() => router.back()}
            >
              arrow_back
            </Button>
          ) : null
        }
        {nav}
      </div>
    }
    actions={(
      <div>
        {
          (search) ? (
            <Link href="/search">
              <Button
                key="nav"
                icon
              >
                search
              </Button>
            </Link>
          ) : null
        }
        {actions}
      </div>
    )}
  />
))
