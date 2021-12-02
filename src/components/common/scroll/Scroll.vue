<template>
  <div class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
/* 
  若ref是绑定在组件中的，那么通过this.$refs.refname获取到的是一个组件对象
  若是在普通元素中，则获取到的是一个元素对象
*/
import BetterScroll from 'better-scroll'
import Pullup from "@better-scroll/pull-up";

BetterScroll.use(Pullup);

export default {
  name: "Scroll",
  mounted() {
    console.log('111');
    let bs = new BetterScroll(".wrapper", {
      scrollY: true,
      probeType: 3,
      pullUpLoad: true,
    });

    bs.on("scroll", (position) => {
      // console.log(position);
    });

    bs.on("pullingUp", () => {
      console.log("上啦加载更多");
      // await fetchData()
      bs.finishPullUp()
    });
  },
};
</script>

<style scoped>
.wrapper {
  height: 300px;
}
</style>