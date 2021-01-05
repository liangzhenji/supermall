import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";

export  const itemListenerMixin = {
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh,200)
    //对监听的事件进行保存
    this.itemImgListener = () =>{
      refresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgListener)
  },
  data(){
    return {
      itemImgListener:null
    }
  }
}

export const backTopMixin = {
  components:{
    BackTop
  },
  data(){
    return{
      isShowBackTop:false
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    },

  }
}
