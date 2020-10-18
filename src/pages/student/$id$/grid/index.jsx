import React, { useRef } from 'react';
import styles from './index.less';
// import lz from 'lz-string';
// import pako from 'pako';
// import $ from 'jquery';
export default function Grid(props) {
    const list = useRef([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    return (
        <>
            <div className={styles.gird_content}>
                <div className={styles.gird_content_in}>
                    {list.current.map(item => (
                        <div className={styles.gird_item} key={item}>
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
