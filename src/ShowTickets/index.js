import React from 'react'
import {
  Table,
  Button,
  Icon,
  Form,
  Grid,
  Input,
  TextArea,
  Dropdown,
  Segment,
  List,
  Modal
} from 'semantic-ui-react'

import showTickets from '../functions/ShowTickets'
import deleteTicket from '../functions/DeleteTicket'
import addLogs from '../functions/AddLogs'
import getTicketLogs from '../functions/GetTicketLogs'
import { storeLocalstorage } from '../functions/Localstorage'
import TicketButton from './TicketButton'

import './index.css'

export default class ShowTickets extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tickets: [],
      ticketLogs: [],
      showDetails: false,
      filterStatus: '',
      message: 'Updating the ticket....'
    }
  }

  componentDidMount = async () => {
    const response = await showTickets('/')

    response
      ? this.setState({
        tickets: response.data
      })
      : this.setState({
        tickets: []
      })
  };

  getTime = () => {
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1 //+1 because january=0
    let hh = today.getHours()
    let min = today.getMinutes()
    let ss = today.getSeconds()

    const yyyy = today.getFullYear()
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    if (hh < 10) {
      hh = '0' + hh
    }
    if (min < 10) {
      min = '0' + min
    }
    if (ss < 10) {
      ss = '0' + ss
    }

    today = hh + ':' + min + ':' + ss + '  ' + dd + '/' + mm + '/' + yyyy
    return today
  };

  updateParentStatus = async status => {
    this.setState({
      status
    })

    const response = await showTickets('/')
    response
      ? this.setState({
        tickets: response.data
      })
      : this.setState({
        tickets: []
      })
  };

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
      updatedAt: response.data.createdAt,
      status: response.data.status,
      showDetails: true
    })

    const logs = await getTicketLogs(`/${ticketNumber}`)

    await this.setState({
      ticketLogs: logs.data
    })

    if (this.state.ticketLogs.length !== 0) {
      const lastLogs = this.state.ticketLogs[this.state.ticketLogs.length - 1]

      await this.setState({
        updatedAt: lastLogs.updatedAt
      })
    }

    storeLocalstorage('Ticket', ticketNumber)
  };

  handleDelete = async ticketNumber => {
    await deleteTicket(`/${ticketNumber}`)

    const response = await showTickets('/')

    response
      ? this.setState({
        tickets: response.data
      })
      : this.setState({
        tickets: []
      })
  };

  handleReturn = async () => {
    const response = await showTickets('/')

    response
      ? this.setState({
        tickets: response.data
      })
      : this.setState({
        tickets: []
      })

    this.setState({
      showDetails: false
    })
  };

  handleUpdate = async ticketNumber => {
    const number = ticketNumber

    const data = {
      ticketNumber: number,
      logs: this.state.logs,
      updatedAt: this.getTime()
    }

    const response = await addLogs(data)

    if (response) {
      this.setState({
        message: response.data.message
      })
    } else {
      this.setState({
        message: 'Unable to reach the server. Please try again later.'
      })
    }
  };

  handleClickFilter = async filterStatus => {
    await this.setState({
      filterStatus
    })
  };

  handleButtonOk = async () =>{
    const response = await showTickets('/')
    response
      ? this.setState({
        tickets: response.data
      })
      : this.setState({
        tickets: []
      })

    this.setState({
      showDetails: false
    })
  }

  render() {
    let tagOptions = [
      {
        text: 'Clear Filter',
        value: ''
      },
      {
        text: 'Open',
        value: 'Open'
      },
      {
        text: 'Active',
        value: 'Active'
      },
      {
        text: 'Failed',
        value: 'Failed'
      },
      {
        text: 'Closed',
        value: 'Closed'
      }
    ]

    if (this.state.showDetails) {
      return (
        <div>
          <div className="buttons">
            <Button className="button-return" onClick={this.handleReturn}>
              Return
            </Button>
            <TicketButton updateParentStatus={this.updateParentStatus}>
              {this.state.status}
            </TicketButton>
          </div>
          <Form className="ticket-details">
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
                  <Input disabled value={this.state.updatedAt} />
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
            <Modal
              trigger={
                <Button
                  className="button-submit"
                  onClick={() => this.handleUpdate(this.state.ticketNumber)}
                >
                  Update
                </Button>
              }
              header="Information"
              content={this.state.message}
              actions={[{ key: 'done', content: 'Ok', positive: true}]}
              onActionClick={this.handleButtonOk}
            />
            <div className="ticket-logs">
              Ticket Logs
              <Segment>
                <List divided relaxed>
                  {this.state.ticketLogs.map((log, index) => {
                    return (
                      <List.Item key={index}>
                        <List.Content>
                          <List.Header>{log.updatedAt}</List.Header>
                          {log.logs}
                        </List.Content>
                      </List.Item>
                    )
                  })}
                </List>
              </Segment>
            </div>
          </Form>
        </div>
      )
    } else {
      return (
        <div className="wrapper">
          <Dropdown
            text="Filter"
            icon="filter"
            floating
            labeled
            button
            className="icon"
          >
            <Dropdown.Menu>
              <Dropdown.Header content="Status" />
              <Dropdown.Menu scrolling>
                {tagOptions.map(option => (
                  <Dropdown.Item
                    key={option.value}
                    {...option}
                    onClick={() => this.handleClickFilter(option.value)}
                  />
                ))}
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
                } else if (this.state.filterStatus === '') {
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
