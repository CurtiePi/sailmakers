<template>
  <div class="form-group">
    <input v-for="inputField in inputFields"
      class="test-control" size="25"
      :type="inputField.type"
      :placeholder="inputField.placeholder"
      :name="inputField.name"
      :id="inputField.name"
      v-model="inputField.value" />
  </div>
</template>
<script>
import customerInputs from '@/assets/customerInputs'

export default {
  name: 'customerForm',
  data () {
    return {
      inputFields: customerInputs.inputFields
    }
  }
}
</script>
<style scoped>
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
