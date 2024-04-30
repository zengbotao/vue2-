import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// 我们后面很多课程会介绍插件化机制的实现
// 因为 webpack、babel、vue-router、vuex、Pinia、vue-cli 等都是基于插件化实现的
// 插件的核心内容有：
// 1.插件底座
// 2.插件的注册
// 3.插件的卸载
// 4.插件的生命周期

// webpack 结合 tappable 实现的插件化机制

const MyPlugin = {
  // 必须具备 install 方法，用于插件的注册
  install(Vue /* , options */) {
    // 1. 添加全局方法或 property
    Vue.myGlobalMethod = function () {
      // 逻辑...
    };

    // 2. 添加全局资源
    // Vue.directive("my-directive", {
    //   bind(el, binding, vnode, oldVnode) {
    //     // 逻辑...
    //   },
    // });

    // 3. 注入组件选项
    Vue.mixin({
      created: function () {
        // 逻辑...
      },
    });

    // 4. 添加实例方法
    Vue.prototype.$myMethod = function (/* methodOptions */) {
      // 逻辑...
      console.log("myMethod");
    };

    Vue.prototype.$vuexStore = { name: "heyi" };
  },
};

// 插件可以在不侵入源码的情况下，对源码进行扩展
// Vue 我们不用侵入到 Vue 源码内部，而是只需要简单定义插件，Vue 就能处理插件并增强自身能力
Vue.use(MyPlugin);

const app = new Vue({
  render: (h) => h(App),
});

console.log(app);

app.$mount("#app");
