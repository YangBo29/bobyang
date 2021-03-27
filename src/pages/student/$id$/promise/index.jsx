import React from 'react';
// import styles from './index.less';

function PromiseComponent(props) {
    // 案例一
    // const case1 = useRef(0);
    function promiseFn() {
        return new Promise(resolve => {
            return resolve(true);
        })
            .then(() => {
                console.log('进入一');
                setTimeout(() => {
                    console.log('----p1');
                }, 1000);
            })
            .then(() => {
                console.log('进入二');
                setTimeout(() => {
                    console.log('----p2');
                }, 500);
            });
    }

    return (
        <>
            <button type="button" onClick={promiseFn}>
                promise
            </button>
        </>
    );
}

export default PromiseComponent;
