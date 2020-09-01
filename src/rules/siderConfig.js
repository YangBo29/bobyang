export default [
    {
        linkName: 'CSS3',
        linkKey: 'css3',
        linkActive: false,
        linkNext: [
            {
                linkName: 'li',
                linkKey: 'li',
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
