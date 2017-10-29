import {
  Button, TextField, FontIcon,
  IconSeparator, Avatar, Grid,
} from 'react-md'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'
import { Link } from '../routes'
import App from '../components/App'

export default withRedux(initStore)(() => (
  <App
    title={(
      <IconSeparator label="Beer2.me" iconBefore component="span">
        <Avatar suffix="light_blue" icon={<FontIcon>local_drink</FontIcon>} />
      </IconSeparator>
    )}
    search
    noHeader
  >
    <style jsx>
      {`
        .app__main {
          background-color: blue;
        }
      `}
    </style>
    <Grid style={{ padding: '16px' }}>
      <div className=" md-text-center">
        <FontIcon className="md-display-3" style={{ fontSize: '4rem' }}>local_drink</FontIcon>
        <h1 className="md-display-3">BeerBrain.io</h1>
        <h2 className="md-display-1">The easy way to remember your order</h2>
        <Link route="/search">
          <Button
            raised primary iconChildren="search"
            style={{ fontSize: '1.3rem', height: '52px', marginTop: '1rem' }}
          >
            Find a bar or pub
          </Button>
        </Link>
      </div>
    </Grid>
  </App>
))
