<!-- 如果你在 js 里，要实现元素的过渡动画，你的思路是什么？ -->
<!--
  1. js 操作 style，transition: all 1s ease(这个缓动函数就随意);
  2. 通过 js 操作元素的 class，预先定义好一些动画相关的类名，通过切换类名的形式，实现动画
  3. js 代码，然后结合 requestAnimationFrame

  4. gsap
 -->
<!-- 2 -->
<!-- 在 Vue 源码中，也是使用 2 这个方式实现的
  在过渡时，通过切换类名来进行动画的启动与执行
  通过监听
-->
<template>
  <div class="hello">
    <h1 @click="change()">{{ msg }}{{ msg1 }}</h1>
    hello, {{ cname }}
    <div id="demo">123</div>


    <!-- transition 是一定需要借助 transition 名，name，这个 name vue 会将它作为过渡动画的 class 定义 -->
    <transition name="fade">
      <!-- transition 基本原理
        1. 通过 v-if 控制元素的显示与隐藏
        2. 通过 transition 的 name 属性，定义过渡动画的 class
        3. 通过 css 定义过渡动画的样式

        首先组件在即将出现时，vue 将其添加到 dom 中，然后绑定对应的 class，实现进场过渡
        元素退场执行完后（transitionend），vue 会将其从 dom 中删除
      -->
      <div v-if="isShow">我有时候可以看见，有时看不见</div>
    </transition>

    

    <div>------------------</div>
    <button @click="isShow = !isShow">
      切换上面这个组件的显示态 {{ isShow ? "hide" : "show" }}
    </button>
    <TransitionGroup name="list">
      <div v-for="i in items" v-bind:key="i">{{ i }}</div>
    </TransitionGroup>
    <button @click="add">add</button>
    <button @click="remove">remove</button>
    <!-- v-if -->
    <!-- v-if 和  v-show 的区别 -->
  </div>
</template>

<script>
import { mixin1 } from "../mixins/msg";

export default {
  mixins: [mixin1],
  name: "HelloWorld",
  inject: ["cname"],
  data() {
    return {
      msg: "HelloWorld",
      isShow: true,
      items: [1, 2, 3, 4, 5],
      activeIndex: 0,
    };
  },
  methods: {
    shuffle() {
      // 我们需要时刻关注 v-bind:key，以及整个数据
      // 如果这样做， Vue 无法进行复用以及 diff  优化，从而将传入数据作为全新的值处理，因此也就无法进行过渡了
      // this.items = this.items.sort(() => Math.random() - 0.5);
    },
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length);
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, ++this.items.length);
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1);
    },
  },
  mounted() {
    console.log("mounted");
    const demoDom = document.querySelector("#demo");


    //监听元素过度事件
    demoDom.addEventListener("transitionstart", () => {
      console.log("transition start");
    });
    demoDom.addEventListener("transitionend", () => {
      console.log("transition end");
      demoDom.parentElement.removeChild(demoDom);
    });
  },
  // props: {
  //   msg: String
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#demo {
  width: 100px;
  height: 100px;
  background-color: red;
  transition: all 1s ease;
}
#demo:hover {
  transform: translateX(100px);
}

/* 过渡动画的定义 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/* 过渡动画的定义 */
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
