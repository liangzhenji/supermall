<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :isChecked="isSelectAll" class="check-button" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>

    <div class="calculate">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import {mapGetters} from 'vuex'
    export default {
        name: "CartBottomBar",
        components:{
            CheckButton
        },
        computed:{
            ...mapGetters(['cartList']),
            totalPrice(){
                return '￥' + this.cartList.filter(item => {
                    return item.checked
                }).reduce((preValue,item) => {
                    return preValue + item.price * item.count
                },0)
            },
            checkLength(){
                return this.cartList.filter(item => item.checked).length
            },
            isSelectAll(){
               // return (!this.cartList.filter(item => !item.checked).length)
                if (this.cartList.length === 0) return false
                return !this.cartList.find(item => !item.checked)
            }
        },
        methods:{
                checkClick() {
                    if (this.isSelectAll) {
                        this.cartList.forEach(item => item.checked = false)
                    } else {
                        this.cartList.forEach(item => item.checked = true)
                    }
                    // this.cartList.forEach(item => item.checked = !this.isSelectAll)
                }
        }
    }
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    position: relative;
    line-height: 40px;
    background-color: #eee;
    display: flex;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-left: 10px;
    margin-right: 5px;
  }
  .check-content{
    display: flex;
    align-items: center;
    width: 80px;
  }
  .price{
    margin-left:20px;
    flex:1;
  }
  .calculate{
    background-color: red;
    width: 90px;
    color:#fff;
    text-align: center;
  }
</style>
