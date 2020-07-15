// import setCookie from "../utils/store";

export default {
    // 空间名
    namespace: 'global',

    // 状态机
    state: {
        SCREENSIZE: 1920, // 当前屏幕尺寸， 默认1920
        LAYOUTSIZE: 1440, // 设计稿尺寸 （参照尺寸）
        pathName: '', // 当前页面路由 String
        update: false, // 页面更新
        userInfo: null, //用户信息
        jurisdiction: {
            //权限树
            //总权限树 格式化后的
            projectList: false, //工程列表 20200428版本前用户肯定会有
            createFolder: false, //新建文件夹
            createProject: false, //新建项目
            resource: false, //资源管理 20200428版本不上
            uploadModel: false, //上传模型 20200428版本不上
            uploadSourceMaterial: false, //上传素材 20200428版本不上
            userManage: false, //用户管理
            delUser: false, //用户删除
            editUser: false, //用户编辑
            addUser: false, //用户新增
            folderSetting: false, //文件夹设置
            baseSetting: false, // 基础设置
            modifyFolder: false, //文件夹修改
            delFolder: false, //删除文件夹
            memberManage: false, //成员管理
            addMember: false, //添加成员
            delMember: false, //删除成员
            setMemberJur: false, //设置成员权限
            projectManage: false, //项目管理
            previewProject: false, //预览 20200428版本前用户肯定会有
            editProject: false, //编辑
            copyProject: false, //复制
            delProject: false, //删除
            shareProject: false, //分享
            setTemplate: false, //设为模板
            setJurisdiction: false, //设置权限
        },
        showToast: false, //toast提示框
        toast: {
            type: '', //类型 warn || success
            msg: '', // 提示文字
        },
        groupInd: 0,
        groupId: null,
    },

    // 事件池
    subscriptions: {},

    // dispatch
    effects: {
        // 全局更新
        *update({ payload }, { call, put, select }) {
            yield put({
                type: 'updateAPI',
            });
        },
        // 获取用户token和用户信息
        *storeUserInfo({ payload }, { call, put, select }) {
            yield put({
                type: 'storeUserInfoAPI',
                payload: payload,
            });
        },
        // 清楚用户信息
        *clearUserInfo({ payload }, { call, put, select }) {
            yield put({
                type: 'clearUserInfoAPI',
            });
        },
    },

    // reducers
    reducers: {
        updateState(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
        // 更新
        updateAPI(state, action) {
            return {
                ...state,
                update: !state.update,
            };
        },
        // 更新用户信息
        storeUserInfoAPI(state, action) {
            return {
                ...state,
                userInfo: action.payload,
            };
        },
        // 清空用户信息
        clearUserInfoAPI(state, action) {
            return {
                ...state,
                userInfo: {},
            };
        },
    },
};
