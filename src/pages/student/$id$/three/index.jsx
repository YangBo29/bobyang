import React, { useEffect, useRef } from 'react';
// import styles from './index.less';
import * as THREE from 'three';

let camera, scene, renderer;
let geometry, material, mesh;

export default function Three(props) {
    const canvas_dom = useRef(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function init() {
        camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            0.01,
            1000,
        );
        camera.position.z = 5;

        scene = new THREE.Scene();

        geometry = new THREE.BoxGeometry(1, 1, 1);
        material = new THREE.MeshNormalMaterial();

        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setAnimationLoop(animation);

        canvas_dom.current.appendChild(renderer.domElement);
    }

    function animation(time) {
        mesh.rotation.x = time / 2000;
        mesh.rotation.y = time / 1000;

        renderer.render(scene, camera);
    }

    useEffect(() => {
        if (canvas_dom.current) {
            init();
        }
    }, [init]);

    return <div ref={canvas_dom} style={{ width: '100%', height: '100%' }}></div>;
}
