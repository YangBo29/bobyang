import React, { useEffect } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import ErrorBoundary from '@components/pulgIn/ErrorBoundary/index.jsx';
import Nav from '@components/pulgIn/Nav/index.jsx';
import SideList from '@components/pulgIn/SideList/index.jsx';
import Code from '@components/template/Code/index.jsx';
const BasicLayout = props => {
    useEffect(() => {
        window.addEventListener('message', function (event) {
            if ('http://10.10.10.90:8090/'.includes(event.origin)) {
                console.log('http://10.10.10.90:8899/:收到信息啦', event);
            }
        }, false);
    }, []);
    return (React.createElement(ErrorBoundary, null,
        React.createElement(Nav, null),
        React.createElement("div", { className: styles.content },
            React.createElement(SideList, null),
            React.createElement("div", { className: styles.main }, props.children)),
        React.createElement(Code, null)));
};
function MapStateToProps(state) {
    return {};
}
const MapDispatchToProps = dispatch => {
    return {
        storeUserInfo: payload => {
            return dispatch({
                type: 'global/storeUserInfo',
                payload,
            });
        },
    };
};
export default connect(MapStateToProps, MapDispatchToProps)(BasicLayout);
//# sourceMappingURL=index.js.map