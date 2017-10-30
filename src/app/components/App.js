import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, CircularProgress } from 'react-md';
import FooterNavigation from './FooterNavigation';

const App = ({
  children, noHeader, title, nav, actions, mainClassName,
}) => (
  <main id="container" className="_original">
    <CircularProgress
      id="general-loading"
      style={{
        display: 'none', position: 'absolute', left: 'calc(50% - 24px)', top: 'calc(50% - 24px)', margin: '0',
      }}
      scale={2}
    />
    <div className={(noHeader) ? 'app app--no-header' : 'app'}>
      <Toolbar
        colored
        title={title}
        nav={nav}
        actions={actions}
      />
      <div className={`app__main ${mainClassName}`}>
        {children}
      </div>
    </div>
    <FooterNavigation />
  </main>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
  noHeader: PropTypes.bool,
  mainClassName: PropTypes.string,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf,
  ]),
  nav: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf,
  ]),
  actions: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf,
  ]),
};

App.defaultProps = {
  noHeader: false,
  mainClassName: '',
  title: '',
  nav: <div />,
  actions: <div />,
};

export default App;
