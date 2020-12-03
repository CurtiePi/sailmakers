<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2 :sp="salesperson">Welcome {{ salesperson.fname }} </h2>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Sailmakers',
      salesperson: null
    }
  },
  methods: {
    async getSalespersonByName (name) {
      console.log(`Getting ${name}`)
      let response = await AuthenticationService.salespersonByName(name)
      console.log(response.data)
      this.salesperson = response.data[0]
      localStorage.sp = JSON.stringify(this.salesperson)
    }
  },
  created () {
    console.log('Get a salesperson')
    this.getSalespersonByName('David Martin')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
