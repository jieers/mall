import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";

//1. 使用插件
Vue.use(Vuex)
//2. 创建对象
const store = new Vuex.Store({
  state: {
    //
    cartList: []

  },
  mutations,
  actions,
  getters,
})
//3. 挂载Vue实例上
export default store
