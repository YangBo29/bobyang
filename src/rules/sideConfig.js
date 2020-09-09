/**
 * {
        linkName: '布局类', // 一级分类名称
        linkKey: 'layout', // 跳转路由
        linkActive: false, // 是否可跳转
        linkNext: [
            {
                linkName: 'display:grid',
                linkKey: 'grid',
                linkActive: true,
                linkNext: null,
            },
        ],
    },
*/

export default [
    {
        linkName: 'CSS3',
        linkKey: 'css3',
        linkActive: false,
        linkNext: [
            {
                linkName: 'transform',
                linkKey: 'transform',
                linkActive: true,
                linkNext: null,
            },
        ],
    },
    {
        linkName: '组件类',
        linkKey: 'component',
        linkActive: false,
        linkNext: [
            {
                linkName: 'button',
                linkKey: 'Button',
                linkActive: true,
                linkNext: null,
            },
            {
                linkName: 'nav',
                linkKey: 'Nav',
                linkActive: true,
                linkNext: null,
            },
        ],
    },
    {
        linkName: '布局类',
        linkKey: 'layout',
        linkActive: false,
        linkNext: [
            {
                linkName: 'display:grid',
                linkKey: 'grid',
                linkActive: true,
                linkNext: null,
            },
        ],
    },
    {
        linkName: '配置类',
        linkKey: 'config',
        linkActive: false,
        linkNext: null,
    },
    {
        linkName: '算法类',
        linkKey: 'algorithm',
        linkActive: false,
        linkNext: null,
    },
];
