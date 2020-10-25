import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import styles from './index.less';
import Interpreter from 'js-interpreter';
// import _ from 'lodash';

function IndexDB(props) {
    let db = useRef(null);
    let [idxData, setIdxData] = useState([]);
    // let [maxIdx, setMaxIdx] = useState(0);
    let maxIdx = useRef(0);

    let name = useRef(null);
    let age = useRef(null);
    let email = useRef(null);

    useEffect(() => {
        db.current = window.indexedDB.open('yangbo', 1);

        // 数据库版本升级
        db.current.onupgradeneeded = function(event) {
            let _db = event.target.result;
            let objectStore = null;
            // 创建表
            if (!_db.objectStoreNames.contains('mc')) {
                objectStore = _db.createObjectStore('mc', { keyPath: 'id', autoIncrement: true });
                objectStore.createIndex('name', 'name', { unique: false });
                objectStore.createIndex('age', 'age', { unique: false });
                objectStore.createIndex('email', 'email', { unique: true });
            }

            // objectStore.transaction.oncomplete = function(event) {
            //     let newData = {
            //         name: '刘德华',
            //         age: 59,
            //         email: 'liudehua@qq.com',
            //     };

            //     _db.transaction('mc', 'readwrite')
            //         .objectStore('mc')
            //         .add(newData);
            // };

            // console.log(_db);
        };

        // 数据库打开
        db.current.onsuccess = function(even) {
            // console.log(even);
            getMaxIdx();
        };

        // 监听数据库异常
        db.current.onerror = function(even) {};
    }, []);

    // 获取最大的索引
    function getMaxIdx() {
        let transaction = db.current.result.transaction(['mc'], 'readonly');
        let objectStore = transaction.objectStore('mc');
        let keys = objectStore.getAllKeys();

        keys.onsuccess = function(event) {
            let req = event.target.result;
            maxIdx.current = req.length === 0 ? 0 : Math.max(...req);
        };
    }

    // 新增数据
    function addData() {
        let _name = name.current.value;
        let _age = +age.current.value;
        let _email = email.current.value;

        if (_name === '' && _age === '' && _email === '') return;
        let newData = {
            id: maxIdx.current + 1,
            name: _name,
            age: _age,
            email: _email,
        };

        let transaction = db.current.result.transaction(['mc'], 'readwrite');

        transaction.objectStore('mc').add(newData);

        // 增加成功后
        transaction.oncomplete = function(event) {
            maxIdx.current = maxIdx.current + 1;
            name.current.value = '';
            age.current.value = '';
            email.current.value = '';
            console.log('complete', event);
        };

        transaction.onsuccess = function(event) {
            console.log('success', event);
        };

        // 新增失败
        transaction.onerror = function(event) {
            console.log(event);
        };
    }

    // 从indexDB 中获取数据
    function getData() {
        let transaction = db.current.result.transaction(['mc'], 'readonly');
        if (!transaction) return;

        let objectStore = transaction.objectStore('mc');
        let request = objectStore.getAll();

        request.onsuccess = function(event) {
            let cursor = event.target.result;
            console.log('onsuccess', cursor);

            setIdxData(cursor);
        };

        request.oncomplete = function(event) {
            let cursor = event.target.result;
            console.log('oncomplete', cursor);
        };
    }

    // 根据类型搜索
    // function searchData(type, val) {
    //     let transaction = db.current.result.transaction(['mc'], 'readonly');
    //     let objectStore = transaction.objectStore('mc');

    //     // 根据索引查询
    //     let index = objectStore.index('age');
    //     index.get(55).onsuccess = function(event) {
    //         console.log(event);
    //     };
    // }

    useEffect(() => {
        const code = '6*7';
        const code1 =
            'function filter1 (data){return data.a}; var a = filter1({a:{b:{c:{a:function(){return 123}},e:[1,2,3],d:1}}}); function filter2(data){return data.b}; filter2(a); ';
        let myInterpreter = new Interpreter(code);

        myInterpreter.appendCode(code1);
        myInterpreter.run();

        console.log(myInterpreter.value);
    });

    return (
        <div className={styles.indexdb_container}>
            <div>
                <div className={styles.data_inputs}>
                    <input className={styles.input_name} type="text" ref={name} />
                    <input className={styles.input_age} type="text" ref={age} />
                    <input className={styles.input_email} type="text" ref={email} />
                    <button type="button" className={styles.btn} onClick={addData}>
                        新增数据
                    </button>
                </div>
                <button type="button" className={styles.btn} onClick={getData}>
                    查询数据
                </button>
            </div>

            <ul>
                {idxData &&
                    idxData.map(item => {
                        return (
                            <li key={item.id}>
                                <span>{item.id}</span>
                                <span>{item.name}</span>
                                <span>{item.age}</span>
                                <span>{item.email}</span>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}

export default IndexDB;
