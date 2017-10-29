import { FontIcon } from 'react-md'
import Router, { withRouter } from 'next/router'
import withRedux from 'next-redux-wrapper'
import { Badge } from 'react-md'
import raf from 'raf'
import { initStore } from '../store'
import InkLink from './InkLink'

const mainRoutes = [
  {
    label: 'Home',
    icon: 'home',
    path: '/'
  },
  {
    label: 'Search',
    icon: 'search',
    path: '/search'
  },
  {
    label: 'My Order',
    icon: 'local_drink',
    path: '/my-order'
  }
]

const urlDepth = (url) => url.split('/').filter((item) => item !== "").length

const urlRoot = (url) => `/${url.split('/').filter((item) => item !== "")[0]}`

const urlDirection = (from, to) => {
  let fromObject = mainRoutes.filter(route => route.path === from)[0]
  let toObject = mainRoutes.filter(route => route.path === to)[0]
  if (!fromObject) {
    fromObject = mainRoutes.filter(route => route.path === urlRoot(from))[0]
  }
  if (!toObject) {
    toObject = mainRoutes.filter(route => route.path === urlRoot(to))[0]
  }

  const fromIndex = mainRoutes.indexOf(fromObject)
  const toIndex = mainRoutes.indexOf(toObject)

  if (fromIndex === toIndex) {
    return (urlDepth(to) >= urlDepth(from)) ? 'left' : 'right'
  }

  return (fromIndex > toIndex) ? 'right' : 'left'
}

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

    const mainDirection = urlDirection(Router.previousUrl, url)

    $clone.addEventListener('animationend', () => {
      $clone.remove()
      $container.classList.remove('animate-in')
      $container.classList.remove('animate-in-left')
      $container.classList.remove('animate-in-right')
      $container.classList.remove('animate-out')
      $container.classList.remove('animate-out-left')
      $container.classList.remove('animate-out-right')
      $container.classList.remove('animate-static')
      Router.previousUrl = url
    }, { once: true })

    raf(() => {
      if (mainDirection === 'left') {
        $clone.classList.add('animate-out-left')
        $container.classList.add('animate-in-left')
      } else {
        $clone.classList.add('animate-out-right')
        $container.classList.add('animate-in-right')
      }
    })
  }
}

Router.onRouteChangeError = () => {
  console.log('error')
}

const mapStateToProps = (state) => {
  return {
    order: state.order,
    barDetails: state.barDetails
  }
}

export default withRedux(initStore, mapStateToProps, null)(withRouter(class FooterNav extends React.Component {
  state = { path: '' }
  componentDidMount() {
    this.updatePath(this.props.router.asPath)
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.initialPath !== nextProps.router.asPath) {
      this.updatePath(nextProps.router.asPath)
    }
  }
  updatePath(path) {
    this.setState({ path })
  }
  active(route) {
    return (route === '/search' ? this.state.path.indexOf(route) > -1 : this.state.path === route)
  }
  render() {
    const { children, noHeader, title, nav, actions, order, barDetails } = this.props
    const { path } = this.state
    return (
      <footer role="navigation" className="md-paper md-paper--1 md-bottom-navigation md-background--card">
      <style jsx>
        {`
          .md-bottom-navigation {
            position: absolute;
          }
        `}
      </style>
        <InkLink route="/" active={path => this.active(path)}>
          <FontIcon>home</FontIcon>
          <div className="md-bottom-nav-label">Home</div>
        </InkLink>
        <InkLink route={barDetails.id ? `/search/${barDetails.id}` : '/search'} active={path => this.active(path)}>
          <FontIcon>search</FontIcon>
          <div className="md-bottom-nav-label">Search</div>
        </InkLink>
        <InkLink route="/my-order" active={path => this.active(path)}>
          <Badge badgeContent={order.items.length} invisibleOnZero secondary badgeId="order-count">
            <FontIcon>local_drink</FontIcon>
            <div className="md-bottom-nav-label">My Order</div>
          </Badge>
        </InkLink>
      </footer>
    )
  }
}))
