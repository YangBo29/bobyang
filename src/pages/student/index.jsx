import React from 'react';
import styles from './index.less';
import Nav from '@components/pulgIn/Nav';
import SiderList from '@components/pulgIn/SiderList';

export default function Index(props) {
    return (
        <>
            <Nav />

            <div className={styles.content}>
                <SiderList />
            </div>
        </>
    );
}