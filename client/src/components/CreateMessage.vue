<template>
<div id="container">
     <label>Subject
       <input type='text' v-model="message.subject"/>
     </label>
     <br />
     <label>Recipients
       <input type='text' size="70" v-model="recipients"/>
     </label>
     <span v-if="message.file_attachment">Attachment: {{ message.file_attachment }} </span>
     <br />
     <button type="button" class="sendBtn"
       @click="sendMessage()">
       Send Mail
     </button>
     <button type="button" class="cancelBtn"
       @click="cancelEmail()">
       Cancel
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
  props: ['targets', 'attachment', 'caller', 'cbdata', 'isBulk'],
  components: {
    'editor': Editor
  },
  data () {
    return {
      message: {
        subject: null,
        body: null,
        file_attachment: null
      },
      mce_key: process.env.VUE_APP_MCE_KEY,
      errorMsg: null,
      recipients: null,
      callback_data: null,
      callerName: 'Customers',
      isBulkEmail: false
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
        if (this.message.file_attachment) {
          payload['attachment'] = this.message.file_attachment
        }

        let response = null
        if (this.isBulkEmail) {
          response = await AuthenticationService.sendEmail(payload)
        } else {
          response = await AuthenticationService.bulkEmail(payload)
        }
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
    },
    cancelEmail: function () {
      if (['Quotes', 'Customers', 'StaffList'].includes(this.callerName)) {
        this.$router.replace({ name: this.callerName })
      } else {
        this.$router.replace({ name: this.callerName[0], params: { 'payload': this.callback_data, 'caller': this.callerName.splice(1) } })
      }
    }
  },
  mounted () {
    if (this.targets) {
      this.recipients = this.targets.join(',')
    }
    if (this.attachment) {
      this.message.file_attachment = this.attachment
    }
    if (this.isBulk) {
      this.isBulkMail = true
    }
    if (this.caller) {
      this.callerName = this.caller
      if (this.cbdata) {
        this.callback_data = this.cbdata
      }
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

.cancelBtn {
  margin-left:25px;
}

.sendBtn {
  margin-right: 5px;
}
</style>
