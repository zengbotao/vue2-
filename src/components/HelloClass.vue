<template>
  <div class="hello">
    <h1 @click="change()">{{ msg }}{{ msg1 }}</h1>
    hello, {{ cname }}
  </div>
</template>

<script>
import { mixin1 } from "../mixins/msg";

export default {
  mixins: [mixin1],
  name: "HelloClass",
  inject: ["cname"],
  data() {
    return {
      msg: "Hello",
    };
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
</style>
