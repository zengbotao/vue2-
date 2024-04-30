<!--
 * @Description: 
 * @Autor: zengbotao@myhexin.com
 * @Date: 2023-08-20 22:27:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-04-30 12:48:57
-->
<template>
  <!-- 插槽为了实现外部组件可以自定义内部组件内容 -->
  <div>
    <div class="header">
      <!-- :d 以后，外部使用，为什么要这样做
        组件设计：组件内部的数据，不应该由外部组件直接修改和变更
        组件一定要满足开放封闭原则，内部实现封闭，向外部开放数据访问和一些 api
      -->
      <slot name="header" :data="'haha'" :msg="msg"></slot>
    </div>
    hello world
    <div class="footer" @click="onClicked">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "SlotDemo",
  inject: ["cname"],
  methods: {
    onClicked() {
      this.$myMethod();
      console.log("onClicked", this.$vuexStore);
    },
  },
  data() {
    return {
      msg: "HelloWorld",
    };
  },
  mounted() {
    console.log(this);
  },
};
</script>

<style scoped></style>
