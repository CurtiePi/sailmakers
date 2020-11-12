<template>
  <div class="container">
    <h1>Create New Customer</h1>
    <form>
      <div v-for="(input, index) in inputFields" class="input_holder"
        :key="index">
        <div v-if="!['submit', 'textarea', 'select'].includes(input.type)">
          <label>{{ input.label }}</label>
          <input
            class="input is-large"
            :type="input.type"
            :name="input.name.toLowerCase()"
            v-model="input.value" />
        </div>
        <div v-else-if="input.type == 'textarea'">
          <label>{{ input.label }}</label>
          <input
            class="textarea"
            :type="input.type"
            :name="input.name.toLowerCase()"
            v-model="input.value" />
        </div>
        <div v-else-if="input.type == 'select'">
          <label>{{ input.label }}</label>
          <select
            class="select"
            :name="input.name.toLowerCase()"
            :id="input.name.toLowerCase()"
            @change="checkForOther($event)"
            v-model="input.value">
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
      </div>
      <button type="button" class="btn btn-primary"
        @click="createCustomer()"
        :disabled="!allowSubmitForm">Create Customer</button>
      <button type="button" class="btn btn-primary"
        @click="checkoutput()"
        :disabled="!allowSubmitForm">Check Sanity</button>
    </form>
  </div>
</template>
<script>
import AuthenticationService from '@/services/AuthenticationService'
import customerInputs from '@/assets/customerInputs'

export default {
  name: 'customerForm',
  props: [ 'atomic' ],
  data () {
    return {
      inputFields: [],
      selectOptions: null,
      form: {},
      singleOp: false,
      needOther: false,
      otherValue: null
    }
  },
  computed: {
    allowSubmitForm: function () {
      return this.inputFields.some(this.hasValue)
    }
  },
  methods: {
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
    async getPorts () {
      let response = await AuthenticationService.portList()
      this.selectOptions = response.data
    },
    clearInputs () {
      for (var idx = 0; idx < this.inputFields.length; idx++) {
        var inputField = this.inputFields[idx]
        inputField.value = ''
        if (this.otherValue) {
          this.otherValue = ''
        }
      }
    }
  },
  mounted () {
    this.inputFields = customerInputs.inputFields
    if (this.atomic) {
      this.singleOp = this.atomic
    }
    this.getPorts()
  }
}
</script>
<style scoped>
.input_holder {
  position: relative;
}

input[type=text] {
    background: transparent;
    border: none;
    border-bottom: 1px solid #000000;
}

.control {
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
