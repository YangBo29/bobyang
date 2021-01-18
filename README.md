## Pro 项目

### src 内文件说明
 - assets 文件是图片文件夹 
     * systems 为系统图片： 如 默认显示图片，加载图片等
     * icons 为 小图标图片： 系统中的小icon图标的存放处
     * 其他文件（名称和页面保持一致） 按页面级别或按系列级别创建并存放

 - components
    * template---全局 模板类组件
    * plugin---全局 插件
    * 其他文件---页面级组件（名称和页面保持一致）

- layouts 页面入口，全局类组件

- models 全局数据存放 
    * 名称与功能保持一致

- pages 页面（也是路由<规则看umi>）

- theme 主题
    * 整个项目的颜色存放处（用到的颜色不可写在页面的样式文件内，全部提取出来，在页面样式文件中引用， 调用）

- data 默认数据存放处（保证接口，图标在没有返回数据的时候也不会导致页面崩溃）
    * project<文件夹> 与接口中同名文件对应
    * resource<文件夹> 与接口中同名文件对应
    * user<文件夹> 与接口中同名文件对应
    * apiData.js 合并上述三个的所有接口数据（调用接口相关数据的文件），
    * chart.js 图表默认数据

- services 接口
    * project<文件夹> 与数据中同名文件对应
    * resource<文件夹> 与数据中同名文件对应
    * user<文件夹> 与数据中同名文件对应
    * apis.js 合并上述三个的所有接口（调用接口的文件）

 - utils 公用函数
    * store.js 存储类函数
    * formats.js 格式化类函数
    * regulars.js 正则类函数
    * request.js 请求封装
    * trans.js  转换类函数
    * index.js  合并所有公用函数（调用公用函数的文件）

 - app.js 配置文件

 - global.css 全局样式初始化


