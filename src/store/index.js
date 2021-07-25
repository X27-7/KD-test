import Vue from "vue";
import Vuex from "vuex";
import router from '../router'

import { getMenuList } from 'api'
import getUserMenu from '../utils/getUserMenu'

import allRouts from '../router/allRouts'
import dynamicRout from '../router/dynamicRout'


Vue.use(Vuex);

let userInfo = JSON.parse(localStorage.getItem('userInfo'))
export default new Vuex.Store({
  state: {
    userInfo,
    userMenu: [],
    isCollapse: false,
    crumbs: []
  },
  mutations: {
    SET_INFO(state, payload) {
      state.userInfo = payload
    },
    SET_LIST(state, payload) {
      state.userMenu = payload
      let home = dynamicRout.find(it => it.path === '/')
      home.children = state.userMenu
      console.log(dynamicRout);
      // 动态添加路由
      router.addRoutes(dynamicRout)
    },
    SET_COLL(state) {
      state.isCollapse = !state.isCollapse
    },
    SET_CRUMBS(state, payload) {
      state.crumbs = payload
    }

  },
  actions: {
    GET_MENU({ commit }) {
      // return
      getMenuList().then(res => {
        console.log(123);
        let result = getUserMenu(allRouts, res.data.menuList)
        commit('SET_LIST', result)

      })

    }
  },
  modules: {},
});
