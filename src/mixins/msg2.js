/*
 * @Description: 
 * @Autor: zengbotao@myhexin.com
 * @Date: 2023-08-20 20:35:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-04-30 18:02:08
 */



export const mixin2 = {
  data() {
    return {
      msg1: "mixingdf2",
    };
  },
  created() {
    console.log("mixin2 created");
  },
  computed: {
    mag2(){
      return this.msg1 + "222"
    }
  },
  watch: {
    msg1(){
      console.log('object2');
    }
  },
  methods: {
    test() {
      console.log("mixin2 test");
    },
    change() {
      this.msg1 = "mixin2 changed";
    },
  },
};
