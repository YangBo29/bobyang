import React from 'react';
import styles from './index.less';

export default function Li(props) {
    console.log(styles);
    return (
        <div className={styles.li_content}>
            <ul className={styles.list}>
                <li>page1</li>
                <li>page2</li>
                <li>page3</li>
                <li>page4</li>
                <li>page5</li>
            </ul>
        </div>
    );
}
