<template>
  <nav :style="{ background: background || '#333' }">
    <ul class="outer">
      <li
        v-for="(link, index) in navLinks"
        :key="index"
        @mouseenter="expandTab($event)"
        @mouseleave="compressTab($event)"
      >
        {{ link.text }}
        <ion-icon :name="link.icon"></ion-icon>
        <div class="parent">
          <ul :style="{background: background || '#333' }">
            <li
              v-for="(subNavLink, subindex) in link.subNavLinks"
              :key="subindex"
            >
              <router-link
                :to="subNavLink.path"
                :style="{color: linkColor || '#DDD'}"
              >
                {{ subNavLink.text }}
                <ion-icon :name="subNavLink.icon"></ion-icon>
              </router-link>
            </li>
          </ul>
        </div>   
      </li>
    </ul>
  </nav>
</template>

<script>
export default{
  props: ['navLinks', 'background', 'linkColor', 'hoverBackground'],
  components: {
  },
  data () {
    return {}
  },
  methods: {
    expandTab (event) {
      event.currentTarget.style.background = this.hoverBackground || '#999'
      event.currentTarget.lastChild.style.display = 'block'
    },
    compressTab (event) {
      event.currentTarget.style.background = this.background || '#333'
      event.currentTarget.lastChild.style.display = 'none'
    }
  }
}
</script>
<style scoped>
  nav {
    height: 60px;
    width: 100%;
    color: #fff;
    margin-bottom: 20px;
 
    ul.outer {
      display: flex;
      height: 100%;
      width: 30%;
      align-items: flex-end;
      margin-block-start: 0;
      margin-block-end: 0;
      padding-inline-start: 0;
      color: #fff;
    }

  }

  .parent {
    position: absolute;
    display: none;
    width: 200px;
    background-color: #fff;
    background: #fff;

    ul {
      display: flex;
      flex-direction: column;
    }

    li {
      border: 2px solid #f0f;
    }

    a {
      border: 2px solid #ff0;
      text-decoration: none;
      display: flex;
      flex-direction: row-reverse;
    }
  }
</style>
