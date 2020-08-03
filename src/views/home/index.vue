<template>
  <div>
    <div id="nav">
      <router-link to="/tableResize">table-resize</router-link> |
      <router-link to="/dragDiv">块内拖拽</router-link>
    </div>
    <div>
      <v-sheet height="400">
        <v-calendar
          ref="calendar"
          :now="today"
          :value="today"
          :events="events"
          color="primary"
          type="week"
        ></v-calendar>
      </v-sheet>
    </div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="lighten-2" dark v-bind="attrs" v-on="on">点我</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2">
          弹窗啊！
        </v-card-title>
        <v-card-text>
          我是一个小弹窗。。。
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">接受</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return{
        today: '2019-01-08',
        events: [
          {
            name: 'Weekly Meeting',
            start: '2019-01-07 09:00',
            end: '2019-01-07 10:00',
          },
          {
            name: 'Thomas\' Birthday',
            start: '2019-01-10',
          },
          {
            name: 'Mash Potatoes',
            start: '2019-01-09 12:30',
            end: '2019-01-09 15:30',
          },
        ],
        dialog: false,
      }
    },
    mounted () {
      this.$refs.calendar.scrollToTime('08:00')
    },
    methods: {},
  }
</script>

<style scoped lang="scss">
  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
