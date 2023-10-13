import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
//导入
import axios from "axios";

//注册

const app=createApp(App)

app.config.globalProperties.$axios=axios

app.use(router).mount("#app");
