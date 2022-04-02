// import setCookie from "../utils/store";

export default {
    // 空间名
    namespace: 'edit',

    // 状态机
    state: {
        1: {
            cptId: 1,
            cptName: '111',
            cptRect: {
                cptWidth: 100,
                cptHeight: 100,
                cptTop: 100,
                cptLeft: 100,
            },
            cptStyle: {
                bg: 'blue',
            },
        },
        2: {
            cptId: 2,
            cptName: '222',
            cptRect: {
                cptWidth: 100,
                cptHeight: 100,
                cptTop: 220,
                cptLeft: 220,
            },
            cptStyle: {
                bg: '#ddd',
            },
        },
    },

    // 事件池
    subscriptions: {},

    // dispatch
    effects: {
        // 全局更新
        *addUpdate({ payload }, { call, put, select }) {
            yield put({
                type: 'updateState',
                payload,
            });
        },
        *editUpdate({ payload }, { call, put, select }) {
            yield put({
                type: 'updateState',
                payload,
            });
        },
        *delUpdate({ payload }, { call, put, select }) {
            const edit = yield select(state => state.edit);

            for (let key in payload) {
                if (edit[key]) {
                    delete edit[key];
                }
            }

            yield put({
                type: 'delState',
                payload,
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
        delState(state, action) {
            for (let key in action.payload) {
                if (state[key]) {
                    delete state[key];
                }
            }

            return {
                ...state,
            };
        },
    },
};
