import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import StorageHandler from '@/utils/StorageHandler'
import getPageTitle from '@/utils/get-page-title'

let storageHandler = new StorageHandler()
NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)

  //建立白名单路由
  let whiteRouterList = ['/login', '/404']
  if(whiteRouterList.includes(to.path)){
    next()
  }else {
    next()
  }
})

router.afterEach((to, from, next) => {
  // finish progress bar
  NProgress.done()
})

//重新加载系统公共资源
function reloadCache(){
  return new Promise( async (resolve, reject) => {
    resolve()
  })
}
