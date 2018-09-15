import React from 'react'
import {
  Table,
  Button,
  Icon,
  Form,
  Grid,
  Input,
  TextArea,
  Dropdown
} from 'semantic-ui-react'

import showTickets from '../functions/ShowTickets'
import updateTicket from '../functions/UpdateTicket'
import deleteTicket from '../functions/DeleteTicket'
import {storeLocalstorage} from '../functions/Localstorage'
import TicketButton from './TicketButton'

import './index.css'

export default class ShowTickets extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tickets: [],
      showDetails: false,
      filterStatus: ''
    }
  }

  componentDidMount = async () => {
    const response = await showTickets('/')

    this.setState({
      tickets: response.data
    })
  };

  updateParentStatus = async (status) => {
    this.setState({
      status
    })

    const response = await showTickets('/')
    this.setState({
      tickets: response.data
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  handleEdit = async ticketNumber => {
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

    storeLocalstorage('Ticket', ticketNumber)
  };

  handleDelete = async ticketNumber => {
    await deleteTicket(`/${ticketNumber}`)

    const response = await showTickets('/')

    this.setState({
      tickets: response.data
    })
  };

  handleReturn = async () => {
    const response = await showTickets('/')

    this.setState({
      tickets: response.data
    })

    this.setState({
      showDetails: false
    })
  };

  handleUpdate = async (event) => {
    event.preventDefault()

    const data = {
      logs: this.state.logs
    }

    await updateTicket(`/${this.state.ticketNumber}` , data)
  };

  handleClickFilter = async (filterStatus) => {
    await this.setState({
      filterStatus
    })
  }

  render() {
    let tagOptions = [
      {
        text: 'Clear Filter',
        value: ''
      },{
        text: 'Open',
        value: 'Open'
      }, {
        text: 'Active',
        value: 'Active'
      }, {
        text: 'Failed',
        value: 'Failed'
      }, {
        text: 'Closed',
        value: 'Closed'
      }
    ]

    if (this.state.showDetails) {
      return (
        <div className="container">
          <div className="buttons" >
            <Button className="button-return" onClick={this.handleReturn}>
            Return
            </Button>
            <TicketButton updateParentStatus={this.updateParentStatus}>
              {this.state.status}
            </TicketButton>
          </div>
          <Form className="form-create-ticket">
            <Grid className="input-field">
              <Grid.Row columns={4}>
                <Grid.Column width={3}>
                  <label>Ticket Number</label>
                </Grid.Column>
                <Grid.Column>
                  <Input disabled value={'INC' + this.state.ticketNumber} />
                </Grid.Column>
                <Grid.Column width={3} floated="right">
                  <label>Created at</label>
                </Grid.Column>
                <Grid.Column>
                  <Input disabled value={this.state.createdAt} />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={4}>
                <Grid.Column width={3}>
                  <label>Opened by</label>
                </Grid.Column>
                <Grid.Column>
                  <Input disabled value={this.state.name} />
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
                  <Input disabled value={this.state.phoneNumber} />
                </Grid.Column>
                <Grid.Column width={3} floated="right">
                  <label>Status</label>
                </Grid.Column>
                <Grid.Column>
                  <Input disabled value={this.state.status} />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={2}>
                <Grid.Column width={3}>
                  <label>Email</label>
                </Grid.Column>
                <Grid.Column>
                  <Input disabled value={this.state.email} />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={2}>
                <Grid.Column width={3}>
                  <label>Description</label>
                </Grid.Column>
                <Grid.Column>
                  <Input fluid disabled value={this.state.description} />
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <label>Logs</label>
            <TextArea
              name="logs"
              className="worknotes"
              placeholder="Work notes"
              style={{ minHeight: 120 }}
              autoHeight
              onChange={this.handleChange}
            />

            <Button className="button-submit" onClick={this.handleUpdate}>
              Update
            </Button>
          </Form>
        </div>
      )
    } else {
      return (
        <div>
          <Dropdown text='Filter' icon='filter' floating labeled button className='icon'>
            <Dropdown.Menu>
              <Dropdown.Header content='Status' />
              <Dropdown.Menu scrolling>
                {tagOptions.map(option => <Dropdown.Item key={option.value} {...option} onClick={() => this.handleClickFilter(option.value)} />)}
              </Dropdown.Menu>
            </Dropdown.Menu>
          </Dropdown>

          <Table basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.tickets.reverse().map((ticket, index) => {
                if (ticket.status === this.state.filterStatus) {
                  return (
                    <Table.Row key={index + 1}>
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
                        <Button
                          icon
                          className="buttons-action"
                          onClick={() => this.handleDelete(ticket.ticketNumber)}
                        >
                          <Icon name="delete" />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  )
                } else if (this.state.filterStatus === '' ) {
                  return (
                    <Table.Row key={index + 1}>
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
                        <Button
                          icon
                          className="buttons-action"
                          onClick={() => this.handleDelete(ticket.ticketNumber)}
                        >
                          <Icon name="delete" />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  )
                }
              })}
            </Table.Body>
          </Table>
        </div>
      )
    }
  }
}
