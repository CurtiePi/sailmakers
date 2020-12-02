<template>
  <div class="container">
    <h1>{{ headerText }}</h1>
    <br />
    <div class="row">
      <form>
        <div class="column" v-for="(input, index) in inputFields" 
          :key="index">
          <div v-if="['text', 'number'].includes(input.type) && (isEditing || !input.isEditOnly)">
            <label>{{ input.label }}</label>
            <input
              class="input is-large"
              :type="input.type"
              step="0.05"
              :name="input.name.toLowerCase()"
              v-model="input.value" />
          </div>
          <div v-else-if="input.type == 'textarea' && (isEditing || !input.isEditOnly)">
            <label>{{ input.label }}</label>
            <textarea
              class="textarea"
              :cols="input.cols"
              :rows="input.rows"
              :type="input.type"
              :name="input.name.toLowerCase()"
              v-model="input.value" />
          </div>
          <div v-else-if="input.type == 'select' && (isEditing || !input.isEditOnly)">
            <label>{{ input.label }}</label>
            <select
              class="multiselect-ui form-control" multiple="multiple"
              :name="input.name.toLowerCase()"
              :id="input.name.toLowerCase()"
              @change="checkForOther($event)"
              v-model="input.value">
              <option value="" disabled selected>Choose {{ input.label }}</option>
              <option v-for="option in input.options">
                {{ option.name }}
              </option>
            </select>
          </div>
          <div v-else-if="input.type == 'checkbox' && (isEditing || !input.isEditOnly)">
            <p>{{ input.label }}</p>
            <div class="row">
              <div v-for="(option, index) in input.options" :key="index">
                <label>
                  <input type="checkbox"
                    :value="option.name.toLowerCase()"
                    :name="input.name"
                    :id="option.name.toLowerCase().replace(' ', '_')"
                    v-model="quote_type">
                    {{ option.name }}
                  </input>
                </label>
              </div>
            </div>
          </div>
          <div v-else-if="input.type == 'radio' && (isEditing || !input.isEditOnly)">
            <p>{{ input.label }}</p>
            <div class="radio"
              v-for="(option, index) in input.options"
              :key="index">
              <label>
                <input type="radio"
                  :name="input.name"
                  :value="option.name.toLowerCase()"
                  v-model="input.value">
                  {{ option.name }}
                </label>
            </div>
          </div>
        </div>
      </form>
    </div>
    <button type="button" class="btn btn-primary"
      @click="isEditing ? updateQuote() : createQuote()"
      :disabled="!allowSubmitForm">{{ headerText }}</button>
    <button type="button" class="btn btn-primary"
      @click="cancel()">
      Cancel
    </button>
    <input type="file" ref="fileInput" class="btn btn-primary"
      @change="showname()" />
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import quoteInputs from '@/assets/quoteInputs'

