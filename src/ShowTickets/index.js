import React from 'react'
import {
  Table,
  Button,
  Icon,
  Form,
  Grid,
  Input,
  TextArea
} from 'semantic-ui-react'

import showTickets from '../functions/ShowTickets'

import './index.css'

export default class ShowTickets extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tickets: [],
      showDetails: false
    }
  }

  componentDidMount = async () => {
    const response = await showTickets('/')

    this.setState({
      tickets: response.data
    })
  };

  handleEdit = async (ticketNumber) => {
    const response = await showTickets(`/${ticketNumber}`)

    this.setState({
      ticketNumber,
      name: response.data.name,
      phoneNumber: response.data.phoneNumber,
      email: response.data.email,
      description: response.data.description,
      createdAt: response.data.createdAt,
      status: response.data.status,
      showDetails: true
    })
  };

  // handleDelete = async (ticketNumber) => {
  //   const response = await showTickets(`/${ticketNumber}`)

  //   this.setState({
  //     ticketNumber,
  //     name: response.data.name,
  //     phoneNumber: response.data.phoneNumber,
  //     email: response.data.email,
  //     description: response.data.description,
  //     createdAt: response.data.createdAt,
  //     status: response.data.status,
  //     showDetails: true
  //   })
  // };

  handleReturn = () => {
    this.setState({
      showDetails: false
    })
  };

  render() {
    if (this.state.showDetails) {
      return (
        <div className="container">
          <Button className="button-return" onClick={this.handleReturn}>
            Return
          </Button>
          <Form className="form-create-ticket">
            <Grid className="input-field">
              <Grid.Row columns={4}>
                <Grid.Column width={3}>
                  <label>Ticket Number</label>
                </Grid.Column>
                <Grid.Column>
                  <Input disabled value={'INC' + this.state.ticketNumber}/>
                </Grid.Column>
                <Grid.Column width={3} floated="right">
                  <label>Created at</label>
                </Grid.Column>
                <Grid.Column>
                  <Input disabled value={this.state.createdAt}/>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={4}>
                <Grid.Column width={3}>
                  <label>Opened by</label>
                </Grid.Column>
                <Grid.Column>
                  <Input disabled value={this.state.name}/>
                </Grid.Column>
                <Grid.Column width={3} floated="right">
                  <label>Updated at</label>
                </Grid.Column>
                <Grid.Column>
                  <Input placeholder="" />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={4}>
                <Grid.Column width={3}>
                  <label>Phone Number</label>
                </Grid.Column>
                <Grid.Column>
                  <Input disabled value={this.state.phoneNumber}/>
                </Grid.Column>
                <Grid.Column width={3} floated="right">
                  <label>Status</label>
                </Grid.Column>
                <Grid.Column>
                  <Input disabled value={this.state.status}/>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={2}>
                <Grid.Column width={3}>
                  <label>Email</label>
                </Grid.Column>
                <Grid.Column>
                  <Input disabled value={this.state.email}/>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={2}>
                <Grid.Column width={3}>
                  <label>Description</label>
                </Grid.Column>
                <Grid.Column>
                  <Input fluid disabled value={this.state.description}/>
                </Grid.Column>
              </Grid.Row>

            </Grid>

            <label>Logs</label>
            <TextArea
              className="worknotes"
              placeholder="Work notes"
              style={{ minHeight: 120 }}
              autoHeight
            />

            <Button className="button-submit">Update</Button>
          </Form>
        </div>
      )
    } else {
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
                <Table.Row key={index + 1}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{ticket.name}</Table.Cell>
                  <Table.Cell>{ticket.description}</Table.Cell>
                  <Table.Cell>{ticket.status}</Table.Cell>
                  <Table.Cell>
                    <Button
                      icon
                      className="buttons-action"
                      onClick={() => this.handleEdit(ticket.ticketNumber)}
                    >
                      <Icon name="edit" />
                    </Button>
                    <Button icon className="buttons-action" onClick={() => this.handleDelete(ticket.ticketNumber)}>
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
}
