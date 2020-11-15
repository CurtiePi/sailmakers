<template>
  <div class="container">
    <div class="card">
      <h1>Quote for {{ customer.fname }} {{ customer.lname }}</h1>
      <h3>Written by {{ salesperson.fname }} {{ salesperson.lname }}</h3>
      <p class="title">Boat Name: {{ quote.boat_name }}</p>
      <p class="title">Boat Type: {{ quote.boat_type }}</p>
      <p class="title">Home Port: {{ quote.home_port }}</p>
      <p class="title">Numbers/Logo: {{ quote.num_logo }}</p>
      <p class="title">Sail Request: {{ quote.sail_request }}</p>
      <p class="title">Battens: {{ quote.battens }}</p>
      <p class="title">Reefing Points: {{ quote.reefing_pts }}</p>
      <p class="title">Furling System: {{ quote.furl_sys }}</p>
      <p class="title">UV Color: {{ quote.uv_color }}</p>
      <p class="title">Sailing Type: {{ quote.sailing_type }}</p>
      <p class="title">Delivery Type: {{ quote.delivery_type }}</p>
      <p class="title">Additional Notes: {{ quote.notes }}</p>
      <p>
        <button @click="timeToEdit()">Edit</button>
        <button @click="printQuote()">Print Quote</button>
        <router-link :to="{ name: 'QuoteViewPDF', params: {'payload': quote._id } }">
          <button type="button">
            PDF View
          </button>
        </router-link>
        <button @click="goBack()">Home</button>
      </p>
    </div>     
  </div>
</template>
<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'quoteDisplay',
  props: ['payload'],
  data () {
    return {
      quote: null,
      customer: null,
      salesperson: null,
      message: null
    }
  },
  computed: {
    allowSubmitForm: function () {
      return this.inputFields.some(this.hasValue)
    }
  },
  methods: {
    timeToEdit () {
      this.$router.push({ name: 'QuoteEdit', params: { 'edit_payload': this.quote } })
    },
    async printQuote () {
      let payload = {
        'payload': this.quote
      }
      let response = await AuthenticationService.printQuote(payload)
      this.message = response.data
    },
    hasValue (inputField) {
      return inputField.value != null &&
        inputField.value !== undefined &&
        inputField.value !== ''
    },
    goBack () {
      this.$router.push({name: 'Hello'})
    }
  },
  mounted () {
    if (this.payload) {
      this.quote = this.payload
      this.customer = this.quote.customer
      this.salesperson = this.quote.salesperson
    }
  }
}
</script>
<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
}

.title {
  color: grey;
  font-size: 18px;
}

button {
  margin: 5px 5px;
}

button:hover, a:hover {
  opacity: 0.7;
}

.editor {
  display: none;
  max-width: 50%;
  margin: auto;
  text-align: center;
}

.test-control {
  display: inline-block;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  margin-top: 5px;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
