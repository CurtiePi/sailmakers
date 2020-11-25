<template>
  <div class="container">
    <div class="row filter-div">
      <span>
        <label>Active Quotes:<input type="checkbox" @change="filterActive($event)" /></label>
      </span>
      <span class="quote_types">
        <label>New Sail
          <input type="checkbox" name="q_type" value="new sail" 
            @change="filterQuoteType()"
            v-model="quote_type" />
        </label>
        <label>Sail Repair
          <input type="checkbox" name="q_type" value="sail repair"
            @change="filterQuoteType()"
            v-model="quote_type" />
        </label>
        <label>Winter Service
          <input type="checkbox" name="q_type" value="winter service"
            @change="filterQuoteType()"
            v-model="quote_type" />
        </label>
        <label>Sail Cover
          <input type="checkbox" name="q_type" value="sail cover"
            @change="filterQuoteType()"
            v-model="quote_type" />
        </label>
      </span>
      <span class="status">
        <select @change="filterQuoteStatus($event)">
          <option value="all"></option>
          <option value="quote request">Quote Request</option>
          <option value="pending">Pending</option>
          <option value="production">In Production</option>
          <option value="ready">Ready</option>
          <option value="delivered">Delivered</option>
          <option value="closed">Closed</option>
        </select>
       </span>
     </label>
    </div>
    <div class="container">
      <h1>Quotes List</h1>
      <div>
        <tr>
          <th>Customer</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Sail</th>
          <th>Home Port</th>
          <th>Price</th>
          <th>Status</th>
          <th></th>
        </tr>
        <tr v-for= "quote in quotes_display"
          :key="quote._id">
          <td><router-link :to="{ name: 'CustomerProfile', params: { 'payload': quote.customer } }">{{ quote.customer.fname }} {{ quote.customer.lname }}</router-link></td>
          <td>{{ quote.customer.email }}</td>
          <td class='phone'>{{ quote.customer.phone }}</td>
          <td>{{ quote.sail_request.split('-')[0] }}</td>
          <td>{{ quote.boat_home }}</td>
          <td>{{ quote.quote_price.toFixed(2) }}</td>
          <td>{{ quote.status }}</td>
          <td>
            <button @click="viewQuote(quote)">View</button>
          </td>
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
      quotes: [],
      quotes_display: [],
      quote_type: [],
      f_registry: {
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
    getQuotes: async function () {
      let response = await AuthenticationService.quoteList()
      this.quotes = response.data
      this.quotes_display = response.data
    },
    viewQuote (quoteObj) {
      this.$router.push({ name: 'QuoteDisplay', params: { 'payload': quoteObj } })
    },
    filterActive: function (evt) {
      if (evt.target.checked) {
        console.log("I've been checked")
        this.f_registry.activeFilter.filter = this.quotes.filter((value) => { return value.status !== 'paid' })
        this.f_registry.activeFilter.status = true
      } else {
        console.log("I've been UNchecked")
        this.f_registry.activeFilter.status = false
      }
      this.applyFilters()
    },
    filterQuoteType: function () {
      console.log(this.quote_type)
      if (this.quote_type.length !== 0) {
        this.f_registry.typeFilter.filter = this.quotes.filter((quote) => { return quote.quote_type.reduce((acc, val) => { return acc || this.quote_type.includes(val) }, false) })
        this.f_registry.typeFilter.status = true
      } else {
        this.f_registry.typeFilter.status = false
      }
      this.applyFilters()
    },
    filterQuoteStatus: function (evt) {
      if (evt.target.value !== 'all') {
        this.f_registry.statusFilter.filter = this.quotes.filter((quote) => { return quote.status === evt.target.value })
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
          this.quotes_display = []
        } else {
          var result = Object
            .values(filterObj)
            .reduce((a, b) => b.filter(Set.prototype.has, new Set(a)))

          this.quotes_display = result
        }
      } else {
        this.quotes_display = this.quotes
      }
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

td, th {
  padding: 8px;
}

tr:nth-child(even) {
    background-color: #eeeeee;
}

tr:nth-child(odd) {
    background-color: #cccccc;
}

.row span {
  margin: 0 8px;
}

.phone {
  width: 12%;
}
</style>
