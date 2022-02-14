import {
  ADD_COUNTER,
  ADD_TO_CART
} from "@/store/mutation-types";

const actions = {
  addCart2(context,payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      console.log(payload,'payload')

      if(oldProduct) {
        // oldProduct.count += 1
        //发送到mutations执行+1操作
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前数量+1')
      } else {
        payload.count = 1
        // context.state.cartList.push(payload)
        //发送到mutations执行新增操作
        context.commit(ADD_TO_CART, payload)
        resolve('添加了一个新的商品')
      }
    })
  }
}

export default actions
