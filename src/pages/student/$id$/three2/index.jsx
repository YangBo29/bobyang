import React, { useRef, useState } from 'react';
import { connect } from 'dva';
// import styles from './index.less';
// import * as THREE from 'three';

// let camera, scene, renderer;
// let geometry, material, mesh;
// let point, ambient;
import Editor from '@monaco-editor/react';

function Demo(props) {
    // const { edit } = props;
    // const { addUpdate, editUpdate, delUpdate } = props;
    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    const [value, setV] = useState('');

    function showValue() {
        setV(editorRef.current.getValue());
    }

    // const addData = () => {
    //     addUpdate({
    //         3: {
    //             cptId: 3,
    //             cptName: '333',
    //             cptRect: {
    //                 cptWidth: 100,
    //                 cptHeight: 100,
    //                 cptTop: 100,
    //                 cptLeft: 330,
    //             },
    //             cptStyle: {
    //                 bg: 'red',
    //             },
    //         },
    //     });
    // };

    // const changeData = () => {
    //     editUpdate({
    //         2: {
    //             cptId: 2,
    //             cptName: '222',
    //             cptRect: {
    //                 cptWidth: 100,
    //                 cptHeight: 100,
    //                 cptTop: 220,
    //                 cptLeft: 220,
    //             },
    //             cptStyle: {
    //                 bg: '#000',
    //             },
    //         },
    //     });
    // };

    // const delData = () => {
    //     delUpdate({
    //         3: {
    //             cptId: 3,
    //             cptName: '333',
    //             cptRect: {
    //                 cptWidth: 100,
    //                 cptHeight: 100,
    //                 cptTop: 100,
    //                 cptLeft: 330,
    //             },
    //             cptStyle: {
    //                 bg: 'red',
    //             },
    //         },
    //     });
    // };

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {/* <button onClick={addData}> 增加数据</button>
            <button onClick={changeData}> 修改数据</button>
            <button onClick={delData}> 删除数据</button>
            {Object.values(edit).map(cpt => {
                return (
                    <div
                        key={cpt.cptId}
                        style={{
                            position: 'absolute',
                            width: `${cpt.cptRect.cptWidth}px`,
                            height: `${cpt.cptRect.cptHeight}px`,
                            top: `${cpt.cptRect.cptTop}px`,
                            left: `${cpt.cptRect.cptLeft}px`,
                            background: cpt.cptStyle.bg,
                        }}
                    >
                        {cpt.cptName}
                    </div>
                );
            })} */}
            <button onClick={showValue}>Show value</button>
            <Editor
                width="600px"
                height="400px"
                theme="vs-dark"
                defaultLanguage="javascript"
                // language="json"
                value='const hw = "hello world " // 你好世界'
                onChange={showValue}
                onMount={handleEditorDidMount}
            ></Editor>
            <div style={{ width: '400px', height: '400px' }}>{value}</div>
        </div>
    );
}

const MapStateToProps = state => {
    return {
        edit: state.edit,
    };
};

const MapDispatchToProps = dispatch => {
    return {
        addUpdate: params => {
            return dispatch({
                type: 'edit/addUpdate',
                payload: params,
            });
        },
        editUpdate: params => {
            return dispatch({
                type: 'edit/editUpdate',
                payload: params,
            });
        },
        delUpdate: params => {
            return dispatch({
                type: 'edit/delUpdate',
                payload: params,
            });
        },
    };
};

export default connect(MapStateToProps, MapDispatchToProps)(Demo);
