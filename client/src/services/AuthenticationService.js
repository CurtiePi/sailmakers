import Api from '@/services/Api'

export default {
  customerList () {
    return Api().insecure.get('/api/customer')
  },
  customerCreate (payload) {
    return Api().insecure.post('/api/customer/create', payload)
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
  quoteUpdate (payload) {
    return Api().insecure.post('/api/quote/update', payload)
  },
  getCustomerQuotes (payload) {
    return Api().insecure.get(`/api/quote/customer/${payload}`)
  },
  sendEmail (payload) {
    return Api().insecure.post('/api/utils/email', payload)
  },
  printQuote (payload) {
    return Api().insecure.post('/api/quote/print', payload)
  },
  salespersonByName (nameParam) {
    let url = `/api/staff/name/${nameParam}`
    console.log(url)
    return Api().insecure.get(url)
  },
  createPort (payload) {
    return Api().insecure.post('/api/port/create', payload)
  },
  getPrice (payload) {
    return Api().insecure.post('/api/quote/price', payload)
  },
  getSalespeople () {
    return Api().insecure.get('/api/staff')
  },
  createSalesperson (payload) {
    return Api().insecure.post('/api/staff/create', payload)
  },
  updateSalesperson (payload) {
    return Api().insecure.post('/api/staff/update', payload)
  },
  getEmailSalespeople () {
    return Api().insecure.get('/api/staff/emaillist')
  },
  portList () {
    return Api().insecure.get('/api/port')
  },
  pdfView (filename) {
    return `${Api().pdfUrl}${filename}`
  },
  uploadFile (payload) {
    return Api().insecure.post('api/utils/upload', payload)
  }
}
