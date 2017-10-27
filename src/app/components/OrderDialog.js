import React, { PureComponent } from 'react'
import {
  Button,
  DialogContainer,
  Toolbar,
} from 'react-md'

export default class OrderDialog extends PureComponent {
  state = { visible: false, pageX: null, pageY: null }
  show = (e) => {
    // provide a pageX/pageY to the dialog when making visible to make the
    // dialog "appear" from that x/y coordinate
    let { pageX, pageY } = e
    if (e.changedTouches) {
      pageX = e.changedTouches[0].pageX
      pageY = e.changedTouches[0].pageY
    }

    this.setState({ visible: true, pageX, pageY })
  };

  hide = () => {
    this.setState({ visible: false })
  };

  render() {
    const { visible, pageX, pageY } = this.state

    return (
      <div>
        <Button
          floating secondary fixed
          fixedPosition="br"
          style={{ position: 'absolute' }}
          onClick={this.show}
          aria-controls="simple-full-page-dialog">
          local_drink
        </Button>
        <DialogContainer
          id="simple-full-page-dialog"
          visible={visible}
          pageX={pageX}
          pageY={pageY}
          fullPage
          onHide={this.hide}
          aria-labelledby="simple-full-page-dialog-title"
        >
          <Toolbar
            fixed
            colored
            title="My Order"
            titleId="simple-full-page-dialog-title"
            nav={<Button icon onClick={this.hide}>close</Button>}
          />
          <section className="md-toolbar-relative">
          </section>
        </DialogContainer>
      </div>
    )
  }
}
