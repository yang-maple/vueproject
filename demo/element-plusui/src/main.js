import { createApp } from 'vue'
import App from './App.vue'
//导入路由
import router from "./router";

//导入 element-plus 以及 Css 文件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons-vue'

const app=createApp(App)
app.use(router)
app.mount('#app')

for (let iconName in ElIcons){
    app.component(iconName,ElIcons[iconName])
}

// 引用 element-plus
app.use(ElementPlus)


