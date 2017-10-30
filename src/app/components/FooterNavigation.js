import React from 'react';
import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { FontIcon, Badge } from 'react-md';
import raf from 'raf';
import InkLink from './InkLink';

const mainRoutes = [
  {
    label: 'Home',
    icon: 'home',
    path: '/',
  },
  {
    label: 'Search',
    icon: 'search',
    path: '/search',
  },
  {
    label: 'My Order',
    icon: 'local_drink',
    path: '/my-order',
  },
];

const urlDepth = url => url.split('/').filter(item => item !== '').length;

const urlRoot = url => `/${url.split('/').filter(item => item !== '')[0]}`;

const urlDirection = (from, to) => {
  let [fromObject] = mainRoutes.filter(route => route.path === from);
  let [toObject] = mainRoutes.filter(route => route.path === to);
  if (!fromObject) {
    [fromObject] = mainRoutes.filter(route => route.path === urlRoot(from));
  }
  if (!toObject) {
    [toObject] = mainRoutes.filter(route => route.path === urlRoot(to));
  }

  const fromIndex = mainRoutes.indexOf(fromObject);
  const toIndex = mainRoutes.indexOf(toObject);

  if (fromIndex === toIndex) {
    return (urlDepth(to) >= urlDepth(from)) ? 'left' : 'right';
  }

  return (fromIndex > toIndex) ? 'right' : 'left';
};

Router.onRouteChangeStart = (url) => {
  if (!Router.previousUrl) Router.previousUrl = Router.router.asPath;
  if (Router.previousUrl !== url) {
    const $container = document.getElementById('container');
    const $parentNode = $container.parentNode;
    const $clone = $container.cloneNode(true);
    $clone.classList.remove('_original');
    $clone.classList.add('_clone');
    $parentNode.insertBefore($clone, $container.nextSibling);
    $clone.querySelector('.app__main').scrollTop = $container.querySelector('.app__main').scrollTop;
    document.body.classList.add('loading');
  }
};

Router.onRouteChangeComplete = (url) => {
  if (Router.previousUrl !== url) {
    const $container = document.querySelector('._original');
    const $parentNode = $container.parentNode;
    const $clone = $parentNode.querySelector('._clone');
    document.body.classList.remove('loading');
    const mainDirection = urlDirection(Router.previousUrl, url);

    $clone.addEventListener('animationend', () => {
      $clone.remove();
      $container.classList.remove('animate-in-left');
      $container.classList.remove('animate-in-right');
      $container.classList.remove('animate-out-left');
      $container.classList.remove('animate-out-right');
      Router.previousUrl = url;
    }, { once: true });

    raf(() => {
      if (mainDirection === 'left') {
        $clone.classList.add('animate-out-left');
        $container.classList.add('animate-in-left');
      } else {
        $clone.classList.add('animate-out-right');
        $container.classList.add('animate-in-right');
      }
    });
  }
};

class FooterNavigation extends React.Component {
  state = { path: '' }
  componentDidMount() {
    this.updatePath(this.props.router.asPath);
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.initialPath !== nextProps.router.asPath) {
      this.updatePath(nextProps.router.asPath);
    }
  }
  updatePath(path) {
    this.setState({ path });
  }
  active(route) {
    return (route === '/search' ? this.state.path.indexOf(route) > -1 : this.state.path === route);
  }
  render() {
    const { order, barDetails } = this.props;
    return (
      <footer role="navigation" className="md-paper md-paper--1 md-bottom-navigation md-background--card">
        <InkLink route="/" active={route => this.active(route)}>
          <FontIcon>home</FontIcon>
          <div className="md-bottom-nav-label">Home</div>
        </InkLink>
        <InkLink route={barDetails.id ? `/search/${barDetails.id}` : '/search'} active={route => this.active(route)}>
          <FontIcon>search</FontIcon>
          <div className="md-bottom-nav-label">Search</div>
        </InkLink>
        <InkLink route="/my-order" active={route => this.active(route)}>
          <Badge badgeContent={order.items.length} invisibleOnZero secondary badgeId="order-count">
            <FontIcon>local_drink</FontIcon>
            <div className="md-bottom-nav-label">My Order</div>
          </Badge>
        </InkLink>
      </footer>
    );
  }
}

const mapStateToProps = state => ({
  order: state.order,
  barDetails: state.barDetails,
});

FooterNavigation.propTypes = {
  order: PropTypes.object,
  barDetails: PropTypes.object,
  router: PropTypes.object,
};

FooterNavigation.defaultProps = {
  order: {},
  barDetails: {},
  router: {},
};

export default connect(mapStateToProps, null)(withRouter(FooterNavigation));
