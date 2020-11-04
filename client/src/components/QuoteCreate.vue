<template>
  <div class="container">
    <h1>Quote for {{ customer.fname }} {{ customer.lname }} </h1>
    <h3>Initiated by {{ salesperson.fname }} {{ salesperson.lname }} </h3>
    <div class="creator">
      <form>
        <div class="form-group">
          <input v-for="inputField in inputFields"
            class="test-control" size="25"
            :type="inputField.type"
            :placeholder="inputField.placeholder"
            :name="inputField.name"
            :id="inputField.name"
            v-model="inputField.value" />
        </div>
        <button type="button" class="btn btn-primary" @click="create_quote()" :disabled="!allowSubmitForm">Create Quote</button>
      </form>
    </div>
  </div>
</template>
<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'quoteCreate',
  props: ['payload'],
  data () {
    return {
      customer: null,
      salesperson: null,
      inputFields: [
        {
          name: 'boat_type',
          type: 'text',
          placeholder: 'Boat Type',
          value: null
        },
        {
          name: 'boat_name',
          type: 'text',
          placeholder: 'Boat Name',
          value: null
        },
        {
          name: 'sail_request',
          type: 'text',
          placeholder: 'Sail Request',
          value: null
        },
        {
          name: 'battens',
          type: 'text',
          placeholder: 'Battens',
          value: null
        },
        {
          name: 'reefing_pts',
          type: 'text',
          placeholder: 'Reefing Points',
          value: null
        },
        {
          name: 'num_logo',
          type: 'text',
          placeholder: 'Numbers/Logo',
          value: null
        },
        {
          name: 'furl_sys',
          type: 'text',
          placeholder: 'Furling System',
          value: null
        },
        {
          name: 'uv_color',
          type: 'text',
          placeholder: 'UV Color',
          value: null
        },
        {
          name: 'home_port',
          type: 'text',
          placeholder: 'Home Port',
          value: null
        },
        {
          name: 'delivery_type',
          type: 'text',
          placeholder: 'Delivery Type',
          value: null
        },
        {
          name: 'sailing_type',
          type: 'text',
          placeholder: 'Type of Sailing',
          value: null
        },
        {
          name: 'Additional Notes',
          type: 'textarea',
          placeholder: 'Additional Notes',
          value: null
        }
      ]
    }
  },
  computed: {
    allowSubmitForm: function () {
      return this.inputFields.some(this.hasValue)
    }
  },
  methods: {
    async create_quote () {
      let data = {'customer_id': this.customer._id,
        'salesperson_id': this.salesperson._id}

      for (var idx = 0; idx < this.inputFields.length; idx++) {
        var inputField = this.inputFields[idx]
        if (this.hasValue(inputField)) {
          data[inputField.name] = inputField.value
        }
      }
      let response = await AuthenticationService.quoteCreate(data)
      let payload = response.data
      this.$router.push({ name: 'QuoteDisplay', params: { payload } })
    },
    hasValue (inputField) {
      return inputField.value != null &&
        inputField.value !== undefined &&
        inputField.value !== ''
    },
    loadBoatInfo () {
      for (var idx = 0; idx < this.inputFields.length; idx++) {
        switch (this.inputFields[idx].name) {
          case 'home_port':
            this.inputFields[idx].value = this.customer.boat_home
            break
          case 'boat_name':
            this.inputFields[idx].value = this.customer.boat_name
            break
          default:
            continue
        }
      }
    }
  },
  mounted () {
    if (this.payload) {
      console.log(this.payload)
      this.customer = this.payload
    }
    this.salesperson = JSON.parse(localStorage.sp)
    this.loadBoatInfo()
  }
}
</script>
<style scoped>
button {
  margin: 5px 5px;
}

button:hover, a:hover {
  opacity: 0.7;
}

.creator {
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
  margin: 5px;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

input:not(:placeholder-shown) {
  border-color: hsl(138, 95%, 25%);
}
</style>
