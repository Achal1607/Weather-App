import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
import WorldClock from './WorldClock'

export default class ClassModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isTrue: false
    }
  }
  handleClick = () => {
    this.setState(prevState => ({ isTrue: !prevState.isTrue }))
  }
  render() {
    return (
      <>
        <div className='col-2 row'>
          <Button variant="primary" onClick={this.handleClick}>
            Date And Time
        </Button>
          <Modal show={this.state.isTrue} onHide={this.handleClick}>
            <Modal.Header closeButton>
              <Modal.Title>Date And Time</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <WorldClock timezone={this.props.timezone} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClick}>
                Close
        </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    )
  }
}