import React from 'react'
import { Grid, Input, Button, Form, TextArea } from 'semantic-ui-react'

import './index.css'

export default class TicketDetails extends React.Component {
  render() {
    return (
      <div className="container">
        <Button className="button-return" onClick={this.props.history.goBack}>
        Return
        </Button>
        <Form className="form-create-ticket">
          <Grid className="input-field">
            <Grid.Row columns={4}>
              <Grid.Column width={3}>
                <label>Ticket Number</label>
              </Grid.Column>
              <Grid.Column>
                <Input type="text" />
              </Grid.Column>
              <Grid.Column width={3} floated="right">
                <label>Created at</label>
              </Grid.Column>
              <Grid.Column>
                <Input placeholder="" />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={4}>
              <Grid.Column width={3}>
                <label>Opened by</label>
              </Grid.Column>
              <Grid.Column>
                <Input placeholder="" />
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
                <label>Assigned to</label>
              </Grid.Column>
              <Grid.Column>
                <Input placeholder="Assign this ticket" />
              </Grid.Column>
              <Grid.Column width={3} floated="right">
                <label>Status</label>
              </Grid.Column>
              <Grid.Column>
                <Input placeholder="" />
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
