import Api from '@/services/Api'

export default {
  login (credentials) {
    return Api().secure.post('/login', credentials)
  },
  logout (credentials) {
    let config = {
      headers: {
        'Authorization': `Bearer ${credentials}`
      }
    }
    return Api().insecure.get('/logout', config)
  },
  refresh () {
    return Api().secure.get('/refresh')
  },
  customerList () {
    return Api().insecure.get('/api/customer')
  },
  customerUpdate (payload) {
    return Api().insecure.post('/api/customer/update', payload)
  },
  quoteList () {
    return Api().insecure.get('/api/quote')
  },
  quoteCreate (payload) {
    return Api().insecure.post('/api/quote/create', payload)
  },
  getCustomerQuotes (payload) {
    return Api().insecure.get(`/api/quote/customer/${payload}`)
  },
  emailQuote (payload) {
    return Api().insecure.post('/api/quote/email', payload)
  },
  salespersonByName (nameParam) {
    let url = `/api/staff/name/${nameParam}`
    console.log(url)
    return Api().insecure.get(url)
  }
}
