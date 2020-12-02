<template>
  <div class="container">
    <div class="card">
      <div class="flex-grid">
        <span class="col hilite">Profile for {{ salesperson.fname }} {{ salesperson.lname }}</span>
      </div>
      <hr></hr>
      <div class="flex-grid-halfs">
        <span class="col">Email: {{ salesperson.email }}</span>
        <span class="col">Phone: {{ salesperson.phone }}</span>
      </div>
      <hr></hr>
      <div class="flex-grid">
        <span class="col">Receive Quote Email: {{ (salesperson.get_mail) ? 'Yes' : 'No' }}</span>
      </div>
      <p>
        <button @click="timeToEdit()">Edit</button>
        <button><router-link :to="{ name: 'StaffList' }">List</router-link></button>
      </p>
    </div>     
  </div>
</template>
<script>

export default {
  name: 'staffProfile',
  props: ['payload'],
  data () {
    return {
      salesperson: null
    }
  },
  methods: {
    timeToEdit () {
      this.$router.push({ name: 'StaffEdit', params: { 'edit_payload': this.salesperson } })
    }
  },
  mounted () {
    if (this.payload) {
      console.log(this.payload)
      this.salesperson = this.payload
    }
  }
}
</script>
<style scoped>
@media (min-width: 36em) {
  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    max-width: 300px;
    width: 80%;
    margin: auto;
    text-align: center;
    flex-direction: column;
  }

  .sector {
    width: 100%;
    margin: 0 auto;
    flex-direction: column;
    padding: 3px;
  }

}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 900px;
  width: 80%;
  margin: auto;
  background-color: #F5F5DC;
  font-size: 19px;
}

.flex-grid {
  display: flex;
}

.flex-grid .col {
  flex: 1;
}

.flex-grid-halfs {
  display: flex;
  justify-content: space-between;
}

.flex-grid-halfs .col {
  .width: 45%;
}

hr.solid {
  border-top: 3px solid #bbb;
  width: 80%;
  margin: auto;
}

.hilite {
  font-weight: bold;
  font-size: 40px; 
}

span {
  color: #000081;
  font-size: 30px; 
}

button {
  margin: 5px 5px;
}

button:hover, a:hover {
  opacity: 0.7;
}

</style>
