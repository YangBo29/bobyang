import React, { useEffect } from 'react';
import { useRef } from 'react';
import styles from './index.less';

function IndexDB(props) {
    let db = useRef(null);

    useEffect(() => {
        db.current = window.indexedDB.open('yangbo', 1);

        // 数据库版本升级
        db.current.onupgradeneeded = function(event) {
            let _db = event.target.result;
            let objectStore = null;
            // 创建表
            if (!_db.objectStoreNames.contains('mc')) {
                objectStore = _db.createObjectStore('mc', { autoIncrement: true });
                objectStore.createIndex('name', 'name', { unique: false });
                objectStore.createIndex('age', 'age', { unique: false });
                objectStore.createIndex('email', 'email', { unique: true });
            }

            objectStore.transaction.oncomplete = function(event) {
                let newData = {
                    id: 1,
                    name: '刘德华',
                    age: 59,
                    email: 'liudehua@qq.com',
                };

                _db.transaction('mc', 'readwrite')
                    .objectStore('mc')
                    .add(newData);
            };

            console.log(_db);
        };

        // 数据库打开
        db.current.onsuccess = function(even) {
            console.log(even);
        };

        // 监听数据库异常
        db.current.onerror = function(even) {};
    }, []);

    // 新增数据
    function addData() {
        let newData = {
            id: 2,
            name: '郭富城',
            age: 55,
            email: 'guofucheng@qq.com',
        };

        let transaction = db.current.result.transaction(['mc'], 'readwrite');

        console.log(transaction);
        transaction.objectStore('mc').add(newData);

        transaction.oncomplete = function(event) {};
    }

    return (
        <div className={styles.indexdb_container}>
            <button type="button" className={styles.btn} onClick={addData}>
                追加数据
            </button>
        </div>
    );
}

export default IndexDB;
