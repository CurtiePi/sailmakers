Vue.config.ignoredElements = [/^ion-/]

<template>
  <div id="app">
      <HeaderNav 
        :nav-links="navLinks"/>
      <router-view></router-view>
  </div>
</template>

<script>
import HeaderNav from '@/components/HeaderNavigation'

export default {
  name: 'app',
  components: {
    HeaderNav
  },
  data () {
    return {
      navLinks: [
        {
          text: 'Customer',
          icon: 'person',
          subNavLinks: [
            {
              text: 'Customer List',
              name: 'Customers',
              icon: 'people'
            },
            {
              text: 'Add Customer',
              name: 'CustomerAdd',
              icon: 'person-add',
              param: {
                name: 'atomic',
                value: true
              }
            }
          ]
        },
        {
          text: 'Quote',
          icon: 'document',
          subNavLinks: [
            {
              text: ' Quote List',
              name: 'Quotes',
              icon: 'documents'
            },
            {
              text: 'New Customer Quote',
              name: 'CustomerAdd',
              icon: 'document-attach',
              param: {
                name: 'atomic',
                value: false
              }
            }
          ]
        },
        {
          text: 'Port',
          icon: 'home',
          subNavLinks: [
            {
              text: 'Ports List',
              name: 'PortsList',
              icon: 'list-circle'
            },
            {
              text: 'Add Port',
              name: 'PortCreate',
              icon: 'boat'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style>

body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>

