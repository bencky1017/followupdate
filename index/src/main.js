import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'		//引用element-plus插件
import '../node_modules/element-plus/dist/index.css'		//引用element-plus插件样式
import * as ElementPlusIconsVue from '@element-plus/icons-vue'		//导入所有icon

import App from './App.vue'

const app=createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
app.use(ElementPlus)
app.mount('#app')
