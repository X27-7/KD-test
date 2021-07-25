import Vue from "vue";
import VueRouter from "vue-router";


// 处理进入同一路径报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "about" */ 'pages/login'),
  },

];

const router = new VueRouter({
  routes,
});

export default router;
