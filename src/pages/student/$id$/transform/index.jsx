import React from 'react';
import styles from './index.less';

export default function Li(props) {
    return (
        <div className={styles.content}>
            <div className={styles.main}>
                <div className={styles.main_item}>
                    <h2>transform: translate(xxx%, xxx%) rotate(xxxdeg);</h2>
                    <ul className={styles.list}>
                        <li>page1</li>
                        <li>page2</li>
                        <li>page3</li>
                        <li>page4</li>
                        <li>page5</li>
                    </ul>
                </div>

                <div className={styles.main_item}>
                    <h2>animation: xxx 1.5s 1s steps(3,end) infinite;</h2>
                    <div className={styles.trans_steps_start}>steps(3, start)</div>
                    <div className={styles.trans_steps_end}>steps(3, end)</div>
                </div>

                <div className={styles.main_item}>
                    <h2>transform: perspective()</h2>
                    <div className={styles.perspective}></div>
                </div>
            </div>
        </div>
    );
}
