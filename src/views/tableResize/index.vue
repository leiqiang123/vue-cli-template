<template>
  <div class="container">
    <Menu
            v-if="showMenu"
            :contextPos="contextPos"
            @menyItemCmd="menyItemCmd"
    />
    <table class="table table-bordered" id="table" style="width: 600px">
      <thead>
      <tr>
        <th id="th1" style="border: 1px solid #dfe6ec; padding: 0"></th>
        <th id="th2" style="border: 1px solid #dfe6ec; padding: 0"></th>
        <th id="th3" style="border: 1px solid #dfe6ec; padding: 0"></th>
        <th id="th4" style="border: 1px solid #dfe6ec; padding: 0"></th>
      </tr>
      </thead>
      <tbody class="table-body">
      <tr class="table-list"
          v-for="(row, index) in tableData.rows"
          :key="index">
        <td class="table-item"
            v-for="(col, index) in tableData.cols"
            :class="{selected: selectedCells.includes((row - 1) * tableData.cols + col - 1)}"
            :key="index"
            :colspan="tableData.layoutDetail[(row - 1) * tableData.cols + col - 1] && tableData.layoutDetail[(row - 1) * tableData.cols + col - 1]['colSpan']"
            :rowspan="tableData.layoutDetail[(row - 1) * tableData.cols + col - 1] && tableData.layoutDetail[(row - 1) * tableData.cols + col - 1]['rowSpan']"
            v-show="isNeedShow(row-1, col-1)"
            @mousedown="e => handleCellMousedown(e, row, col)"
            @mouseenter.stop.prevent="handleCellMouseenter(row, col)"
            @mouseup="handleMouseUp"
            @contextmenu.prevent.stop="handleContendMenu"
        >
          {{row}}---{{col}}
        </td>
      </tr>
      </tbody>
    </table>
    <button @click="testClick">测试</button>
  </div>
</template>

