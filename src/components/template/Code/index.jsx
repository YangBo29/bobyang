import React, { useMemo } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import classNames from 'classnames';

function Code(props) {
    const { code } = props;
    const classname = useMemo(() => {
        return classNames({
            [styles.code_panel]: true,
            [styles.code_open]: code,
            [styles.code_close]: !code,
        });
    }, [code]);

    return <div className={classname}></div>;
}

const mapStateToProps = state => {
    return {
        code: state.global.code,
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Code);
