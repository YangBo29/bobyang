import React, { useEffect } from 'react';
import styles from './index.less';
import apis from '../services/apis.js';
import utils from '../utils/index.js';
import { connect } from 'dva';
import { router } from 'umi';
import ErrorBoundary from '@components/pulgIn/ErrorBoundary/index.jsx';
import Nav from '@components/pulgIn/Nav/index.jsx';
import SideList from '@components/pulgIn/SideList/index.jsx';
import Code from '@components/template/Code/index.jsx';

interface Props {
    storeUserInfo: Function;
    location: Object;
    children: Object;
}

const BasicLayout: React.FC<Props> = props => {
    const { storeUserInfo } = props;

    return (
        <ErrorBoundary>
            <Nav />

            <div className={styles.content}>
                <SideList />
                <div className={styles.main}>{props.children}</div>
            </div>

            <Code />
        </ErrorBoundary>
    );
};

function MapStateToProps(state: Object) {
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
