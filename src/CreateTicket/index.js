import React from 'react'

import { Grid, Input, Button, Form, TextArea } from 'semantic-ui-react'

import './index.css'

export default class CreateTicketForm extends React.Component {
  render() {
    return (
      <div className="container">
        <Form className="form-create-ticket">
          <Grid className="input-field">
            <Grid.Row columns={2}>
              <Grid.Column width={3}>
                <label>Opened by</label>
              </Grid.Column>
              <Grid.Column>
                <Input placeholder="Your name" />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column width={3}>
                <label>Phone Number</label>
              </Grid.Column>
              <Grid.Column width={5}>
                <Input placeholder="Your phone number" />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column width={3}>
                <label>Email</label>
              </Grid.Column>
              <Grid.Column width={5}>
                <Input type="email" placeholder="Your email" />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column width={3}>
                <label>Description</label>
              </Grid.Column>
              <Grid.Column>
                <Input width={10} placeholder="Issue short description" />
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

          <Button className="button-submit">Submit</Button>
        </Form>
      </div>
    )
  }
}
