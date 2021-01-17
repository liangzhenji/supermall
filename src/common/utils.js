//防抖函数/节流
export function debounce(func,delay){
  let timer = null
  return function(...args){
    if(timer) clearTimeout(timer)
    timer = setTimeout(() =>{
      func.apply(this,args)
    },delay)
  }
}

// //思路：需要把refresh函数包装成不会立刻执行的函数
// export function debounce(func,delay){
//
//   return function() {
//
//   }
// }
// //settimeout，当前计时器没完成的话，撤销计时器再即时
// let timer = null
// function delay(){
//   if(timer) clearTimeout(timer){
//     timer = setTimeout(() =>{
//       func.apply(this,args)
//     },delay)
//   }
// }
// //结合包装(delay替换掉function，又因为debounce又作用域可以保存let)
// export function debounce(func,delay){
//   let timer = null
//   return function(...args){
//     if(timer) clearTimeout(timer)
//     timer = setTimeout(() =>{
//       func.apply(this,args)
//     },delay)
//   }
// }
