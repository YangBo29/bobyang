import React, { useEffect, useRef } from 'react';
// import Cesium from '@supermap/iclient3d-webgl';
// import '@public/Cesium/Build/Cesium/Widgets/widgets.css';
// import '@public/Cesium/Build/CesiumUnminified/Cesium.js';
// import '@public/Cesium/Build/SuperMap3D.js';
// import styles from './index.less';
// import * as THREE from 'three';

// let camera, scene, renderer;
// let geometry, material, mesh;
// let point, ambient;

export default function Demo(props) {
    const canvas_dom = useRef(null);

    useEffect(() => {
        let viewer = new window.Cesium.Viewer('cesiumContainer', {
            geocoder: false,
            homeButton: false,
            sceneModePicker: false,
            baseLayerPicker: false,
            navigationHelpButton: false,
            animation: false,
            // creditContainer: 'credit',
            timeline: false,
            fullscreenButton: false,
            vrButton: false,
        });
        // viewer.extend(window.Cesium.viewerCesiumInspectorMixin);
        viewer.scene.postProcessStages.fxaa.enabled = true;
        viewer.scene.debugShowFramesPerSecond = true;

        // viewer.entities.add({
        //     name: 'Red box with black outline',
        //     position: window.Cesium.Cartesian3.fromDegrees(-0.0, 40.0, 50.0),
        //     box: {
        //         dimensions: new window.Cesium.Cartesian3(100.0, 100.0, 100.0),
        //         material: window.Cesium.Color.RED.withAlpha(0.5),
        //         outline: true,
        //         outlineColor: window.Cesium.Color.BLACK,
        //     },
        // });

        let scenes = [
            // 'http://10.10.7.246:8090/iserver/services/3D-PingMianblock/rest/realspace',
            // 'http://10.10.3.144:8090/iserver/services/3D-sanwei_noins/rest/realspace',
            'http://www.supermapol.com/realspace/services/3D-suofeiya_church/rest/realspace',
            'http://www.supermapol.com/realspace/services/3D-NewCBD/rest/realspace',
            'https://www.supermapol.com/realspace/services/3D-CQmodel_wireframe_2000/rest/realspace',
            'https://www.supermapol.com/realspace/services/3D-cloud/rest/realspace',
        ];
        viewer.scene.open(scenes[0]);
        // viewer.zoomTo(viewer.entities);
    }, []);

    return (
        <div ref={canvas_dom} id="cesiumContainer" style={{ width: '100%', height: '100%' }}></div>
    );
}
