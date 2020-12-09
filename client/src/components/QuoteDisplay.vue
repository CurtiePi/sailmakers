<template>
  <div class="container">
    <div class="card">
      <div class="flex-grid">
        <span class="col hilite">Transaction for {{ customer.fname }} {{ customer.lname }}</span>
      </div>
      <hr></hr>
      <div class="flex-grid">
        <span class="col">Address: {{ customer.address }}</span>
      </div>
      <div class="flex-grid-halfs">
        <span class="col">
          Email:
          <router-link :to="{ name: 'MessageCustomers', params: { 'payload': [customer.email]} }">
            {{ customer.email }}
          </router-link>
        </span>
        <span class="col">Phone: {{ customer.phone }}</span>
      </div>
      <hr></hr>
      <div class="flex-grid">
        <span class="col">Club: {{ customer.club }}</span>
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
        <span class="col">Request Type: {{ quote.quote_type.join(', ') }}</span>
      </div>
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
        <button v-if="!isPrinted" @click="printQuote()">Print PDF</button>
        <button v-if="show_view"
          @click="viewQuotePdf()">View PDF</button>
        <button v-if="show_view"
          @click="emailQuotePdf()">Email PDF</button>
        <button @click="goBack()">Back</button>
      </p>
    </div>     
  </div>
</template>
<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'quoteDisplay',
  props: ['payload', 'owner', 'caller'],
  data () {
    return {
      quote: null,
      customer: null,
      salesperson: null,
      message: null,
      attachment: null,
      show_view: false,
      isPrinted: false,
      recipients: [],
      callerName: null
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
      this.message = response.data.message
      if (response.status === 200) {
        this.attachment = response.data.attachment
        this.show_view = true
        this.isPrinted = true
      }
    },
    viewQuotePdf () {
      this.$router.push({ name: 'QuoteViewPDF', params: { 'payload': this.quote } })
    },
    async emailQuotePdf () {
      this.$router.push({ name: 'SelectStaff', params: { 'filename': this.attachment, 'transaction': this.quote } })
      /*
      let recipients = await this.getRecipients()
      var payload = {'attachment': this.attachment, 'recipients': recipients}

      let response = await AuthenticationService.emailQuote(payload)
      if (response.status === 200) {
        this.show_view = false
      }
      */
    },
    async getRecipients () {
      let recipientList = []
      let response = await AuthenticationService.getEmailSalespeople()
      var salespeople = response.data
      for (var idx in salespeople) {
        recipientList.push(salespeople[idx].email)
      }
      return recipientList
    },
    hasValue (inputField) {
      return inputField.value != null &&
        inputField.value !== undefined &&
        inputField.value !== ''
    },
    goBack () {
      if (['Quotes', 'Customers'].includes(this.callerName)) {
        this.$router.replace({name: this.callerName})
      } else {
        this.$router.replace({ name: this.callerName, params: { 'payload': this.customer } })
      }
    }
  },
  mounted () {
    if (this.payload) {
      this.quote = this.payload
      if (this.owner) {
        this.customer = this.owner
      } else {
        this.customer = this.quote.customer
      }
      if (this.caller) {
        this.callerName = this.caller
      }
      this.salesperson = this.quote.salesperson
      console.log(this.customer)
    }
  }
}
</script>
<style scoped>
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
