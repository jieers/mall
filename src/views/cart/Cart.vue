<template>
  <!--  导航-->
  <div class="cart">
    <NavBar class="nav-bar">
      <div slot="center">购物车({{ cartCount }})</div>
    </NavBar>
    <!--    商品列表-->
    <CartList class="cart-list"></CartList>
    <CartBottonBar></CartBottonBar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "@/views/cart/childComps/CartList";
import CartBottonBar from "@/views/cart/childComps/CartBottonBar";
import {mapGetters} from 'vuex'

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottonBar,
  },
//   computed: {
//     cartLength() {
//       return this.$store.state.cartList.length
//     }
// },
  computed: {
    //辅助函数用法
    ...mapGetters([
      'cartCount'
    ])
  },
}
</script>

<style scoped>
#cart {
  /*position: relative;*/
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}

.cart-list {
  position: absolute;
  top: 44px;
  bottom: 49px;
  width: 100%;
}
</style>
