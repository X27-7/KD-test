

const dynamicRout = [
    {
        path: '/',
        component: () => import(/* webpackChunkName: "about" */ 'pages/home'),
    },
    {
        path: "*",
        component: () => import(/* webpackChunkName: "page404" */ 'pages/page404')
    }
]

export default dynamicRout