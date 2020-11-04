<template>
  <div class="container">
    <h1>Quotes for {{ customer.fname }} {{ customer.lname }}</h1>
    <div>
        <tr>
            <th>Quote Date</th>
            <th>Sail Request</th>
            <th>Delivery Type</th>
        </tr>
        <tr v-for= "quote in quotes"
            :key="quote._id">
            <td><router-link :to="{ name: 'QuoteDisplay', params: { 'payload': quote } }">{{ quote.createdAt }}</router-link></td>
            <td>{{ quote.sail_request }}</td>
            <td>{{ quote.delivery_type }}</td>
        </tr>
    </div>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'quoteList',
  props: ['payload'],
  data () {
    return {
      quotes: [],
      customer: null
    }
  },
  methods: {
    getCustomerQuotes: async function (customerId) {
      let response = await AuthenticationService.getCustomerQuotes(customerId)
      this.quotes = response.data
      console.lot(this.quotes)
    }
  },
  mounted () {
    if (this.payload) {
      this.customer = this.payload
      this.getCustomerQuotes(this.customer._id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
