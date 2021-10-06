module.exports = {
  workflowCategories: [
    { id: 'marketing', name: 'Marketing'},
    { id: 'sales', name: 'Sales'},
    { id: 'reporting', name: 'Monitoring & reporting'},
    { id: 'crm', name: 'CRM'},
    { id: 'automated_testing', name: 'Automated testing'},
    { id: 'scraping', name: 'Scraping'},
    { id: 'customer_support', name: 'Customer Support'},
    { id: 'product_development', name: 'Product development'},
    { id: 'administration', name: 'Administration'},
    { id: 'hr', name: 'Human recources'},
    { id: 'other', name: 'Other'},
  ],
  triggers: {
    'urlbased': {
      active: true,
      name: 'URL based trigger',
      desc: 'Start workflow when a certain URL is reached. Choose the method (GET, POST, DELETE, PUT).'
    },
    'timebased': {
      active: true,
      name: 'Time based trigger',
      desc: 'Start workflow every x time (eg. monday, 3 minutes, ...).'
    },
    'workflow': {
      active: true,
      name: 'From another workflow',
      desc: 'Only allow other workflows to start this workflow.'
    },
    'manual': {
      active: true,
      name: 'Manual based trigger',
      desc: 'Manually start this workflow.'
    },
  }
}
