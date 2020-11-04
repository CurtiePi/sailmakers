<template>
  <div class="container">
    <h1>Create New Port</h1>
    <form>
      <PortInputs />
      <button @click="createPort()">Create Port</button> 
    </form>
  </div>
</template>
<script>
import PortInputs from '@/components/CustomerForm'
import router from '../router'

export default {
  name: 'createPort',
  components: {
    PortInputs
  },
  data () {
    return {
    }
  },
  computed: {
    allowSubmitForm: function () {
      return this.inputFields.some(this.hasValue)
    }
  },
  methods: {
    async create_port () {
      /*
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
      */
    },
    hasValue (inputField) {
      return inputField.value != null &&
        inputField.value !== undefined &&
        inputField.value !== ''
    },
    goBack () {
      router.go(-1)
    }
  }
}
</script>
<style scoped>
</style>
