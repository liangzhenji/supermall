<template>
    <swiper class="topSwiper">
      <swiper-item  v-for="item in topImages">
        <img :src="item" alt="" class="topImage" @load="imageLoad">
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'
    export default {
        name: "DetailSwiper",
        components:{
          Swiper,
          SwiperItem
        },
        data(){
            return{
                isLoad:false
            }
        },
        props:{
            topImages:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        methods:{
            imageLoad(){
                if (!this.isLoad){
                    this.$emit('swiperImageLoad')
                    this.isLoad = true
                }
            }
        }
    }
</script>

<style scoped>
  .topSwiper{
    width: 100%;
    pisition:absolute;
    top:-5px;
  }
  .topImage{
    width: 100%;
    height:200px;
  }
</style>
