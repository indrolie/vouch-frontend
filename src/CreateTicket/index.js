import React from 'react'

import { Grid, Input, Button, Form, TextArea } from 'semantic-ui-react'
import createTicket from '../functions/CreateTicket'

import './index.css'

export default class CreateTicketForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      phoneNumber: '',
      email: '',
      description: '',
      logs: ''
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  handleSubmit = async (event) => {
    event.preventDefault()

    const data = {
      name: this.state.name,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      description: this.state.description,
      logs: this.state.logs
    }

    await createTicket(data)
  };

  render() {
    return (
      <div className="container">
        <Form className="form-create-ticket" onSubmit={this.handleSubmit}>
          <Grid className="input-field">
            <Grid.Row columns={2}>
              <Grid.Column width={3}>
                <label>Opened by</label>
              </Grid.Column>
              <Grid.Column>
                <Input name='name' placeholder="Your name" onChange={this.handleChange}/>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column width={3}>
                <label>Phone Number</label>
              </Grid.Column>
              <Grid.Column>
                <Input name='phoneNumber' placeholder="Your phone number" onChange={this.handleChange} />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column width={3}>
                <label>Email</label>
              </Grid.Column>
              <Grid.Column>
                <Input name='email' type="email" placeholder="Your email"  onChange={this.handleChange}/>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column width={3}>
                <label>Description</label>
              </Grid.Column>
              <Grid.Column>
                <Input fluid name='description' placeholder="Issue short description"  onChange={this.handleChange}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <label>Logs</label>
          <TextArea
            name='logs'
            className="worknotes"
            placeholder="Work notes"
            style={{ minHeight: 120 }}
            autoHeight
            onChange={this.handleChange}
          />

          <Button className="button-submit">Submit</Button>
        </Form>
      </div>
    )
  }
}
