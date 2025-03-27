import axios from 'axios'

export default () => {
  return { insecure: axios.create({
    baseURL: 'http://192.168.12.110:8860'
  }),

  secure: axios.create({
    baseURL: 'https://192.168.12.110:8993',
    withCredentials: true
  }),

  pdfUrl: 'http://192.168.12.110:8860/pdf/'
  }
}
