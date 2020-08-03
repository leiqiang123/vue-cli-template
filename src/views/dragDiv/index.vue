<template>
  <div class="about">
    <div class="container">
      <div class="drag-div" @mousedown="move">
        {{positionX}}
        {{positionY}}
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'adout',
    data() {
      return {
        positionX:0,
        positionY:0,
      }
    },
    created() {
      console.log(process.env.BASE_URL)
    },
    mounted() {
    },
    methods: {
      move(e){
        let odiv = e.target  //获取目标元素
        //算出鼠标相对元素的位置
        let disX = e.clientX - odiv.offsetLeft
        let disY = e.clientY - odiv.offsetTop
        document.onmousemove = (e)=>{       //鼠标按下并移动的事件
          //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          let left = e.clientX - disX
          let top = e.clientY - disY
          //绑定元素位置到positionX和positionY上面
          //移动当前元素
          if(top <= 150 && top >= 0){
            odiv.style.top = top + 'px'
            this.positionX = top
          }else if(top > 150){
            odiv.style.top = '150px'
            this.positionX = 150
          }else{
            odiv.style.top = '0px'
            this.positionX = 0
          }
          if(left <= 150 && left >= 0){
            odiv.style.left = left + 'px'
            this.positionY = left
          }else if(left > 150){
            odiv.style.left = '150px'
            this.positionY = 150
          }else{
            odiv.style.left = '0px'
            this.positionY = 0
          }
        }
        document.onmouseup = (e) => {
          document.onmousemove = null
          document.onmouseup = null
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .container{
    position: relative;
    width: 200px;
    height: 200px;
    background: rgba(0,0,0,0.5);
    .drag-div{
      position: absolute;     /*定位*/
      top: 0;
      left: 0;
      width: 50px;
      height: 50px;
      background: yellow;
      color: #000;
      user-select: none;
    }
  }
</style>
