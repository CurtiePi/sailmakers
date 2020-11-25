<template>
<div id="container">
     <label>Subject
       <input type='text' v-model="message.subject"/>
     </label>
     <button type="button" 
       @click="getReceivers()">
       Get Customers
     </button>
     <span class="errorMsg" v-if="errorMsg">{{ errorMsg }}</span>
     <editor
       :api-key="mce_key"
       :init="{
         height: 500,
         menubar: false,
         plugins: [
           'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount'
         ],
         toolbar:
           'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help'
       }"
       v-model="message.body"
     />
   </div>
</template>
<script>
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'customerMessage',
  components: {
    'editor': Editor
  },
  data () {
    return {
      message: {
        subject: null,
        body: null,
        mce_key: process.env.VUE_APP_MCE_KEY
      },
      errorMsg: null
    }
  },
  methods: {
    getReceivers: function () {
      console.log(`Message Subject: ${this.message.subject}`)
      console.log(`Message Body: ${this.message.body}`)
      if (this.message.body === null || this.message.subject === null) {
        this.errorMsg = 'You must have a subject and a message to send to proceed!'
      } else {
        this.$router.push({ name: 'SelectCustomers', params: { 'payload': this.message } })
      }
    }
  }
}
</script>
<style scoped>
.errorMsg {
  font-weight: bold;
  color: #FF0000;
  font-size: 12px;
}
</style>
