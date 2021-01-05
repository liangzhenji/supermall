export default {
  addCart(context,playload){
    return new Promise((resolve,reject) => {
      let oldProduct = null
      for(let item of context.state.cartList){
        if(item.id === playload.id){
          oldProduct = item
        }
      }
      if(oldProduct){
        context.commit('addCounter',oldProduct)
        resolve("当前的商品数量+1")
      }else{
        playload.count = 1
        context.commit('addToCart',playload)
        resolve("添加了新的商品")
      }
    })
  }
}
