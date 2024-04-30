/*
 * @Description: 
 * @Autor: zengbotao@myhexin.com
 * @Date: 2023-08-20 20:35:08
 * @LastEditors: 
 * @LastEditTime: 2024-04-29 20:22:48
 */

export const mixin1 = {
  data() {
    return {
      msg1: "mixin1",
    };
  },
  created() {
    console.log("mixin1 created");
  },
  computed: {
    mag2(){
      return this.msg1 + "2"
    }
  },
  watch: {
    msg1(){
      console.log('object1');
    }
  },
  methods: {
    test() {
      console.log("mixin1 test");
    },
    change() {
      this.msg1 = "mixin1 changed";
    },
  },
};
