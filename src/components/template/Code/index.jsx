import React, { useEffect, useMemo, useRef } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import classNames from 'classnames';
import defaultCode from './defaultCode';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';

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
    const monacoEditor = useRef(null);

    // 初始化代码编辑器
    useEffect(() => {
        if (code && code_content.current) {
            console.log(monaco);
            monacoEditor.current = monaco.editor.create(code_content.current, {
                value: defaultCode,
                language: 'javascript',
                automaticLayout: true,
                theme: 'vs-white',
                folding: true,
                scrollbar: {
                    verticalScrollbarSize: 8,
                    horizontalScrollbarSize: 8,
                },
                minimap: {
                    enabled: true,
                },
                formatOnPaste: true,
                renderValidationDecorations: 'on',
            });
            // 监听内容变更
            monacoEditor.current.onDidChangeModelContent(e => {
                console.log(monacoEditor.current.getValue());
            });
            // 监听失去光标处理
            monacoEditor.current.onDidBlurEditorWidget(e => {
                console.log(e);
            });
        }
        return () => {
            if (monacoEditor.current) {
                monacoEditor.current.dispose();
            }
        };
    });

    return (
        <div className={classname}>
            <div
                style={{
                    width: '100%',
                    height: '100%',
                }}
                ref={code_content}
            ></div>
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
