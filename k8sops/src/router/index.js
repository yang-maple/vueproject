import { createRouter, createWebHistory } from "vue-router";
//导入进度条组件
import NProgress from "nprogress";
import 'nprogress/nprogress.css'
import layout from '@/layout/Layout.vue'

// 定义路由规划
const routes = [
    {
        path: '/home',
        component: layout,
        meta: { title: '概要', requireAuth: true },
        children: [
            {
                path: '/home',
                icon: 'LocationInformation',
                component: () => import('@/views/Home.vue'),
                name: '概要',
            }
        ]
    },
    {
        path: '/workload',
        component: layout,
        name: '工作负载',
        icon: "Menu",
        meta: { title: '工作负载', requireAuth: true },
        children: [
            {
                path: '/workload/deployment',
                name: "deployment",
                component: () => import('@/views/deployment/Deployment.vue'),
                icon: 'el-icon-s-data',
                meta: { title: 'Deployment', requireAuth: true },
            },
            {
                path: '/workload/pod',
                name: 'pod',
                component: () => import('@/views/pod/Pod.vue'),
                icon: 'el-icon-document-data',
                meta: { title: 'Pod', requireAuth: true },
            },
            {
                path: '/workload/daemonset',
                name: "daemonset",
                component: () => import('@/views/daemonset/Daemonset.vue'),
                icon: 'el-icon-s-data',
                meta: { title: 'Daemonset', requireAuth: true },
            },
            {
                path: '/workload/statefulset',
                name: "Statefulset",
                component: () => import('@/views/statefulset/Statefulset.vue'),
                icon: 'el-icon-s-data',
                meta: { title: 'Statefulset', requireAuth: true },
            },
            {
                path: '/workload/pod/shell',
                name: 'shell',
                component: () => import('@/views/pod/Xtrem.vue'),
                meta: {
                    title: 'shell',
                    requireAuth: false
                }
            },
            {
                path: '/workload/pod/log',
                name: 'logs',
                component: () => import('@/views/pod/Xlogs.vue'),
                meta: {
                    title: 'logs',
                    requireAuth: false
                }
            }
        ]
    },
    {
        path: '/cluster',
        component: layout,
        name: '集群资源',
        icon: "Menu",
        meta: { title: '集群资源', requireAuth: true },
        children: [
            {
                path: '/cluster/node',
                icon: 'LocationInformation',
                component: () => import('@/views/nodes/Node.vue'),
                name: 'Node 节点',
                meta: { title: 'Node', requireAuth: true },
            },
            {
                path: '/cluster/node_detail',
                name: 'node详情',
                icon: 'LocationInformation',
                component: () => import('@/views/nodes/Nodedetail.vue'),
                meta: { title: '集群资源', requireAuth: true },
            },
            {
                path: '/cluster/namespaces',
                icon: 'LocationInformation',
                component: () => import('@/views/namespace/Namespace.vue'),
                name: 'Namespace 资源',
                meta: { title: 'Namespace', requireAuth: true },
            },
            {
                path: '/cluster/PersistentVolumes',
                icon: 'LocationInformation',
                component: () => import('@/views/PersistentVolume/PersistentVolumes.vue'),
                name: 'PersistentVolume 资源',
                meta: { title: 'PersistentVolume', requireAuth: true },
            }
        ]
    },
    {
        path: '/sever',
        component: layout,
        name: '服务资源',
        icon: "Menu",
        meta: { title: '服务资源', requireAuth: true },
        children: [
            {
                path: '/sever/services',
                icon: 'LocationInformation',
                component: () => import('@/views/service/Service.vue'),
                name: 'Services',
                meta: { title: 'Services', requireAuth: true },
            },
            {
                path: '/sever/ingress',
                icon: 'LocationInformation',
                component: () => import('@/views/service/Ingress.vue'),
                name: 'Ingress',
                meta: { title: 'Ingress', requireAuth: true },
            }, {
                path: '/sever/storageclass',
                icon: 'LocationInformation',
                component: () => import('@/views/service/Class.vue'),
                name: 'Storageclass',
                meta: { title: 'Storageclass', requireAuth: true },
            }
        ]
    },
    {
        path: '/configure',
        component: layout,
        name: '配置与存储',
        icon: "Menu",
        meta: { title: '配置与存储', requireAuth: true },
        children: [
            {
                path: '/configure/persistenvolumeclaim',
                icon: 'LocationInformation',
                component: () => import('@/views/storage/Persistenvolumeclaim.vue'),
                name: 'PersistenVolumeClaim',
                meta: { title: 'PersistenVolumeClaim', requireAuth: true },
            },
            {
                path: '/configure/configmap',
                icon: 'LocationInformation',
                component: () => import('@/views/storage/Configmap.vue'),
                name: 'Config Map',
                meta: { title: 'Config Map', requireAuth: true },
            },
            {
                path: '/configure/secret',
                icon: 'LocationInformation',
                component: () => import('@/views/storage/Secret.vue'),
                name: 'Secret',
                meta: { title: 'Secret', requireAuth: true },
            },
            {
                path: '/configure/storageclass',
                icon: 'LocationInformation',
                component: () => import('@/views/storage/Class.vue'),
                name: 'StorageClass',
                meta: { title: 'StorageClass', requireAuth: true },
            }
        ]
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/common/404.vue'),
        meta: {
            title: "404",
            requireAuth: false
        }
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404',
    },
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/403',
        name: '403',
        component: () => import('@/views/common/403.vue'),
        meta: {
            title: "403",
            requireAuth: false
        }
    },
]

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes
})

// 进度条配置
//**要递增进度条，只需使用.inc()
NProgress.inc(0.2) //这将获取当前状态值并添加0.2直到状态为0.994
NProgress.configure({
    easing: 'ease',// 动画方式
    speed: 600,      // 递增进度条的速度
    showSpinner: false //是否显示加载ico
})
//路由拦截
router.beforeEach((to, from, next) => {
    //启动进度条
    NProgress.start()
    //设置头部
    if (to.meta.title) {
        document.title = to.meta.title
    } else {
        document.title = "Kubernetes"
    }
    //放行
    next()
})

router.afterEach(() => {
    //关闭进度条
    NProgress.done()
})


//导出路由实例，被其他js引用
export default router