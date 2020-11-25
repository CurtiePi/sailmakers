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
              class="select"
              :name="input.name.toLowerCase()"
              :id="input.name.toLowerCase()"
              @change="checkForOther($event)"
              v-model="selectValue">
              <option v-for="option in selectOptions">
                {{ option.name }}
              </option>
              <option value='other'>Other</option>
            </select>
            <div class="otherInput"
              v-if="needOther" >
              <label>Specify Other</label>
              <input type="text"
                v-model="otherValue" />
            </div>
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
      @click="isEditing ? updateCustomer() : createCustomer()"
      :disabled="!allowSubmitForm">{{ headerText }}</button>
    <button type="button" class="btn btn-primary"
      @click="cancel()">Cancel</button>
    <button type="button" class="btn btn-primary"
      @click="checkoutput()"
      :disabled="!allowSubmitForm">Check Sanity</button>
    <button type="button" class="btn btn-primary"
      @click="checkForChanges()">Check Changes</button>
  </div>
</template>
<script>
import AuthenticationService from '@/services/AuthenticationService'
import customerInputs from '@/assets/customerInputs'

export default {
  name: 'customerForm',
  props: [ 'atomic', 'edit_payload' ],
  data () {
    return {
      inputFields: [],
      origInputFields: [],
      selectOptions: null,
      isEditing: false,
      form: {},
      singleOp: false,
      needOther: false,
      otherValue: null,
      selectValue: null
    }
  },
  computed: {
    allowSubmitForm: function () {
      return this.inputFields.some(this.hasValue)
    },
    headerText: function () {
      return this.isEditing ? 'Update Customer' : 'Create Customer'
    }
  },
  methods: {
    checkForChanges () {
      var formData = {}

      for (var idx = 0; idx < this.inputFields.length; idx++) {
        var key = this.inputFields[idx].name
        if (key === 'boat_home') {
          console.log('Boat Home is here')
          if (![this.selectValue, this.otherValue].includes(this.origInputFields[key])) {
            formData[key] = (this.needOther) ? this.otherValue : this.selectValue
          }
        } else {
          if (this.inputFields[idx].value !== this.origInputFields[key]) {
            formData[key] = this.inputFields[idx].value
          }
        }
      }
      console.log(formData)
      return formData
    },
    cancel () {
      if (this.isEditing) {
        this.$router.push({name: 'CustomerProfile', params: {'payload': this.customer}})
      } else {
        this.$router.push({name: 'Customers'})
      }
    },
    checkoutput () {
      let data = {}

      console.log(this.inputFields)

      for (var idx = 0; idx < this.inputFields.length; idx++) {
        var inputField = this.inputFields[idx]
        if (this.hasValue(inputField)) {
          if (inputField.value === 'other') {
            data[inputField.name] = this.otherValue
          } else {
            data[inputField.name] = inputField.value
          }
        }
      }

      let payload = data
      console.log(payload)
    },
    checkForOther (event) {
      for (var idx in this.inputFields) {
        const field = this.inputFields[idx]
        if (field.name === event.target.name) {
          if (field.value === 'other') {
            this.needOther = true
          } else {
            this.needOther = false
            this.otherValue = ''
          }
        }
      }
    },
    async updateCustomer () {
      let data = this.checkForChanges()
      let payload = {
        criteria: {'_id': this.customer._id},
        update: data}

      console.log('Updating customer')
      console.log(payload)
      var response = await AuthenticationService.customerUpdate(payload)
      this.customer = response.data
      this.clearInputs()
      this.$router.push({ name: 'CustomerProfile', params: {'payload': this.customer} })
    },
    async createCustomer () {
      let data = {}

      for (var idx = 0; idx < this.inputFields.length; idx++) {
        var inputField = this.inputFields[idx]
        if (inputField.value === 'other') {
          data[inputField.name] = this.otherValue
        } else {
          data[inputField.name] = inputField.value
        }
      }

      let payload = data
      this.clearInputs()

      var response = await AuthenticationService.customerCreate(payload)
      var customer = response.data
      if (this.singleOp) {
        this.$router.push({ name: 'Customers' })
      } else {
        this.$router.push({ name: 'QuoteCreate', params: {'create_payload': customer} })
      }
    },
    hasValue (inputField) {
      return inputField.value != null &&
        inputField.value !== undefined &&
        inputField.value !== ''
    },
    async loadInputs () {
      let response = await AuthenticationService.portList()
      var ports = response.data
      this.selectOptions = ports
      console.log(ports)

      if (this.isEditing) {
        for (var idx = 0; idx < this.inputFields.length; idx++) {
          var type = this.inputFields[idx].type
          var fieldName = this.inputFields[idx].name
          if (['text', 'number'].includes(type)) {
            this.inputFields[idx].value = this.customer[fieldName]
          } else if (type === 'checkbox') {
            continue
          } else if (type === 'textarea') {
            this.inputFields[idx].value = this.customer[fieldName]
          } else if (type === 'radio') {
            continue
          } else if (type === 'select') {
            console.log(`Boat Home ${this.customer[fieldName]}`)
            if (fieldName === 'boat_home') {
              var value = this.customer[fieldName]
              var scan = (par) => par.name.indexOf(value) !== -1

              if (ports.some(scan)) {
                this.selectValue = this.customer[fieldName]
              } else {
                this.selectValue = 'other'
                this.otherValue = this.customer[fieldName]
                this.needOther = true
              }
            }
          }
          if (fieldName !== 'boat_home') {
            this.origInputFields[fieldName] = this.inputFields[idx].value
          } else {
            this.origInputFields['boat_home'] = (this.needOther) ? this.otherValue : this.selectValue
          }
        }
      }
    },
    clearInputs () {
      for (var idx = 0; idx < this.inputFields.length; idx++) {
        var inputField = this.inputFields[idx]
        inputField.value = ''
        if (this.otherValue) {
          this.otherValue = ''
        }
        if (this.selectValue) {
          this.selectValue = null
        }
      }
    }
  },
  mounted () {
    this.inputFields = customerInputs.inputFields
    if (this.atomic) {
      this.singleOp = this.atomic
    }
    if (this.edit_payload) {
      this.isEditing = true
      this.customer = this.edit_payload
    }
    this.loadInputs()
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
