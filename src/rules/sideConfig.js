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
        linkName: '缓存类',
        linkKey: 'storage',
        linkActive: false,
        linkNext: [
            {
                linkName: 'indexDb',
                linkKey: 'indexdb',
                linkActive: true,
                linkNext: null,
            },
        ],
    },
    {
        linkName: '插件类',
        linkKey: 'plugin',
        linkActive: false,
        linkNext: [
            {
                linkName: 'Spreadsheet',
                linkKey: 'spreadsheet',
                linkActive: true,
                linkNext: null,
            },
            {
                linkName: 'SlickSlide',
                linkKey: 'slickSlide',
                linkActive: true,
                linkNext: null,
            },
        ],
    },
    {
        linkName: '语法类',
        linkKey: 'grammar',
        linkActive: false,
        linkNext: [
            {
                linkName: 'Promise',
                linkKey: 'promise',
                linkActive: true,
                linkNext: null,
            },
        ],
    },
    {
        linkName: 'webGL',
        linkKey: 'webgl',
        linkActive: false,
        linkNext: [
            {
                linkName: 'Three',
                linkKey: 'three',
                linkActive: true,
                linkNext: null,
            },
            {
                linkName: 'Three1',
                linkKey: 'three1',
                linkActive: true,
                linkNext: null,
            },
            {
                linkName: 'Three2',
                linkKey: 'three2',
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
