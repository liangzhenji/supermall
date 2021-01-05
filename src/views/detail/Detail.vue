<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
        <DetailSwiper :top-images="topImages" @swiperImageLoad="swiperImageLoad"></DetailSwiper>
        <DetailBaseInfo :goods="goods"></DetailBaseInfo>
        <DetailShopInfo :shop="shop"></DetailShopInfo>
        <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="swiperImageLoad"></DetailGoodsInfo>
        <DetailParamInfo :paramInfo="paramInfo" ref="params"></DetailParamInfo>
        <DetailComment :commentInfo="commentInfo" ref="comment"></DetailComment>
        <GoodList :goods="recommends" ref="recommend"></GoodList>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native ="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailComment from "./childComps/DetailComment";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodList from "components/content/goods/GoodList";

  import {getDetail,Goods,Shop,GoodsParam,Comment} from "network/detail";
  import {getHomeGoods} from "network/home"

  // import {debounce} from "common/utils";
  import {itemListenerMixin} from "common/mixin";
  import {backTopMixin} from "common/mixin";
  import {mapActions} from 'vuex'

  export default {
        name: "Detail",
        components: {
            DetailComment,
            DetailParamInfo,
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            Scroll,
            DetailGoodsInfo,
            GoodList,
            DetailBottomBar
        },
        data(){
            return{
                id:null,
                topImages:[],
                goods:{},
                shop:{},
                detailInfo:{},
                paramInfo:{},
                commentInfo:{},
                recommends:[],
                themeTopYs:[],
                currentIndex:null,
                res:{}
            }
        },
        created(){
            this.id = this.$route.params.id

            getDetail(this.id).then(res =>{
                this.res = res
                //获取顶部轮播数据
                this.topImages = res.data.swiperUrl
                //获取商品信息
                this.goods = new Goods(res.data)
                //获取店铺信息
                this.shop = new Shop(res.data)
                //获取商品预览图
                this.detailInfo = res.data.detailInfo
                //获取参数信息
                this.paramInfo = new GoodsParam(res.data)
                //获取评论信息
                this.commentInfo = new Comment(res.data)
            }),
                getHomeGoods('sell',1).then(res =>{
                    //推荐信息
                    console.log(res)
                    this.recommends.push(...res.data)
                })
        },
      mounted(){

      },
      updated(){
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          //hack
          this.themeTopYs.push(Number.MAX_VALUE)
          console.log(this.themeTopYs)
      },
      mixins:[itemListenerMixin,backTopMixin],
      destroyed(){
          //取消全局事件监听
          this.$bus.$off('itemImageLoad',this.itemImgListener)
      },
      methods:{
            ...mapActions(['addCart']),
          swiperImageLoad(){
              this.$refs.scroll.refresh()
          },
          titleClick(index){
              this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
          },
          contentScroll(position){
              const positionY = -position.y
              let length = this.themeTopYs.length
              for(let i=0;i<length-1;i++){
                  //普通做法
                  // if( (this.currentIndex !==i && i< length -1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
                  //     || (i === length -1 && positionY >= this.themeTopYs[i]) ){
                  //     this.currentIndex = i
                  //     this.$refs.nav.currentIndex = this.currentIndex
                  // }
                  //hack
                  if(this.currentIndex !==i && (i< length -1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
                      this.currentIndex = i
                      this.$refs.nav.currentIndex = this.currentIndex
                  }
              }
              //判断backTop是否显示
              this.isShowBackTop = (-position.y) > 1000
          },
          addToCart(){
              //获取购物车需要展示的信息
              const product = {}
              product.image = "http://localhost:8088/img/test.jpg"
              product.title = this.res.data.title
              product.desc = this.res.data.style
              product.price = 80
              product.id = this.res.data.id
              // product.realPrice = 50
              //将商品添加到购物车
              this.addCart(product).then(res => {
                 this.$toast.show(res,1500)
              })
              // this.$store.dispatch('addCart',product).then(res => {
              //     console.log(res)
              // })
          }
      }
    }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh;
  }

  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #ffffff;
  }

  .content{
    height:calc(100% - 93px);
  }
</style>
