import { createRouter, createWebHashHistory } from 'vue-router'

// 使用 hash 模式：构建产物双击 index.html 或放到任意静态托管都能用，无需服务器配置
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/index.vue'),
  },
  {
    path: '/designer',
    name: 'Designer',
    component: () => import('@/views/Designer/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
