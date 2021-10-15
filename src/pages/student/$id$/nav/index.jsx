import React, { useEffect, useState, useCallback } from 'react';
// import styles from './index.less';

export default function NavRouter(props) {
    const [count, setCount] = useState(0);

    console.time();

    // without useCallback
    // const handleClick1 = () => {
    //     console.log(`click div 111`);
    // };

    // in useCallback
    const handleClick1 = useCallback(() => {
        console.log(`handleClick1 with useCallback ${count}`);
    }, [count]);

    const addCount = () => {
        setCount(count + 1);
    };

    // Used to count the time spent from the setCount triggering re-rendering to the'componentDidUpdate' stage
    useEffect(() => {
        console.timeEnd();
    });

    return (
        <div>
            {new Array(100).fill(1).map((t, i) => (
                <span key={i} onClick={handleClick1}>
                    {i}
                </span>
            ))}
            {/* <div onClick={handleClick1}>1111</div>
            <div onClick={handleClick1}>1111</div>
            <div onClick={handleClick1}>1111</div>
            <div onClick={handleClick1}>1111</div>
            <div onClick={handleClick1}>1111</div>
            <div onClick={handleClick1}>1111</div>
            <div onClick={handleClick1}>1111</div>
            <div onClick={handleClick1}>1111</div>
            <div onClick={handleClick1}>1111</div>
            <div onClick={handleClick1}>1111</div>
            <div onClick={handleClick1}>1111</div>
            <div onClick={handleClick1}>1111</div>
            <div onClick={handleClick1}>1111</div>
            <div onClick={handleClick1}>1111</div>
            <div onClick={handleClick1}>1111</div>
            <div onClick={handleClick1}>1111</div>
            <div onClick={handleClick1}>1111</div>
            <div onClick={handleClick1}>1111</div>
            <div onClick={handleClick1}>1111</div> */}
            <span>{count}</span>
            <button onClick={addCount}>add count</button>
        </div>
    );
}
