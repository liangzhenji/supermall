<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"/>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view></feature-view>

      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"/>

      <GoodList :goods="showGoods"></GoodList>
    </scroll>

    <back-top @click.native ="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodList from "components/content/goods/GoodList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import {getHomeMultidata,getHomeGoods} from "network/home";

  // import {debounce} from "common/utils";
  import {itemListenerMixin} from "common/mixin";
  import {backTopMixin} from "common/mixin";

  export default {
        name: "Home",
        components:{
            NavBar,
            HomeSwiper,
            RecommendView,
            FeatureView,
            TabControl,
            GoodList,
            Scroll
        },
      data(){
        return{
            banners : [],
            recommends:[],
            goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]}
            },
            currentType:'pop',
            tabOffsetTop:0,
            isTabFixed:false,
            saveY:0
        }
      },
      computed:{
        showGoods(){
            return this.goods[this.currentType].list
        }
      },
      methods:{
          //  网络请求
          getHomeMultidata(){
              getHomeMultidata().then(res => {
                  console.log(res)
                  this.banners = res.data.banner.list;
                  this.recommends = res.data.recommend.list;
              })
          },
          getHomeGoods(type){
              const page = this.goods[type].page + 1
              getHomeGoods(type,page).then(res =>{
                  console.log(res)
                  this.goods[type].list.push(...res.data)
                  this.goods[type].page += 1
                  //完成加载上拉更多
                  this.$refs.scroll.finishPullUp()
              })
          },
          //事件监听
          tabClick(index){
            switch (index) {
                case 0:
                    this.currentType = 'pop'
                    break
                case 1:
                    this.currentType = 'new'
                    break
                case 2:
                    this.currentType = 'sell'
                    break
            }
            this.$refs.tabControl1.currentIndex = index;
            this.$refs.tabControl2.currentIndex = index;
          },
          contentScroll(position){
              //判断backTop是否显示
              this.isShowBackTop = (-position.y) > 1000
              //tabCtoller吸顶
              this.isTabFixed = (-position.y) > this.tabOffsetTop
          },
          loadMore(){
              this.getHomeGoods(this.currentType)
          },
          swiperImageLoad(){
              this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
          }
      },
       mounted() {

      },
      mixins:[itemListenerMixin,backTopMixin],
        created() {
            this.getHomeMultidata()
            this.getHomeGoods('pop')
            this.getHomeGoods('new')
            this.getHomeGoods('sell')

        },
      //新版scroll原位置切换页面的时候还会保留
      activated() {
          this.$refs.scroll.scrollTo(0,this.saveY,0)
          this.$refs.scroll.refresh()
      },
      deactivated() {
            //保存Y值
          this.saveY = this.$refs.scroll.getScrollY()
          //取消全局事件监听
          this.$bus.$off('itemImageLoad',this.itemImgListener)
      }
  }
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color:#f6f6f6;
    /*浏览器原生滚动时，为了让导航不一起滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  /*如果超过top，position会换成fixed*/
  /*.tab-control{*/
  /*  position: sticky;*/
  /*  top:44px;*/
  /*  z-index: 9;*/
  /*}*/
  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  .tab-control{
    position:relative;
    z-index: 9;
  }
</style>
