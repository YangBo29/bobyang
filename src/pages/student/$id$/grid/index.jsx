import React, { useRef } from 'react';
import styles from './index.less';
import lz from 'lz-string';
import testJson from '../../../../testJson.json';
window.lzs = lz;
export default function Grid(props) {
    const list = useRef([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    function getBase64Time() {
        let st = new Date().getTime();
        let _sj = JSON.stringify(testJson);
        // let zipJson = lz.compressToBase64(_sj);
        // let unzipJson = JSON.parse(lz.decompressFromBase64(zipJson));
        console.log(lz.compressToBase64(_sj));
        let et = new Date().getTime();
        // console.log(testJson);
        // console.log(zipJson);
        // console.log(unzipJson);
        console.log(et - st);
    }

    return (
        <>
            <div className={styles.gird_content}>
                <div className={styles.gird_content_in}>
                    {list.current.map(item => (
                        <div className={styles.gird_item} key={item} onClick={getBase64Time}>
                            <div className={styles.grid_thumb}>
                                <div className={styles.grid_img}></div>
                            </div>
                            <p className={styles.grid_text}>{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
