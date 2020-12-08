<template>
<div id="container">
     <label>Subject
       <input type='text' v-model="message.subject"/>
     </label>
     <br />
     <label>Recipients
       <input type='text' size="70" v-model="recipients"/>
     </label>
     <button type="button"
       @click="sendMessage()">
       Send Mail
     </button>
     <br />
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
import AuthenticationService from '@/services/AuthenticationService'
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'customerMessage',
  props: ['payload'],
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
      errorMsg: null,
      recipients: null
    }
  },
  methods: {
    sendMessage: async function () {
      if (this.message.subject !== null && this.message.body !== null) {
        var payload = {
          'subject': this.message.subject,
          'body': this.message.body,
          'recipients': this.recipients.split(',')
        }
        let response = await AuthenticationService.emailCustomers(payload)
        if (response.status === 200) {
          this.$router.replace({ name: 'Customers' })
        }
      } else {
        this.errorMsg = 'Please write your message and subject before trying to email your message!'
      }
    },
    getReceivers: function () {
      if (this.message.body === null || this.message.subject === null) {
        this.errorMsg = 'You must have a subject and a message to send to proceed!'
      } else {
        this.$router.push({ name: 'SelectCustomers', params: { 'payload': this.message } })
      }
    }
  },
  mounted () {
    if (this.payload) {
      this.recipients = this.payload.join(',')
    }
  }
}
</script>
<style scoped>
.errorMsg {
  font-weight: bold;
  color: #FF0000;
  font-size: 22px;
}
</style>
