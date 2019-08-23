## Router

#### Install
```js
// NPM
npm install vue-router
```

```html
<!-- html --> 
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
```

#### main.js
```js
import Vue from "vue";
import App from "./App.vue";
import router from './router';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
```

#### router.js
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    { 
      path: '/404',
      name: '404',
      component: {
        template: `<p>404 - Page Not Found</p>`
      }
    },
    { 
      path: '*', 
      redirect: '/404' 
    }, 
  ]
})

```

#### component.html
```html
<router-link to="/">Home</router-link>
<router-link to="/about">About</router-link>

<section class="router">  
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</section>
```

#### component.scss
```scss
<style lang='scss' scoped>
  @import "./scss/baseline";

  .fade-enter-active, .fade-leave-active {
    transition: all 0.5s ;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .router {
    position: relative;

    > * {
      position: absolute;
    }
  }
  
  router-link-active {
    color: complement($linkColor);
  }

</style>
```
