import React from 'react'
import { Tab } from 'semantic-ui-react'

import CreateTicketForm from '../CreateTicket'
import ShowTickets from '../ShowTickets'

const panes = [
  {
    menuItem: 'Create ticket',
    render: () => (
      <Tab.Pane>
        <CreateTicketForm />
      </Tab.Pane>
    )
  },
  {
    menuItem: 'Show tickets',
    render: () => (
      <Tab.Pane>
        <ShowTickets />
      </Tab.Pane>
    )
  }
]

const MyMenu = () => (
  <Tab
    menu={{ fluid: true, vertical: true }}
    menuPosition="left"
    panes={panes}
  />
)

export default MyMenu
