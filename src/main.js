import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import qfSubMenu from "qf-sub-menu" //引入我们的侧边栏组件

import 'assets/style/base.css'

Vue.use(ElementUI);
Vue.use(qfSubMenu)

// Vue.config.productionTip = false;

console.log(process.env.VUE_APP_BASE_URL);

let script = document.createElement('script')
script.src = '//at.alicdn.com/t/font_2692731_7mx3xvb7sv4.js'
document.documentElement.appendChild(script)

// 路由守卫 在每次发路由之前进行设置  带DX则给路由 next（）
router.beforeEach((to, from, next) => {
  // console.log(to);
  let DX = localStorage.getItem('DX') || ''

  if (DX) {
    if (store.state.userMenu && store.state.userMenu.length > 0) {
      next()
    } else {
      store.dispatch('GET_MENU')
      // .then(() => {
      //   next({ path: to.path })
      // })
      next()
    }


  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login' })
    }
  }

})

router.afterEach((to, from, next) => {
  // console.log(to.matched);
  store.commit('SET_CRUMBS', to.matched)
})


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
