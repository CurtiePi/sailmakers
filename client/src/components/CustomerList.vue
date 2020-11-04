<template>
  <div class="container">
    <div>
      <p>PUT FILTER HERE</p>
    </div>
    <div class="container">
      <h1>Customer List</h1>
      <div>
          <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Quote No.</th>
              <th>Boat Name</th>
              <th>Boat Home</th>
          </tr>
          <tr v-for= "customer in customers"
              :key="customer._id">
              <td><router-link :to="{ name: 'CustomerProfile', params: { customer } }">{{ customer.fname }} {{ customer.lname }}</router-link></td>
              <td>{{ customer.email }}</td>
              <td>{{ customer.phone }}</td>
              <td><router-link v-if="customer.quotes.length > 0" :to="{ name: 'CustomerQuotes', params: { 'payload': customer } }">{{ customer.quotes.length }}</router-link></td>
              <td>{{ customer.boat_name }}</td>
              <td>{{ customer.boat_home }}</td>
          </tr>
      </div>
    </div>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'customerList',
  data () {
    return {
      customers: []
    }
  },
  methods: {
    getCustomers: async function () {
      let response = await AuthenticationService.customerList()
      this.customers = response.data
    }
  },
  mounted () {
    this.getCustomers()
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
