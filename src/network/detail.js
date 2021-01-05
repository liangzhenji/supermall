import {myrequest} from "./request";

export function getDetail(id) {
  return myrequest({
    url:'/detail',
    params:{
      id
    }
  })
}

export class Goods{
  constructor(res){
    this.title = res.title
    this.price = res.price
    this.oldprice = res.oldprice
    this.discountDesc = res.discountDesc
    this.sellCount = res.sellCount
    this.collCount=res.collCount
    this.tips=res.tips
    this.icon1=res.icon1
    this.icon2=res.icon2
    this.text1=res.text1
    this.text2=res.text2
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shoplogo;
    this.name = shopInfo.shopname;
    // this.fans = shopInfo.cFans;
    this.sells = shopInfo.shopsells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.shopgoods
  }
}

export class GoodsParam {
  constructor(info) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images;
    this.infos = info.set;
    this.sizes = info.tables;
  }
}

export class Comment{
  constructor(info){
    this.userImage = info.userImage;
    this.userName=info.userName;
    this.content=info.content;
    this.created=info.created;
    this.style=info.style;
  }
}
