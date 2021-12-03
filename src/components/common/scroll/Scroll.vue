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
import BetterScroll from "better-scroll";
import Pullup from "@better-scroll/pull-up";

BetterScroll.use(Pullup);

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null,
    };
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
  },
  mounted() {
    this.scroll = new BetterScroll(".wrapper", {
      scrollY: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: true,
      observeImage: true,
    });

    this.scroll.on("scroll", (position) => {
      // console.log(position);
      this.$emit('scroll',position)
    });

    this.scroll.on("pullingUp", () => {
      // console.log("上啦加载更多");
      // await fetchData()
      this.$emit('pullingUp')
    });
  },
};
</script>

<style scoped>
</style>