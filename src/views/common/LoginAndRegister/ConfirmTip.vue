<template>
    <div class="container1111" >
       <div class="body1111">
           <div class="header1111">提示:<i class="iconfont iconguanbi" @click="cancel()"></i></div>
           <div class="bottom1111">
               <div>{{tiptext}}</div>
               <div><div @click="cancel()">取消</div><div @click="confirm()">确定</div></div>
           </div>
       </div>
        
    </div>
   
</template>
<script>
  export default {
    props:[],
    methods:{
        cancel(){
            this.$emit('cancelevent')
        },
        confirm(){
            this.$emit('confirmenent')
        }
        
    },
    props:['tiptext']
  }
</script>

<style scoped>
.container1111{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.5);
    position:fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;  
    min-width: 600px;
}
.body1111{
    width: 500px;
    background-color: white;
    border-radius: 3px;
    border-top: 2px solid rgb(226,107, 52);
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.header1111{
    font-size: 14px;
    height: 36px;
    width: 100%;
    line-height: 36px;
    font-weight:600;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0,0,0,0.1);
}
.header1111 >i{
    font-size: 10px;
    cursor: pointer;
}
.header1111 >i:hover{
    font-size: 10px;
    color: rgb(226,107, 52);
}
.bottom1111{
    display: flex;
    flex-direction: column;

    width: 100%;
     padding: 10px;
}
.bottom1111 > div:nth-child(1){
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    text-align: center;

}
.bottom1111 > div:nth-child(2){
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 40px;
}
.bottom1111 > div > div {
    height: 35px;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    line-height: 35px;
    color:white;
    background-color:rgb(226,107, 52);
    border-radius: 3px;
    cursor: pointer;
    padding: 0 30px;
    font-size: 15px;
}
.bottom1111 > div > div:hover{
    background-color: rgba(0,0,0,0.3);
}
</style>