export default {
  name: 'createQuote',
  props: ['create_payload', 'edit_payload'],
  data () {
    return {
      inputFields: [],
      origInputFields: {},
      customer: null,
      quote_type: [],
      isEditing: false,
      quote: null
    }
  },
  computed: {
    allowSubmitForm: function () {
      return this.inputFields.some(this.hasValue)
    },
    headerText: function () {
      return this.isEditing ? 'Update Quote' : 'Create Quote'
    }
  },
  methods: {
    async showname () {
      var name = this.$refs.fileInput
      console.log(name)
      console.log(`Selected file: ${name.files[0].name}`)
      console.log(`Selected file: ${name.files[0].size}`)
      console.log(`Selected file: ${name.files[0].type}`)

      const formData = new FormData()
      formData.append('file', name.files[0])
      try {
        var response = await AuthenticationService.getPrice(formData)
        console.log(response.data.quote_price)
      } catch (err) {
        console.log(err)
      }
    },
    checkForChanges () {
      var formData = {}
      for (var idx = 0; idx < this.inputFields.length; idx++) {
        var key = this.inputFields[idx].name
        if (key === 'quote_type') {
          if (!((this.quote_type.length === this.origInputFields[key].length) && (this.quote_type.every(val => this.origInputFields[key].includes(val))))) {
            formData[key] = this.quote_type
          }
        } else {
          if (this.inputFields[idx].value !== this.origInputFields[key]) {
            var value = this.inputFields[idx].value
            formData[key] = (key === 'amount_paid') ? parseFloat(value) : value
          }
        }
      }
      return formData
    },
    cancel () {
      if (this.isEditing) {
        this.$router.push({name: 'QuoteDisplay', params: {'payload': this.quote}})
      } else {
        this.$router.push({name: 'Customers'})
      }
    },
    checkoutput () {
      let data = {}

      for (var idx = 0; idx < this.inputFields.length; idx++) {
        var inputField = this.inputFields[idx]
        if (this.hasValue(inputField) && inputField.name !== 'customer') {
          data[inputField.name] = inputField.value
        } else if (inputField.name === 'quote_type') {
          data[inputField.name] = this.quote_type
        }
      }

      data['customer_id'] = this.customer._id
      let salesperson = JSON.parse(localStorage.sp)
      data['salesperson_id'] = salesperson._id

      let payload = data
      console.log(payload)
    },
    async updateQuote () {
      let data = this.checkForChanges()
      let payload = {
        criteria: {'_id': this.quote._id},
        update: data}

      console.log('Updating quote')
      console.log(payload)
      var response = await AuthenticationService.quoteUpdate(payload)
      this.quote = response.data
      this.clearInputs()
      this.$router.push({ name: 'QuoteDisplay', params: {'payload': this.quote} })
    },
    async createQuote () {
      let payload = {}

      for (var idx = 0; idx < this.inputFields.length; idx++) {
        var inputField = this.inputFields[idx]
        if (this.hasValue(inputField) && inputField.name !== 'customer') {
          payload[inputField.name] = inputField.value
        } else if (inputField.name === 'quote_type') {
          payload[inputField.name] = this.quote_type
        }
      }
      payload['customer_id'] = this.customer._id
      let salesperson = JSON.parse(localStorage.sp)
      payload['salesperson_id'] = salesperson._id

      await AuthenticationService.quoteCreate(payload)
      this.clearInputs()
      this.$router.push({ name: 'Quotes' })
    },
    hasValue (inputField) {
      return inputField.value != null &&
        inputField.value !== undefined &&
        inputField.value !== ''
    },
    prepareInputs () {
      for (var idx in this.inputFields) {
        var haveQuote = this.quote !== null
        var haveCustomer = this.customer !== null
        var type = this.inputFields[idx].type
        var fieldName = this.inputFields[idx].name

        if (['text', 'number'].includes(type)) {
          if (fieldName === 'customer') {
            this.inputFields[idx].value = (haveCustomer) ? `${this.customer.fname} ${this.customer.lname}` : ''
          } else if (this.inputFields[idx].inCustomer) {
            this.inputFields[idx].value = (haveCustomer) ? this.customer[fieldName] : ''
          } else if (!this.isEditing && fieldName === 'pick_drop') {
            this.inputFields[idx].value = (haveCustomer) ? this.customer.boat_home : ''
          } else {
            this.inputFields[idx].value = (haveQuote) ? this.quote[fieldName] : ''
          }
        } else if (type === 'checkbox') {
          if (fieldName === 'quote_type') {
            this.quote_type = (haveQuote) ? this.quote.quote_type : []
          } else if (fieldName === 'isActive') {
            this.is_active = (haveQuote) ? this.quote.isActive : false
            this.inputFields[idx].value = this.is_active
          }
        } else if (type === 'textarea') {
          this.inputFields[idx].value = (haveQuote) ? this.quote[fieldName] : ''
        } else if (type === 'radio') {
          var qValue = (haveQuote) ? this.quote[fieldName] : ''
          this.inputFields[idx].value = qValue
        } else if (type === 'select') {
          this.inputFields[idx].value = (haveQuote) ? this.quote[fieldName] : ''
          if (this.inputFields[idx].value !== '') {
            let element = document.getElementById(fieldName)
            element.value = this.inputFields[idx].value
          }
        }
      }
    },
    clearInputs () {
      for (var idx = 0; idx < this.inputFields.length; idx++) {
        var inputField = this.inputFields[idx]
        inputField.value = ''
      }
    },
    loadData () {
      this.$nextTick(function () {
        this.prepareInputs()
        for (var idx = 0; idx < this.inputFields.length; idx++) {
          this.origInputFields[this.inputFields[idx].name] = this.inputFields[idx].value
        }
        this.origInputFields['quote_type'] = []
        for (idx = 0; idx < this.quote_type.length; idx++) {
          this.origInputFields['quote_type'].push(this.quote_type[idx])
        }
      })
    }
  },
  mounted () {
    this.inputFields = quoteInputs.inputFields
    if (this.create_payload) {
      console.log('We have a CREATE PAYLOAD!!')
      this.loadData()
      this.customer = this.create_payload
      this.isEditing = false
    } else if (this.edit_payload) {
      console.log('We have an EDIT PAYLOAD!!')
      this.quote = this.edit_payload
      this.customer = this.quote.customer
      this.loadData()
      this.isEditing = true
    }
  }
}
</script>

<style scoped>
.column {
  float: left;
  width: 50%;
  padding: 10px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

.input_holder {
  position: relative;
}

input[type=text] {
    background: transparent;
    border: none;
    border-bottom: 1px solid #000000;
}

input[type=number] {
    background: transparent;
    border: none;
    border-bottom: 1px solid #000000;
}

input[type=checkbox] {
  margin: 0px 10px;
}

.radio {
  margin: 0px 10px;
  display: inline-block;
}

.textarea {
  display: flex;
  flex-direction: column;
}
</style>
