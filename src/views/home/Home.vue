<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <div class="wrapper">
      <div class="content">
        <home-swiper :banners="banners"></home-swiper>
        <recommend :recommends="recommends"></recommend>
        <feature></feature>
        <tab-control
          class="tab-control"
          :titles="['流行', '新款', '精选']"
          @tabClick="tabClick"
        ></tab-control>
        <goods-list :goods="goods[currentType].list"></goods-list>
      </div>
    </div>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import Recommend from "./childComps/Recommend";
import Feature from "./childComps/Feature.vue";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    Recommend,
    Feature,
    NavBar,
    TabControl,
    GoodsList,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
    };
  },
  //组件创建完后立即发送网络请求
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    // 网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list = [...this.goods[type].list, ...res.data.list];
        this.goods[type].page += 1;
      });
    },
    //事件监听相关方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
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
  z-index: 9;
}
</style>
