import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

import updateTicket from '../../functions/UpdateTicket'
import { getLocalstorage } from '../../functions/Localstorage'

import './index.css'

export default class TicketButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: props.children
    }
  }

  handleClickActive = async () => {
    const ticketNumber = await getLocalstorage('Ticket')

    const status = 'Active'
    const updatedData = { status }

    await updateTicket(`/${ticketNumber}`, updatedData)
    await this.setState(updatedData)
    this.props.updateParentStatus && this.props.updateParentStatus(status)
  };
  
  handleClickReject = async () => {
    const ticketNumber = await getLocalstorage('Ticket')

    const status = 'Failed'
    const updatedData = { status }

    await updateTicket(`/${ticketNumber}`, updatedData)
    await this.setState(updatedData)
    this.props.updateParentStatus && this.props.updateParentStatus(status)
  };

  handleClickClose = async () => {
    const ticketNumber = await getLocalstorage('Ticket')

    const status = 'Closed'
    const updatedData = { status }

    await updateTicket(`/${ticketNumber}`, updatedData)
    await this.setState(updatedData)
    this.props.updateParentStatus && this.props.updateParentStatus(status)
  };

  render() {
    let view = ''

    if (this.state.status === 'Open') {
      view = (
        <div>
          <Button className="button-ticket" onClick={this.handleClickActive}>
            Set Active
          </Button><Button className="button-ticket" onClick={this.handleClickReject}>
            Reject Ticket
          </Button>
        </div>
      )
    } else if (this.state.status === 'Active') {
      view = (
        <Button className="button-ticket" onClick={this.handleClickClose}>
          Close Ticket
        </Button>
      )
    }

    return view
  }
}
