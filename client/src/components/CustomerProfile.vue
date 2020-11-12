<template>
  <div class="container">
    <div class="card">
      <h1>{{ customer_data.fname }} {{ customer_data.lname }}</h1>
      <p class="title">{{ customer_data.address }}</p>
      <p class="title">{{ customer_data.email }}</p>
      <p class="title">{{ customer_data.phone }}</p>
      <p class="title">{{ customer_data.boat_name }}</p>
      <p class="title">{{ customer_data.home_port }}</p>
      <p>
        <button v-if="!isEditing" @click="timeToEdit()">Edit</button>
        <button v-else @click="cancelEdit()">Cancel</button>
        <button @click="createQuote()">Create Quote</button>
        <button @click="goBack()">Back</button>
    </p>
    </div>     
    <div class="editor">
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
        <button type="button" class="btn btn-primary" @click="update_customer()" :disabled="!allowSubmitForm">Submit</button>
      </form>
    </div>
  </div>
</template>
<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'customerProfile',
  props: ['customer'],
  data () {
    return {
      customer_data: null,
      isEditing: false,
      inputFields: [
        {
          name: 'fname',
          type: 'text',
          placeholder: 'First Name',
          value: null
        },
        {
          name: 'lname',
          type: 'text',
          placeholder: 'Last Name',
          value: null
        },
        {
          name: 'address',
          type: 'text',
          placeholder: 'Address',
          value: null
        },
        {
          name: 'email',
          type: 'text',
          placeholder: 'Email',
          value: null
        },
        {
          name: 'phone',
          type: 'text',
          placeholder: 'Phone',
          value: null
        },
        {
          name: 'boat_name',
          type: 'text',
          placeholder: 'Boat Name',
          value: null
        },
        {
          name: 'home_port',
          type: 'text',
          placeholder: 'Boat Home',
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
    timeToEdit () {
      this.isEditing = true
      document.getElementsByClassName('editor')[0].style.display = 'block'
    },
    cancelEdit () {
      this.isEditing = false
      document.getElementsByClassName('editor')[0].style.display = 'none'
    },
    async update_customer () {
      let data = {}

      for (var idx = 0; idx < this.inputFields.length; idx++) {
        var inputField = this.inputFields[idx]
        if (this.hasValue(inputField)) {
          data[inputField.name] = inputField.value
        }
      }
      let payload = {
        criteria: {'_id': this.customer._id},
        update: data}

      document.getElementsByClassName('editor')[0].style.display = 'none'
      let response = await AuthenticationService.customerUpdate(payload)
      this.customer_data = response.data
    },
    hasValue (inputField) {
      return inputField.value != null &&
        inputField.value !== undefined &&
        inputField.value !== ''
    },
    createQuote () {
      let payload = this.customer_data
      this.$router.push({ name: 'QuoteCreate', params: {'create_payload': payload} })
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  mounted () {
    if (this.customer) {
      this.customer_data = this.customer
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
