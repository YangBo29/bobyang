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

    // useEffect(() => {
    //     setTimeout(() => {
    //         document
    //             .getElementById('child')
    //             .contentWindow.postMessage({ aaa: 111, kkk: 222 }, 'http://127.0.0.1:5500');
    //     }, 2000);

    //     window.addEventListener(
    //         'message',
    //         function(event) {
    //             if ('http://127.0.0.1:5500/postMessage.html'.includes(event.origin)) {
    //                 console.log('收到信息啦', event);
    //             }
    //         },
    //         false,
    //     );
    // }, []);

    return (
        <>
            <button type="button" onClick={promiseFn}>
                promise
            </button>

            <iframe
                id="child"
                src="http://127.0.0.1:5500/postMessage.html"
                style={{ width: '500px', height: '300px' }}
            ></iframe>
        </>
    );
}

export default PromiseComponent;
