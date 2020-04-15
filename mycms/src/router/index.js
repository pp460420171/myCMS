import Vue from 'vue'
import Router from 'vue-router'
// 懒加载组件
const CMS = () => import('views/cms/CMS')
const Tooling = () => import('views/tooling/Tooling')

Vue.use(Router)

const routes = [
  // 重定位
  {
    path:'',
    redirect:'/cms'
  },
  {
    path:'/cms',
    component: CMS
  },
  {
    path:'/tooling',
    component: Tooling
  },
]
const router = new Router({
  routes,
  // mode:'history'
})

export default router