<script>
  import createColResizable from 'resizable-columns'
  export default {
    name: 'tableResize',
    data() {
      return {
        // 这块其实初始设置 tableData： {cols: 3, rows: 2} 就可以 把tabelDate设置成计算属性，layoutDetail 用js生成更方便
        tableData: {
          cols: 4,
          rows: 4,
          layoutDetail: [
            {colSpan: 1, rowSpan: 1, row:1, col:1},
            {colSpan: 1, rowSpan: 1, row:1, col:2},
            {colSpan: 1, rowSpan: 1, row:1, col:3},
            {colSpan: 1, rowSpan: 1, row:1, col:4},
            {colSpan: 1, rowSpan: 1, row:2, col:1},
            {colSpan: 1, rowSpan: 1, row:2, col:2},
            {colSpan: 1, rowSpan: 1, row:2, col:3},
            {colSpan: 1, rowSpan: 1, row:2, col:4},
            {colSpan: 1, rowSpan: 1, row:3, col:1},
            {colSpan: 1, rowSpan: 1, row:3, col:2},
            {colSpan: 1, rowSpan: 1, row:3, col:3},
            {colSpan: 1, rowSpan: 1, row:3, col:4},
            {colSpan: 1, rowSpan: 1, row:4, col:1},
            {colSpan: 1, rowSpan: 1, row:4, col:2},
            {colSpan: 1, rowSpan: 1, row:4, col:3},
            {colSpan: 1, rowSpan: 1, row:4, col:4},
          ]
        },
        selectedCells: [],
        // mousedown的时候设置为其他值 否则都是-1
        selectionHold: -1,
        startX: -1,
        startY: -1,
        endX: -1,
        endY: -1,
        showMenu: false,
        contextPos: {l: 0, t: 0},
      }
    },
    components: {
      Menu: () => import('./components/Menu'),
    },
    created() {
    },
    mounted(){
      const domElemTableList = document.querySelectorAll('.table');
      createColResizable(domElemTableList[0], {
        liveDrag: true,
        headerOnly: false
      });
      createColResizable(domElemTableList[1], {
        liveDrag: true,
        headerOnly: false
      });
    },
    computed: {
      hiddenTdMaps () {
        let hiddenTdMaps = {}
        let tableData = this.tableData
        for (let i = 0; i < tableData.rows; i++) {
          for (let j = 0; j < tableData.cols; j++) {
            if (tableData.layoutDetail[i * tableData.cols + j]) {
              let colInfo = tableData.layoutDetail[i * tableData.cols + j]
              if ((colInfo.colSpan && colInfo.colSpan > 1) || (colInfo.rowSpan && colInfo.rowSpan > 1)) {
                for (let row = i; row < i + (colInfo.rowSpan || 1); row++) {
                  // col = (row === i ? j + 1 : j) 是为了避开自己
                  for (let col = (row === i ? j + 1 : j); col < (j + (colInfo.colSpan || 1)); col++) {
                    hiddenTdMaps[`${row}_${col}`] = true
                  }
                }
              }
            }
          }
        }
        return hiddenTdMaps
      }
    },
    methods: {
      testClick(){
        console.log(document.all.th1.offsetWidth)
        console.log(document.all.th2.offsetWidth)
        console.log(document.all.th3.offsetWidth)
        console.log(document.all.th4.offsetWidth)
      },
      clearSelection () {
        this.selectedCells = []
      },
      changeShowMenu () {
        this.showMenu = !this.showMenu
      },
      isNeedShow(row, col){
        return !this.hiddenTdMaps[`${row}_${col}`]
      },
      handleCellMousedown (e, x, y) {
        this.showMenu = false
        if (e.which === 1) {
          this.endX = this.endY = -1
        }
        // e.witch = 1 是鼠标左键
        if (e.which !== 1) return
        let cellIndex = (x - 1) * this.tableData.cols + y - 1
        this.startX = x
        this.startY = y
        this.selectedCells = [cellIndex]
        // mousedown标志
        this.selectionHold = cellIndex
      },
      handleCellMouseenter (x, y) {
        if (this.selectionHold !== -1) {
          this.endX = x
          this.endY = y
          this.rendSelectedCell()
        }
      },
      rendSelectedCell () {
        let startX = Math.min(this.startX, this.endX)
        let startY = Math.min(this.startY, this.endY)
        let endX = Math.max(this.startX, this.endX)
        let endY = Math.max(this.startY, this.endY)
        let tableData = this.tableData
        let selectedCells = []
        for(let row = 1; row <= tableData.cols; row++) {
          for(let col = 1; col <= tableData.cols; col++) {
            if(row >= startX && row <= endX && col >= startY && col <= endY) {
              selectedCells.push((row - 1) * this.tableData.cols + col -1)
            }
          }
        }
        this.selectedCells = selectedCells
      },
      handleMouseUp (e) {
        this.selectionHold = -1
      },
      handleContendMenu (e) {
        this.showMenu = true
        this.contextPos.l = e.pageX
        this.contextPos.t = e.pageY
      },
      reRenderTableLayout () {
        let arr = []
        for (let i = 0; i < this.tableData.cols * this.tableData.rows; i++) {
          arr.push({
            colSpan: '',
            rowSpan: ''
          })
        }
        this.tableData.layoutDetail = arr
      },
      menyItemCmd (cmd) {
        let tableData = this.tableData
        let startX = Math.min(this.startX, this.endX)
        let startY = Math.min(this.startY, this.endY)
        let endX = Math.max(this.startX, this.endX)
        let endY = Math.max(this.startY, this.endY)
        switch (cmd) {
          case 'merge':
            //计算公式：Row：endRow+endRowSpan-startRow    Col：endCol+endColSpan-startCol
            if((startX === -1 || startY === -1 || endX === -1 || endY === -1) || ((startX === endX) && (startY === endY))) return
            let startBox = this.tableData.layoutDetail[this.selectedCells[0]]
            let endBox = this.tableData.layoutDetail[this.selectedCells[this.selectedCells.length - 1]]
            startBox.rowSpan = endBox.row + endBox.rowSpan - startBox.row
            startBox.colSpan = endBox.col + endBox.colSpan - startBox.col
            this.selectedCells.forEach((item, index) => {
              if(index > 0){
                this.tableData.layoutDetail[item].rowSpan = 1
                this.tableData.layoutDetail[item].colSpan = 1
              }
            })
            // let startIndex = (startX - 1) * tableData.cols +  startY - 1
            // this.tableData.layoutDetail[startIndex].rowSpan = endX - startX + 1
            // this.tableData.layoutDetail[startIndex].colSpan = endY - startY + 1
            break
          case 'split':
            this.selectedCells.forEach(item => {
              this.tableData.layoutDetail[item].rowSpan = 1
              this.tableData.layoutDetail[item].colSpan = 1
            })
            // this.tableData.layoutDetail.forEach(v => {
            //   v.rowSpan = 1
            //   v.colSpan = 1
            // })
            break
          case 'delRow':
            this.tableData.rows = this.tableData.rows - 1
            // 行号 列号变化时候  需要重新渲染 this.tableData.layoutDetail
            this.reRenderTableLayout()
            break
          case 'delCol':
            this.tableData.cols = this.tableData.cols - 1
            this.reRenderTableLayout()
            break
          case 'addRow':
            this.tableData.rows = this.tableData.rows + 1
            this.reRenderTableLayout()
            break
          case 'addCol':
            this.tableData.cols = this.tableData.cols + 1
            this.reRenderTableLayout()
            break
          case 'clearSelection':
            this.clearSelection()
            break
        }
        this.changeShowMenu()
      },
    },
  }
</script>
<style lang='scss'>
  @import "./resizeTable";
  .container{
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently*/

    .table-item{
      height: 150px;
    }
    .selected{
      background: #2dc3e8;
    }
    .table{
      .table-body{
        .table-list{
          width: 600px;
          height: 150px;
          td{
            padding:0 10px;
            height: 150px;
          }
        }
      }
    }
    .drag-div{
      height: 100%;
      background: #2dc3e8;
      color: white;
    }
  }
</style>
