import React, { useEffect, useRef } from 'react';
// import styles from './index.less';
import * as THREE from 'three';

let camera, scene, renderer;
let geometry, material, mesh;
let point, ambient;

export default function Three(props) {
    const canvas_dom = useRef(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function init() {
        scene = new THREE.Scene();

        geometry = new THREE.BoxGeometry(100, 100, 100);
        material = new THREE.MeshLambertMaterial({
            color: 0xffff,
        });
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        point = new THREE.PointLight(0xffffff);
        point.position.set(300, 200, 300);
        scene.add(point);

        ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);

        let w = window.innerWidth;
        let h = window.innerHeight;
        let k = w / h;
        let s = 200;

        camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        camera.position.set(200, 200, 200);
        camera.lookAt(scene.position);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(w, h);
        renderer.setClearColor(0xb9d3ff, 1);

        canvas_dom.current.appendChild(renderer.domElement);

        renderer.render(scene, camera);
    }

    useEffect(() => {
        if (canvas_dom.current) {
            init();
        }
    }, [init]);

    return <div ref={canvas_dom} style={{ width: '100%', height: '100%' }}></div>;
}
