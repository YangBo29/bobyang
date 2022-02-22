import React, { useRef } from 'react';
// import styles from './index.less';

export default function ButtonRouter(props) {
    const _result = useRef(null);
    function getColor() {
        if (!window.EyeDropper) {
            _result.current.textContent = 'Your browser does not support the EyeDropper API';
            return;
        }

        const eyeDropper = new window.EyeDropper();
        const abortController = new AbortController();

        eyeDropper
            .open({ signal: abortController.signal })
            .then(result => {
                _result.current.textContent = result.sRGBHex;
                _result.current.style.backgroundColor = result.sRGBHex;
            })
            .catch(e => {
                _result.current.textContent = e;
            });

        setTimeout(() => {
            // abortController.abort();
        }, 2000);
    }
    return (
        <>
            <button onClick={getColor}>颜色取色器</button>
            <span ref={_result}></span>
            <div style={{ width: '100px', height: '100px', background: 'red' }}></div>
        </>
    );
}
