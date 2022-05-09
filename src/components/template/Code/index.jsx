import React, { useMemo, useRef } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import classNames from 'classnames';
import defaultCode from './defaultCode';
import Editor, { loader } from '@monaco-editor/react';

loader.config({ paths: { vs: '/vs' } });

function Code(props) {
    const { code } = props;
    const classname = useMemo(() => {
        return classNames({
            [styles.code_panel]: true,
            [styles.code_open]: code,
            [styles.code_close]: !code,
        });
    }, [code]);
    const code_content = useRef(null);

    const handleChange = () => {};

    return (
        <div className={classname}>
            <div
                style={{
                    width: '100%',
                    height: '100%',
                }}
                ref={code_content}
            >
                <Editor
                    width="100%"
                    height="100%"
                    theme="vs-light"
                    language={'javascript'}
                    value={defaultCode}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        code: state.global.code,
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Code);
