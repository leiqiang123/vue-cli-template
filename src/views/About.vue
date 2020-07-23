<template>
  <div class="about">
     <h1>This is an about page</h1>
<!--     工具栏容器 -->
     <div id="toolbar-container"></div>
<!--     编辑器容器 -->
    <div id="editor">
      <p>This is the initial editor content.</p>
    </div>
    <div class="cs-empty"></div>
    <div class="container">
      <div class="drag-div" @mousedown="move">
        {{positionX}}
        {{positionY}}
      </div>
    </div>
  </div>
</template>
<script>
  import CKEditor from '@ckeditor/ckeditor5-build-decoupled-document'
  import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn'
  export default {
    name: 'adout',
    data() {
      return {
        positionX:0,
        positionY:0,
      }
    },
    created() {
    },
    mounted() {
      // this.initCKEditor()
    },
    methods: {
      initCKEditor() {
        CKEditor.create(document.querySelector('#editor'), {
          language: 'zh-cn',
          ckfinder: {
            uploadUrl: '/admin/Upload/uploadUrl'
            //后端处理上传逻辑返回json数据,包括uploaded(选项true/false)和url两个字段
          }
        }).then(editor => {
          const toolbarContainer = document.querySelector('#toolbar-container')
          toolbarContainer.appendChild(editor.ui.view.toolbar.element)
          this.editor = editor //将编辑器保存起来，用来随时获取编辑器中的内容等，执行一些操作
        }).catch(error => {
          console.error(error)
        })
      },
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
  .cs-empty:empty{
    width: 120px;
    padding: 20px;
    border: 10px dashed;
  }
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
