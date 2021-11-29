<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend :recommends="recommends"></recommend>
    <feature></feature>
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
    ></tab-control>
    <ui>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ui>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import Recommend from "./childComps/Recommend";
import Feature from "./childComps/Feature.vue";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";

import { getHomeMultidata } from "network/home";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    Recommend,
    Feature,
    NavBar,
    TabControl,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      // result: null
    };
  },
  //组件创建完后立即发送网络请求
  created() {
    getHomeMultidata().then((res) => {
      console.log(res);
      // this.result = res;
      this.banners = res.data.data.banner.list;
      this.recommends = res.data.data.recommend.list;
    });
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 10;
}

.tab-control {
  position: sticky;
  top: 44px;
}
</style>
