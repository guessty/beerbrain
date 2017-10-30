import React from 'react';
import PropTypes from 'prop-types';
import { injectInk } from 'react-md';
import { Link } from '../routes';

class InkLink extends React.PureComponent {
  render() {
    const {
      ink, route, active, children,
    } = this.props;
    return (
      <Link route={route} href={route}>
        <a
          href={route}
          className={`
            md-fake-btn md-pointer--hover md-fake-btn--no-outline md-bottom-nav md-bottom-nav--fixed
            ${active(route) ? 'md-text--theme-primary' : ''}
          `}
        >
          {ink}
          {children}
        </a>
      </Link>
    );
  }
}

InkLink.propTypes = {
  ink: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  route: PropTypes.string.isRequired,
  active: PropTypes.func.isRequired,
};

export default injectInk(InkLink);
