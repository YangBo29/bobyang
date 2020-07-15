import React from 'react';
import styles from './index.less';
import apis from '../services/apis.js';
import utils from '../utils/index.js';
import { connect } from 'dva';
import ErrorBoundary from '@components/pulgIn/ErrorBoundary/index.jsx';

interface Props {
    storeUserInfo: Function;
    location: Object;
    children: Object;
}

const BasicLayout: React.FC<Props> = props => {
    const { storeUserInfo } = props;
    return (
        <ErrorBoundary>
            <div className={styles.normal}>{props.children}</div>
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
