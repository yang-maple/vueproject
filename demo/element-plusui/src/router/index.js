import {createRouter,createWebHistory} from 'vue-router'

//定义路由
const routes =[
    {
        path: '/tag',
        component: ()=>import('@/views/basic/Tag.vue'),
    },
    {
        path: '/button',
        component: ()=>import('@/views/basic/Button.vue'),
    },
    {
        path: '/card',
        component: ()=>import('@/views/basic/Card.vue'),
    },
    {
        path: '/',
        component: ()=>import('@/views/basic/Container.vue'),
    },
    {
        path: '/form',
        component: ()=>import('@/views/form/form.vue'),
    },
    {
        path: '/upload',
        component: ()=>import('@/views/form/Upload.vue'),
    },
]


//初始化路由实例
const router = createRouter({
    history: createWebHistory(),
    routes,
});

//导出 路由
export default router;