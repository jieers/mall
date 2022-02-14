<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckButton :value="isSelectAll" class="check-button" @click.native="checkClick"></CheckButton>
      <span>全选</span>

    </div>
    <div>
      合计: {{totalPrice}}
    </div>

    <div class="cal"></div>
      去计算: {{checkLength}}
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import {mapGetters} from "vuex";
export default {
  name: "CartBottonBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false
      return !(this.cartList.filter(item => !item.checked).length)
    }
  },
  methods: {
    checkClick() {
      //全选功能
      if(this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false)
      } else {
        this.cartList.forEach(item => item.checked = true)
      }

    }
  }
}
</script>

<style scoped>
.bottom-bar {
  position: relative;
  /*top: 500px;*/


  display: flex;
  height: 40px;
  background-color: #eee;
  line-height: 40px;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.cal {
  margin-left: 60px;
}

</style>
