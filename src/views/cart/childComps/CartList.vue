<template>
  <div class="cart-list">
    <Scroll class="content" ref="scroll">
      <CartListItem v-for="(item,index) in cartList" :key="index" :product="item"></CartListItem>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import CartListItem from "@/views/cart/childComps/CartListItem";

import {mapGetters} from 'vuex'
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters([
      'cartList'
    ])
  },
  activated() {
    //在这个生命周期做一次刷新，更新页面高度
    this.$refs.scroll.refresh()
  }

}
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px);
}
.content {
  height: 100%;
  overflow: hidden;
}

</style>
