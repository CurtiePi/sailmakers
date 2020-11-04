<template>
  <div>
    <div v-for="(input, index) in inputFields" class="input_holder"
      :key="index">
      <div v-if="!['submit', 'textarea', 'select'].includes(input.type)">
        <label>{{ input.label }}</label>
        <input
          v-bind:value="form[input.name]"
          class="input is-large"
          :type="input.type"
          :name="input.name.toLowerCase()" />
      </div>
      <div v-else-if="input.type == 'textarea'">
        <label>{{ input.label }}</label>
        <input
          v-bind:value="form[input.name]"
          class="textarea"
          :type="input.type"
          :name="input.name.toLowerCase()" />
      </div>
      <div v-else-if="input.type == 'select'">
        <label>{{ input.label }}</label>
        <input
          v-bind:value="form[input.name]"
          class="select"
          :type="input.type"
          :name="input.name.toLowerCase()" />
      </div>
    </div>
  </div>
</template>
<script>
import portInputs from '@/assets/portInputs'

export default {
  name: 'portForm',
  data () {
    return {
      inputFields: portInputs.inputFields,
      form: {}
    }
  }
}
</script>
<style scoped>
.input_holder {
  position: relative;
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
