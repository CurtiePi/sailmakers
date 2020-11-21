<template>
  <div class="container">
    <div class="card">
      <div class="flex-grid">
        <span class="col hilite">Quote for {{ customer.fname }} {{ customer.lname }}</span>
      </div>
      <hr></hr>
      <div class="flex-grid">
        <span class="col">Home Port: {{ quote.boat_home }}</span>
      </div>
      <div class="flex-grid-halfs">
        <span class="col">Boat Name: {{ quote.boat_name }}</span>
        <span class="col">Boat Type: {{ quote.boat_model }}</span>
      </div>
      <hr></hr>
      <div class="flex-grid">
        <span class="col">Sail Request: {{ quote.sail_request }}</span>
      </div>
      <div class="flex-grid-halfs">
        <span class="col">Numbers/Logo: {{ quote.num_logo }}</span>
        <span class="col">Battens: {{ quote.battens }}</span>
      </div>
      <div class="flex-grid-halfs">
        <span class="col">Reefing Points: {{ quote.reefing_pts }}</span>
        <span class="col">Furling System: {{ quote.furl_sys }}</span>
      </div>
      <div class="flex-grid-halfs">
        <span class="col">UV Color: {{ quote.uv_color }}</span>
        <span class="col">Pick-up\Drop-off: {{ quote.pick_drop }}</span>
      </div>
      <div class="flex-grid-halfs">
        <span class="col">Price: {{ quote.price }}</span>
        <span class="col">Balance Due: {{ quote.quote_price - quote.amount_paid }}</span>
      </div>
      <hr></hr>
      <div class="flex-grid">
        <span class="col">Sailing Type: {{ quote.sailing_type }}</span>
      </div>
      <div class="flex-grid">
        <span class="col">Additional Notes: {{ quote.notes }}</span>
      </div>
      <p>
        <button @click="timeToEdit()">Edit</button>
        <button @click="printQuote()">Print Quote</button>
        <button v-if="show_view"
          @click="viewQuotePdf()">View Quote PDF</button>
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
      message: null,
      show_view: false
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
      if (response.status === 200) {
        this.show_view = true
      }
    },
    viewQuotePdf () {
      this.$router.push({ name: 'QuoteViewPDF', params: { 'payload': this.quote._id } })
    },
    hasValue (inputField) {
      return inputField.value != null &&
        inputField.value !== undefined &&
        inputField.value !== ''
    },
    goBack () {
      this.$router.push({name: 'Quotes'})
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
.MyComponent {
  /* Base styles that work for any screen size */
}

@media (min-width: 36em) {
  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    max-width: 300px;
    width: 80%;
    margin: auto;
    text-align: center;
    flex-direction: column;
  }

  .sector {
    width: 100%;
    margin: 0 auto;
    flex-direction: column;
    padding: 3px;
  }

}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 900px;
  width: 80%;
  margin: auto;
  background-color: #F5F5DC;
  font-size: 19px;
}

.flex-grid {
  display: flex;
}

.flex-grid .col {
  flex: 1;
}

.flex-grid-halfs {
  display: flex;
  justify-content: space-between;
}

.flex-grid-halfs .col {
  .width: 45%;
}

hr.solid {
  border-top: 3px solid #bbb;
  width: 80%;
  margin: auto;
}

.hilite {
  font-weight: bold;
  font-size: 40px; 
}

span {
  color: #000081;
  font-size: 30px; 
}

button {
  margin: 5px 5px;
}

button:hover, a:hover {
  opacity: 0.7;
}

</style>
