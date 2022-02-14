import {
  ADD_COUNTER,
  ADD_TO_CART
} from "@/store/mutation-types";

/*
* mutations 尽可能做的事情单一
* */

const mutations = {
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)

  }
}
export default mutations
