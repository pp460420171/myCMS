import Vue from 'vue'
import Router from 'vue-router'
// 懒加载组件
const CMSQuery = () => import('views/cms/CMSQuery')
const CMSReport = () => import('views/cms/CMSReport')
const Tooling = () => import('views/tooling/Tooling')

Vue.use(Router)

const routes = [
  // 重定位
  {
    path:'',
    redirect:'/cmsquery'
  },
  {
    path:'/cmsquery',
    component: CMSQuery
  },
  {
    path:'/tooling',
    component: Tooling
  },
  {
    path:'/cmsreport',
    component: CMSReport
  },
]
const router = new Router({
  routes,
  // mode:'history'
})

export default router