import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import { registerStore } from './store'
import SvgIcon from '@/components/SvgIcon/index.vue'
import './style/index.scss'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
// 全局注册图标组件（移植自猫步简历的组件使用 <svg-icon> 标签）
app.component('SvgIcon', SvgIcon)
// 初始化全局 store 单例（素材组件/属性面板通过 appStore 直接访问）
registerStore()
// 初始化全局 store 单例（素材组件/属性面板通过 appStore 直接访问）
registerStore()
// 全局注册 Element Plus 图标，方便模板里直接使用 <el-icon><edit /></el-icon>
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component as any)
}
app.mount('#app')
