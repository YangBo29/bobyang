import React, { useRef } from 'react';
// import styles from './index.less';
// import * as THREE from 'three';

// let camera, scene, renderer;
// let geometry, material, mesh;
// let point, ambient;

export default function Demo(props) {
    const canvas_dom = useRef(null);

    return <div ref={canvas_dom} style={{ width: '100%', height: '100%' }}></div>;
}
