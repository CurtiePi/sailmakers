<template>
  <div class="container">
    <div class="row filter-div">
      <label>Name:<input type="text" v-model="f_name" @input="filterName()"></input></label>
      <label>Active Quotes:<input type="checkbox" @change="filterActive($event)"></input></label>
      <label>Quote Type:
        <select @change="filterQuoteType($event)">
          <option value="all"></option>
          <option value="New Sail">New Sail</option>
          <option value="Sail Repair">Sail Repair</option>
          <option value="Winter Service">Winter Service</option>
          <option value="Sail Cover">Sail Cover</option>
        </select>
     </label>
      <label>Quote Status:
        <select @change="filterQuoteStatus($event)">
          <option value="all"></option>
          <option value="pending">Pending</option>
          <option value="deposit">Deposit</option>
          <option value="production">In Production</option>
          <option value="ready">Ready</option>
          <option value="pickup">Pickup</option>
          <option value="delivery">Delivery</option>
          <option value="paid">Paid</option>
        </select>
     </label>
    </div>
    <div class="container">
      <h1>Customer List</h1>
      <div>
          <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Boat Name</th>
              <th>Boat Home</th>
              <th>Quotes</th>
          </tr>
          <tr v-for= "customer in customer_display"
              :key="customer._id">
              <td><router-link :to="{ name: 'CustomerProfile', params: { customer } }">{{ customer.fname }} {{ customer.lname }}</router-link></td>
              <td>{{ customer.email }}</td>
              <td>{{ customer.phone }}</td>
              <td>{{ customer.boat_name }}</td>
              <td>{{ customer.home_port }}</td>
              <td><router-link v-if="customer.quotes.length > 0" :to="{ name: 'CustomerQuotes', params: { 'payload': customer } }">{{ customer.quotes.length }}</router-link></td>
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
      customers: [],
      customer_display: [],
      f_name: null,
      f_registry: {
        nameFilter: {
          filter: [],
          status: false
        },
        activeFilter: {
          filter: [],
          status: false
        },
        typeFilter: {
          filter: [],
          status: false
        },
        statusFilter: {
          filter: [],
          status: false
        }
      }
    }
  },
  methods: {
    getCustomers: async function () {
      let response = await AuthenticationService.customerList()
      this.customers = response.data
      this.customer_display = response.data
    },
    filterName: function () {
      this.f_registry.nameFilter.filter = this.customers.filter((value) => { return (`${value.fname} ${value.lname}`).toLowerCase().indexOf(this.f_name.toLowerCase()) !== -1 })
      if (this.f_name !== '') {
        this.f_registry.nameFilter.status = true
      } else {
        this.f_registry.nameFilter.status = false
      }

      this.applyFilters()
    },
    filterActive: function (evt) {
      if (evt.target.checked) {
        console.log("I've been checked")
        this.f_registry.activeFilter.filter = this.customers.filter((value) => { return value.quotes.reduce((acc, val) => { return acc || val.isActive }, false) })
        this.f_registry.activeFilter.status = true
      } else {
        console.log("I've been UNchecked")
        this.f_registry.activeFilter.status = false
      }
      this.applyFilters()
    },
    filterQuoteType: function (evt) {
      if (evt.target.value !== 'all') {
        this.f_registry.typeFilter.filter = this.customers.filter((cus) => { return cus.quotes.reduce((acc, val) => { return acc || val.quote_type.indexOf(evt.target.value) !== -1 }, false) })
        this.f_registry.typeFilter.status = true
      } else {
        this.f_registry.typeFilter.status = false
      }
      this.applyFilters()
    },
    filterQuoteStatus: function (evt) {
      if (evt.target.value !== 'all') {
        this.f_registry.statusFilter.filter = this.customers.filter((cust) => { return cust.quotes.reduce((acc, val) => { return acc || val.status.indexOf(evt.target.value) !== -1 }, false) })
        this.f_registry.statusFilter.status = true
      } else {
        this.f_registry.statusFilter.status = false
      }
      this.applyFilters()
    },
    applyFilters: function () {
      var filterObj = {}
      var haveEmptyFilter = false
      var hasActiveFilters = false

      for (var key in this.f_registry) {
        var filterLength = this.f_registry[key].filter.length
        if (this.f_registry[key].status && filterLength > 0) {
          console.log(`${key} filter has a length of ${filterLength}`)
          filterObj[key] = this.f_registry[key].filter
          hasActiveFilters = true
        } else if (this.f_registry[key].status && filterLength === 0) {
          console.log(`${key} filter has a length of ${filterLength}`)
          haveEmptyFilter = true
          hasActiveFilters = true
        }
      }

      if (hasActiveFilters) {
        if (haveEmptyFilter) {
          this.customer_display = []
        } else {
          var result = Object
            .values(filterObj)
            .reduce((a, b) => b.filter(Set.prototype.has, new Set(a)))

          this.customer_display = result
        }
      } else {
        this.customer_display = this.customers
      }
    }
  },
  mounted () {
    this.getCustomers()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

.filter-div > * {
    margin: 0 8px;
    vertical-align: middle;
}

td, th {
  padding: 5px;
}

tr:nth-child(even) {
    background-color: #eeeeee;
}

tr:nth-child(odd) {
    background-color: #cccccc;
}
</style>
