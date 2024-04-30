<!--
 * @Description: 
 * @Autor: zengbotao@myhexin.com
 * @Date: 2023-08-20 22:15:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-04-30 17:58:04
-->
<template>
  <div id="app">
    <img @click="change" alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld />
    {{ msg1 }}<br/>{{ mag2 }}
    <HelloClass />
    <TransitionDemo />
    <SlotDemo>
      <template #header="innerData">
        <div>custom header {{ innerData.data }}---{{ innerData.msg }}</div>
      </template>
      <template #footer>
        <div>custom footer</div>
      </template>
    </SlotDemo>
  </div>
</template>

<script>
// Vue3 provide/inject
// 很多场景下可以不使用全局状态管理
// 1. 如果是简单组件状态，直接使用 props
// 2. 如果是跨组件状态，可以使用 provide/inject
// 3. 如果是更复杂组件之间的状态共享，使用 Pinia
import HelloWorld from "./components/HelloWorld.vue";
import HelloClass from "./components/HelloClass.vue";
import TransitionDemo from "./components/TransitionDemo.vue";
import SlotDemo from "./components/SlotDemo.vue";
import { mixin1 } from "./mixins/msg";
import { mixin2 } from "./mixins/msg2";
// setup API 的形式
// 用 mixin 的时候，有什么问题？
// 1. 变量覆盖
// 2. 溯源困难
// 3. 无法做到按需引入

// minxin 在一定程度上实现了代码逻辑封装与复用，但是在当下来看，他的优势不敌缺点
// 从对象配置式到 setup API 的演进，简单概括来说，就是从配置式到函数式的演进
// 主要的实现原理：编译开始

// 定义一个 mixin
// const mixin1 = {
//   data() {
//     return {
//       msg: "mixin1",
//     };
//   },
//   created() {
//     console.log("mixin1 created");
//   },
//   methods: {
//     test() {
//       console.log("mixin1 test");
//     },
//   },
// };

// 对象配置式
export default {
  name: "App",
  data() {
    return {
      // msg1: "heydsdsi",
    }
  },
  provide() {
    return {
      cname: "I am Heyi",
    };
  },
  mixins: [mixin1,mixin2],
  computed: { 
    // mag2(){
    //   return this.msg1 + "22"
    // }
  },
  methods: {
    // change() {
    //   this.msg1 = "app changed";
    // },
  },
  components: {
    HelloWorld,
    HelloClass,
    TransitionDemo,
    SlotDemo,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
