import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: () => import('../components/Hello.vue')
    },
    {
      path: '/customers',
      name: 'Customers',
      component: () => import('../components/CustomerList.vue')
    },
    {
      path: '/customer',
      name: 'CustomerProfile',
      component: () => import('../components/CustomerProfile.vue'),
      props: true
    },
    {
      path: '/customer_add',
      name: 'CustomerAdd',
      component: () => import('../components/CustomerForm.vue'),
      props: true
    },
    {
      path: '/customer_quotes',
      name: 'CustomerQuotes',
      component: () => import('../components/CustomerQuotesList.vue'),
      props: true
    },
    {
      path: '/quotes',
      name: 'Quotes',
      component: () => import('../components/QuotesList.vue')
    },
    {
      path: '/quote_create',
      name: 'QuoteCreate',
      component: () => import('../components/QuoteForm.vue'),
      props: true
    },
    {
      path: '/quote_display',
      name: 'QuoteDisplay',
      component: () => import('../components/QuoteDisplay.vue'),
      props: true
    },
    {
      path: '/new_customer_quote',
      name: 'NewCustomerQuote',
      components: () => import('../components/CustomerForm.vue'),
      props: true
    },
    {
      path: '/ports',
      name: 'PortsList',
      component: () => import('../components/PortsList.vue')
    },
    {
      path: '/port_create',
      name: 'PortCreate',
      component: () => import('../components/PortForm.vue'),
      props: true
    }
  ]
})
