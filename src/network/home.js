import {request,myrequest} from "./request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type,page){
  return myrequest({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}
