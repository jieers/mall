<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll
      class="a"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @loadImg="loadImg"></home-swiper>
      <recommend :recommends="recommends"></recommend>
      <feature></feature>
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl"
      ></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <!-- 组件不能直接监听点击，.native可以用来监听原生组件点击事件 -->
    <back-top @click.native="backClick" v-show="isBackTop"></back-top>
  </div>
</template>

<script>
// 首页业务组件
import HomeSwiper from "./childComps/HomeSwiper";
import Recommend from "./childComps/Recommend";
import Feature from "./childComps/Feature";
//公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

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
    Scroll,
    BackTop,
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
      isBackTop: false,
      tabOffsetTop: 0,
    };
  },
  //组件创建完后立即发送网络请求
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //所有组件都有一个属性，$el，用于获取组件元素
    // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
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

        this.$refs.scroll.scroll.finishPullUp();
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
    //返回顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    //顶部按钮的显示与隐藏
    contentScroll(position) {
      // console.log(position);
      this.isBackTop = -position.y > 1000;

      
    },
    //上啦加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.scroll.refresh();
    },
    loadImg() {
      //所有组件都有一个属性，$el，用于获取组件元素
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 11; */
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}

.a {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;

  /* height: 500px; */
}
</style>
