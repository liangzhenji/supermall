<template>
  <div class="comment">
    <div class="comment_title">
      <p>用户评价</p>
      <div class="more">
        <a href="#">更多</a>
      </div>
    </div>
    <div class="comment_content">
      <div class="user">
        <img :src="commentInfo.userImage" alt="">
        <p>{{commentInfo.userName}}</p>
      </div>
      <p class="content">{{commentInfo.content}}</p>
      <div class="time">
        <span>{{commentInfo.created | getDate}}</span>
        <span class="style">{{commentInfo.style}}</span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "DetailCommentInfo",
        props:{
            commentInfo:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        filters: {
            getDate(date) {
                var reg = new RegExp( '-' , "g" )
                return date.replace(reg, '.');
            }
        }
    }
</script>

<style scoped>
  .comment{
    border-top: 5px solid #f2f5f8;
    border-bottom: 5px solid #f2f5f8;
    padding: 15px;
  }
  .comment_title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #666;
    padding-bottom: 15px;
    border-bottom: .026667rem solid rgba(0,0,0,.1);
  }
  .comment p{
    font-size: 16px;
  }
  .more{
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  .more img {
    width: 15px;
    height: 15px;
  }
  .comment_content{
    padding-top: 10px;
  }
  .user{
    display: flex;
    align-items: center;
    color: #333333;
  }
  .user img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .content{
    font-size: 14px;
    color: #777;
    padding-top: 10px;
  }
  .time {
    padding-top: 10px;
    color: #999;
    font-size: 12px;
  }
  .style {
    padding: 0 5px;
  }





  /*.comment{*/
  /*  border-top: 5px solid #f2f5f8;*/
  /*  border-bottom: 5px solid #f2f5f8;*/
  /*  padding: 15px;*/
  /*  .comment_title{*/
  /*    display: flex;*/
  /*    align-items: center;*/
  /*    justify-content: space-between;*/
  /*    color: #666;*/
  /*    padding-bottom: 15px;*/
  /*    border-bottom: .026667rem solid rgba(0,0,0,.1);*/
  /*    p {*/
  /*      font-size: 16px;*/
  /*    }*/
  /*    .more{*/
  /*      display: flex;*/
  /*      align-items: center;*/
  /*      font-size: 14px;*/
  /*      img {*/
  /*        width: 15px;*/
  /*        height: 15px;*/
  /*      }*/
  /*    }*/
  /*  }*/
  /*  .comment_content{*/
  /*    padding-top: 10px;*/
  /*    .user{*/
  /*      display: flex;*/
  /*      align-items: center;*/
  /*      color: #333333;*/
  /*      img {*/
  /*        width: 50px;*/
  /*        height: 50px;*/
  /*        border-radius: 50%;*/
  /*        margin-right: 10px;*/
  /*      }*/
  /*    }*/
  /*    .content{*/
  /*      font-size: 14px;*/
  /*      color: #777;*/
  /*      padding-top: 10px;*/
  /*    }*/
  /*    .time{*/
  /*      padding-top: 10px;*/
  /*      color: #999;*/
  /*      font-size: 12px;*/
  /*      .style {*/
  /*        padding: 0 5px;*/
  /*      }*/
  /*    }*/
  /*  }*/
  /*}*/
</style>
