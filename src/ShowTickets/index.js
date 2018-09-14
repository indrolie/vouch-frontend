import React from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'

import showTickets from '../functions/ShowTickets'

import './index.css'

export default class ShowTickets extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tickets: []
    }
  }

  componentDidMount = async () => {
    const response = await showTickets()

    this.setState({
      tickets: response.data
    })
  };

  render() {
    return (
      <Table basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>No</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.tickets.map((ticket, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{ticket.name}</Table.Cell>
                <Table.Cell>{ticket.description}</Table.Cell>
                <Table.Cell>{ticket.status}</Table.Cell>
                <Table.Cell>
                  <Button icon className="buttons-action">
                    <Icon name="edit" />
                  </Button>
                  <Button icon className="buttons-action">
                    <Icon name="delete" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    )
  }
}
