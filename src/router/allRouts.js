const allRouts = [
    {
        path: 'manage',
        component: () => import(/* webpackChunkName: "manage" */ 'pages/home/manage'),
        name: 'manage',
        meta: {
            icon: 'iconfont icon-pingtaiguanli',
            fullPath: '/manage',
            name: '管理首页'
        }
    },
    {
        path: 'studentMag',
        name: 'studentMag',
        redirect: '/studentMag/stuProductMag',
        component: () => import(/* webpackChunkName: "studentMag" */ 'pages/home/studentMag'),
        meta: {
            icon: 'iconfont icon-waixingren',
            fullPath: '/studentMag',
            name: '学员管理'
        },
        children: [
            {
                path: 'stuProductMag',
                name: 'stuProductMag',
                component: () => import(/* webpackChunkName: "stuProductMag" */ 'pages/home/studentMag/stuProductMag'),
                meta: {
                    icon: 'iconfont icon-xitongrizhi',
                    fullPath: '/studentMag/stuProductMag',
                    name: '学员项目管理'
                }
            },
            {
                path: 'stuData',
                name: 'stuData',
                component: () => import(/* webpackChunkName: "stuData" */ 'pages/home/studentMag/stuData'),
                meta: {
                    icon: 'iconfont icon-shujuzidian',
                    fullPath: '/studentMag/stuData',
                    name: '学员资料'
                }
            },
            {
                path: 'stuDormitory',
                name: 'stuDormitory',
                component: () => import(/* webpackChunkName: "stuDormitory" */ 'pages/home/studentMag/stuDormitory'),
                meta: {
                    icon: 'iconfont icon-jigouguanli',
                    fullPath: '/studentMag/stuDormitory',
                    name: '学员宿舍'
                }
            },

        ]
    },
    {
        path: 'checkMag',
        name: 'checkMag',
        component: () => import(/* webpackChunkName: "checkMag" */ 'pages/home/checkMag'),
        meta: {
            icon: 'iconfont icon-rizhiguanli',
            fullPath: '/checkMag',
            name: '考勤管理'
        }
    },
    {
        path: 'userMag',
        name: 'userMag',
        component: () => import(/* webpackChunkName: "userMag" */ 'pages/home/userMag'),
        meta: {
            icon: 'iconfont icon-aliens-fill',
            fullPath: '/userMag',
            name: '用户管理'
        }
    },
    {
        path: 'dataTotal',
        name: 'dataTotal',
        component: () => import(/* webpackChunkName: "dataTotal" */ 'pages/home/dataTotal'),
        meta: {
            icon: 'iconfont icon-ziyuanjiankong',
            fullPath: '/dataTotal',
            name: '数据统计'
        }
    },
    {
        path: 'mine',
        name: 'mine',
        component: () => import(/* webpackChunkName: "mine" */ 'pages/home/mine'),
        meta: {
            icon: 'iconfont icon-gitlab-fill',
            fullPath: '/mine',
            name: '我的中心'
        }
    },

]


export default allRouts