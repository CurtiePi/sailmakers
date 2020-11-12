export default {
  inputFields: [
    {
      name: 'status',
      label: 'Status',
      type: 'radio',
      options: [
        {name: 'Quote Request'},
        {name: 'Pending'},
        {name: 'Production'},
        {name: 'Ready'},
        {name: 'Delivered'}
      ],
      isEditOnly: true,
      inCustomer: false,
      value: null
    },
    {
      name: 'amount_paid',
      label: 'Amount paid',
      type: 'number',
      isEditOnly: true,
      inCustomer: false,
      value: null
    },
    {
      name: 'balance_due',
      label: 'Balance Due',
      type: 'number',
      isEditOnly: true,
      inCustomer: false,
      value: null
    },
    {
      name: 'customer',
      label: 'Name',
      type: 'text',
      isEditOnly: false,
      inCustomer: true,
      value: null
    },
    {
      name: 'quote_type',
      label: 'Quote Type',
      type: 'checkbox',
      options: [
        {name: 'New Sail'},
        {name: 'Sail Repair'},
        {name: 'Winter Service'},
        {name: 'Sail Cover'}
      ],
      isEditOnly: false,
      inCustomer: false,
      value: null
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'text',
      isEditOnly: false,
      inCustomer: true,
      value: null
    },
    {
      name: 'sail_request',
      label: 'Sail Requested',
      type: 'textarea',
      cols: 60,
      rows: 2,
      isEditOnly: false,
      inCustomer: false,
      value: null
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      isEditOnly: false,
      inCustomer: true,
      value: null
    },
    {
      name: 'battens',
      label: 'Battens',
      type: 'text',
      isEditOnly: false,
      inCustomer: false,
      value: null
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
      isEditOnly: false,
      inCustomer: true,
      value: null
    },
    {
      name: 'reefing_pts',
      label: 'Reefing Points',
      type: 'number',
      isEditOnly: false,
      inCustomer: false,
      value: null
    },
    {
      name: 'boat_model',
      label: 'Boat',
      type: 'text',
      isEditOnly: false,
      inCustomer: true,
      value: null
    },
    {
      name: 'num_logo',
      label: 'Numbers/Logos',
      type: 'text',
      isEditOnly: false,
      inCustomer: false,
      value: null
    },
    {
      name: 'boat_name',
      label: 'Boat Name',
      type: 'text',
      isEditOnly: false,
      inCustomer: true,
      value: null
    },
    {
      name: 'furl_sys',
      label: 'Furling System',
      type: 'text',
      isEditOnly: false,
      inCustomer: false,
      value: null
    },
    {
      name: 'home_port',
      label: 'Home Port',
      type: 'text',
      isEditOnly: false,
      inCustomer: true,
      value: null
    },
    {
      name: 'uv_color',
      label: 'UV Color',
      type: 'text',
      isEditOnly: false,
      inCustomer: false,
      value: null
    },
    {
      name: 'delivery_type',
      label: 'Sail pick up/Drop off',
      type: 'text',
      isEditOnly: false,
      inCustomer: false,
      value: null
    },
    {
      name: 'sailing_type',
      label: 'Type of Sailing',
      type: 'textarea',
      cols: 60,
      rows: 2,
      isEditOnly: false,
      inCustomer: false,
      value: null
    },
    {
      name: 'notes',
      label: 'Additional Notes',
      type: 'textarea',
      cols: 60,
      rows: 6,
      isEditOnly: false,
      inCustomer: false,
      value: null
    }
  ]
}
