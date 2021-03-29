<template>
  <div v-if="!isFetching" class="container">
    <div class="card">
      <div class="flex-grid">
        <span class="col hilite">Request for {{ customer.fname }} {{ customer.lname }}</span>
      </div>
      <div class="flex-grid">
        <span class="col small-print">Status: {{ capitalizeFirst(quote.status) }}</span>
        <span class="col small-print">Due Date: {{ formatDate(quote.due_date) }}</span>
      </div>
      <hr></hr>
      <div class="flex-grid">
        <span class="col">Address: {{ customer.address }}</span>
      </div>
      <div class="flex-grid-halfs">
        <span class="col">
          Email:
          <router-link :to="{ name: 'CreateMessage', params: {'targets': [customer.email], 'cbdata': quote, 'caller': ['QuoteDisplay', callerName]} }">
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
        <span class="col" style="white-space: pre-wrap;">Sail Request: {{ quote.sail_request }}</span>
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
        <span class="col">Price: {{ quote.quote_price }}</span>
        <span class="col">Balance Due: {{ quote.quote_price - quote.amount_paid }}</span>
      </div>
      <hr></hr>
      <div class="flex-grid">
        <span class="col">Sailing Type: {{ quote.sailing_type }}</span>
      </div>
      <hr></hr>
      <div class="flex-grid">
        <span class="col" style="white-space: pre-wrap;">Additional Notes: {{ quote.notes }}</span>
      </div>
      <hr></hr>
      <div v-if="haveDocs" class="flex-grid">
        <div class="col">
          <tr>
            <th>Document Name</th>
            <th></th>
            <th></th>
          </tr>
          <tr v-for= "(doc, index) in quote.doc_path"
            :key="index">
            <td style="width: 90%;">
              <router-link :to="{ name: 'QuoteViewPDF' , params: {'payload': quote, 'caller': ['QuoteDisplay', callerName], 'filename': doc} }">
                {{ doc }}
              </router-link>
            </td>
            <td style="width: 5%;">
              <button @click='emailDocument(doc)'>Email</button>
            </td>
            <td style="width: 5%;">
              <a @click="getFile(doc)">
                <ion-icon name="download"></ion-icon>
              </a>
            </td>
          </tr>
        </div> 
      </div>
      <hr></hr>
      <span class="error" v-if="errorMsg">{{ errorMsg }}</span>
      <p>
        <button @click="timeToEdit()">Edit</button>
        <button v-if="!haveDocs" @click="printQuote()">Create PDF</button>
        <button 
          @click="uploadFile">Upload File</button>
          <input
            type="file"
            ref="file"
            @change="onSelect" />
        <button @click="goBack()">Back</button>
      </p>
    </div>     
  </div>
</template>
<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'quoteDisplay',
  props: ['payload', 'caller'],
  data () {
    return {
      quote: null,
      customer: null,
      salesperson: null,
      salesRecipients: [],
      callerName: 'Quotes',
      file: null,
      errorMsg: null,
      isFetching: true
    }
  },
  computed: {
    allowSubmitForm: function () {
      return this.inputFields.some(this.hasValue)
    },
    haveDocs: function () {
      return this.quote.doc_path.length > 0
    }
  },
  methods: {
    timeToEdit () {
      this.$router.replace({ name: 'QuoteEdit', params: { 'edit_payload': this.quote } })
    },
    async getFile (filename) {
      console.log(`Getting ${filename}`)
      var response = await AuthenticationService.downloadFile(filename)
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = downloadUrl
      link.setAttribute('download', filename) // any other extension
      document.body.appendChild(link)
      link.click()
      link.remove()
    },
    async printQuote () {
      let payload = {
        'payload': this.quote
      }
      let response = await AuthenticationService.printQuote(payload)
      if (response.status === 200) {
        this.quote = response.data
      }
    },
    emailDocument (filename) {
      let regex = new RegExp(`${this.customer.lname}_${this.customer.fname}.+\\d{4}-\\d{1,2}-\\d{1,2}.pdf`)

      if (regex.test(filename)) {
        this.$router.replace({ name: 'CreateMessage', params: { 'attachment': filename, 'targets': this.salesRecipients } })
      } else {
        this.$router.replace({ name: 'CreateMessage', params: { 'attachment': filename, 'targets': [this.quote.customer.email] } })
      }
    },
    onSelect () {
      const file = this.$refs.file.files[0]
      this.file = file
    },
    async getSalespeopleToEmail () {
      var response = await AuthenticationService.getEmailSalespeople()
      if (response.status === 200) {
        let salespeople = response.data
        for (var idx = 0; idx < salespeople.length; idx++) {
          let salesPerson = salespeople[idx]
          this.salesRecipients.push(salesPerson.email)
        }
      }
    },
    async uploadFile () {
      if (this.file.type === 'application/pdf') {
        const formData = new FormData()
        formData.append('file', this.file)
        formData.append('quote_id', this.quote._id)
        try {
          var response = await AuthenticationService.uploadFile(formData)
          if (response.status === 200) {
            this.quote = response.data
            this.customer = this.quote.customer
            this.salesperson = this.quote.salesperson
          }
        } catch (err) {
          this.errorMsg = 'Only .pdf files can be uploaded!'
        }
      } else {
        this.errorMsg = 'Only .pdf files can be uploaded!'
      }
    },
    hasValue (inputField) {
      return inputField.value != null &&
        inputField.value !== undefined &&
        inputField.value !== ''
    },
    capitalizeFirst (inputText) {
      return inputText.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
    },
    formatDate (dateString) {
      let result = ''
      if (dateString) {
        let dte = new Date(dateString)
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dte)
        let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(dte)
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(dte)
        result = `${da}-${mo}-${ye}`
      }
      return result
    },
    goBack () {
      if (['Quotes', 'Customers', 'StaffList'].includes(this.callerName)) {
        this.$router.replace({name: this.callerName})
      } else {
        this.$router.replace({ name: this.callerName[0], params: { 'payload': this.customer, 'caller': this.callerName.splice(1) } })
      }
    }
  },
  mounted () {
    if (this.payload) {
      this.quote = this.payload
      this.customer = this.quote.customer
      this.salesperson = this.quote.salesperson
      if (this.caller) {
        this.callerName = this.caller
      }
      this.getSalespeopleToEmail()
      this.isFetching = false
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

.small-print {
  font-size: 18px; 
  margin-right: 20px;
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

span.error {
  font-size: 22px;
  color: #FF0000;
}

</style>
