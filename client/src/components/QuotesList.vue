<template>
  <div class="container">
    <div class="row filter-div">
      Request Filter 
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
        <label>Other
          <input type="checkbox" name="q_type" value="other"
            @change="filterQuoteType()"
            v-model="quote_type" />
        </label>
      </span>
    </div>  
    <div class="row filter-div">
      Status Filter
      <span class="status">
       <label>
         <input type="checkbox" name="status" value="quote request" 
           @change="filterQuoteStatus()"
           v-model="f_registry.statusFilter.status_list" />
           Quote Request
       </label>
       <label>
         <input type="checkbox" name="status" value="pending"
           @change="filterQuoteStatus()"
           v-model="f_registry.statusFilter.status_list" />
           Pending
       </label>
       <label>
         <input type="checkbox" name="status" value="production"
           @change="filterQuoteStatus()"
           v-model="f_registry.statusFilter.status_list" />
           In Production
       </label>
       <label>
         <input type="checkbox" name="status" value="ready"
           @change="filterQuoteStatus()"
           v-model="f_registry.statusFilter.status_list" />
           Ready
       </label>
       <label>
         <input type="checkbox" name="status" value="delivered"
           @change="filterQuoteStatus()"
           v-model="f_registry.statusFilter.status_list" />
           Delivered
       </label>
       <label>
         <input type="checkbox" name="status" value="no sale"
           @change="filterQuoteStatus()"
           v-model="f_registry.statusFilter.status_list" />
           No Sale
       </label>
      </span>
      <span class="stat_controller"
        <label>
          <input type="radio" name="s_control" value="all" 
            @change="updateStatusView()"
            v-model="status_view">
            All
          </input>
        </label>
        <label>
          <input type="radio" name="s_control" value="active"
            @change="updateStatusView()"
            v-model="status_view">
            Active
          </input>
        </label>
        <label>
          <input type="radio" name="s_control" value="inactive" 
            @change="updateStatusView()"
            v-model="status_view">
            Inactive
          </input>
        </label>
      </span>
    </div>
    <div class="t_container">
      <h1>Requests List</h1>
      <div>
        <tr>
          <th>Customer</th>
          <th>Request Type</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Sail</th>
          <th>Home Port</th>
          <th>Status</th>
          <th></th>
        </tr>
        <tr v-for= "quote in quotes_display"
          :class="quote.status.replace(' ', '_')"
          :key="quote._id">
          <td>
            <router-link :to="{ name: 'CustomerProfile', params: { 'payload': quote.customer, 'caller': 'Quotes' } }">
              {{ quote.customer.fname }} {{ quote.customer.lname }}
            </router-link>
          </td>
          <td>{{ quote.quote_type.join(', ') }}</td>
          <td><router-link :to="{ name: 'CreateMessage', params: { 'targets': [quote.customer.email], 'caller': 'Quotes' } }">{{ quote.customer.email }}</router-link></td>
          <td class='phone'>{{ quote.customer.phone }}</td>
          <td>{{ quote.sail_request }}</td>
          <td>{{ quote.boat_home }}</td>
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
      status_view: 'active',
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
          status_list: ['quote request', 'pending', 'production', 'ready'],
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
      this.sortList()
      this.filterQuoteStatus()
    },
    viewQuote (quoteObj) {
      this.$router.replace({ name: 'QuoteDisplay', params: { 'payload': quoteObj, 'caller': 'Quotes' } })
    },
    temporalSort: function (a, b) {
      return (a.createdAt < b.createdAt) ? 1 : (a.createdAt > b.createdAt) ? -1 : 0
    },
    sortList () {
      const ftn = this.temporalSort
      this.quotes_display.sort(ftn)
    },
    updateStatusView: function () {
      switch (this.status_view) {
        case 'all': this.f_registry.statusFilter.status_list = []
          break
        case 'active': this.f_registry.statusFilter.status_list = ['quote request', 'pending', 'production', 'ready']
          break
        case 'inactive': this.f_registry.statusFilter.status_list = ['delivered', 'no sale']
          break
      }
      this.filterQuoteStatus()
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
    filterQuoteStatus: function () {
      if (this.f_registry.statusFilter.status_list.length !== 0) {
        this.f_registry.statusFilter.filter = this.quotes.filter((quote) => { return this.f_registry.statusFilter.status_list.includes(quote.status) })
        this.f_registry.statusFilter.status = true
      } else {
        this.f_registry.statusFilter.status_list = []
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
html, body{
    margin:0;
    padding:0;
    min-width: 1140px; /* this is the important part*/
}

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

.t_container {
  width: 100%;
    padding:0;
}

a {
  color: #35495E;
}

td, th {
  padding: 8px;
}

label {
  margin-left: 5px;
  margin-right: 3px;
}

.row span {
  margin: 0 8px;
}

.phone {
  width: 12%;
}

.quote_request {
  background-color: #FFFF99;
}

.pending {
  background-color: #00FFFF;
}

.production {
  background-color: #98FB98;
}

.ready {
  background-color: #CCCCCC;
}

.delivered {
  background-color: #C58BE7;
}

.no_sale {
  background-color: #FF8000;
}

.status {
  margin-top: 3px;
  margin-right: 5px;
  padding: 2px;
}

.quote_types {
  margin-bottom: 3px;
  padding: 2px;
}
</style>
