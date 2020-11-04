<template>
  <div class="container">
    <div>
      <p>PUT FILTER HERE</p>
    </div>
    <div class="container">
      <h1>Quotes List</h1>
      <div>
        <tr>
          <th>Customer</th>
          <th>Quote Type</th>
          <th>Status</th>
          <th>Active</th>
          <th>Paid</th>
          <th>Balace Due</th>
          <th>Open Date</th>
        </tr>
        <tr v-for= "quote in quotes"
          :key="quote._id">
          <td><router-link :to="{ name: 'CustomerProfile', params:  testMe(quote)  }">{{ quote.customer.fname }} {{ quote.customer.lname }}</router-link></td>
          <td>{{ quote.quote_type }}</td>
          <td>{{ quote.status }}</td>
          <td>{{ (quote.isActive ? 'Y' : 'N') }}</td>
          <td>{{ quote.paid }}</td>
          <td>{{ quote.balance_due }}</td>
          <td>{{ quote.createdAt }}</td>
        </tr>
      </div>
    </div>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'quoteList',
  data () {
    return {
      quotes: []
    }
  },
  methods: {
    getQuotes: async function () {
      let response = await AuthenticationService.quoteList()
      this.quotes = response.data
    },
    testMe: function (value) {
      return {'payload': value.customer}
    }
  },
  mounted () {
    this.getQuotes()
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
