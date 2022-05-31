import React, { useEffect, useRef } from 'react';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

window.CESIUM_BASE_URL = '/';

Cesium.Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiN2UzMjI1Mi1iNzAwLTQ3ZGUtOGZhNi00NTliNTJjNTI0NzYiLCJpZCI6OTU2NTgsImlhdCI6MTY1Mzg5MzYyOX0.1fja7oZmr2xtodTRksAcFt3vW1souhM0sNXQJyhg9Pg';

export default function Cesium1(props) {
    useEffect(() => {
        const viewer = new Cesium.Viewer('cesiumContainer', {
            terrainProvider: Cesium.createWorldTerrain(),
        });
        console.log(viewer.scene);

        // let scenes = [
        //     // 'http://10.10.7.246:8090/iserver/services/3D-PingMianblock/rest/realspace',
        //     // 'http://10.10.3.144:8090/iserver/services/3D-sanwei_noins/rest/realspace',
        //     'http://www.supermapol.com/realspace/services/3D-suofeiya_church/rest/realspace',
        //     'http://www.supermapol.com/realspace/services/3D-NewCBD/rest/realspace',
        //     'https://www.supermapol.com/realspace/services/3D-CQmodel_wireframe_2000/rest/realspace',
        //     'https://www.supermapol.com/realspace/services/3D-cloud/rest/realspace',
        // ];
        // viewer.scene.open(scenes[0]);

        // const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());
        // viewer.camera.flyTo({
        //     destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
        //     orientation: {
        //         heading: Cesium.Math.toRadians(0.0),
        //         pitch: Cesium.Math.toRadians(-15.0),
        //     },
        // });

        // const viewer = new Cesium.Viewer('cesiumContainer', {
        // terrainProvider: Cesium.createWorldTerrain({
        //     requestWaterMask: true,
        //     requestVertexNormals: true,
        // }),
        // imageryProvider: new Cesium.UrlTemplateImageryProvider({
        //     url:
        //         'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/001',
        // }),
        // });

        // new Cesium.UrlTemplateImageryProvider({
        //     // url: `https://mt1.google.cn/vt/lyrs=s&x=1&y=1&z=5`,
        //     url: 'https://cesium.com/ion/stories/viewer/?id=8f79767b-25ac-4d60-952e-da004ad74cc3',
        // });
    }, []);

    const canvas_dom = useRef(null);

    // useEffect(() => {
    //     let viewer = new window.Cesium.Viewer('cesiumContainer', {
    //         geocoder: false,
    //         homeButton: false,
    //         sceneModePicker: false,
    //         baseLayerPicker: false,
    //         navigationHelpButton: false,
    //         animation: false,
    //         // creditContainer: 'credit',
    //         timeline: false,
    //         fullscreenButton: false,
    //         vrButton: false,
    //     });
    //     // viewer.extend(window.Cesium.viewerCesiumInspectorMixin);
    //     viewer.scene.postProcessStages.fxaa.enabled = true;
    //     viewer.scene.debugShowFramesPerSecond = true;

    //     // viewer.entities.add({
    //     //     name: 'Red box with black outline',
    //     //     position: window.Cesium.Cartesian3.fromDegrees(-0.0, 40.0, 50.0),
    //     //     box: {
    //     //         dimensions: new window.Cesium.Cartesian3(100.0, 100.0, 100.0),
    //     //         material: window.Cesium.Color.RED.withAlpha(0.5),
    //     //         outline: true,
    //     //         outlineColor: window.Cesium.Color.BLACK,
    //     //     },
    //     // });

    //     let scenes = [
    //         // 'http://10.10.7.246:8090/iserver/services/3D-PingMianblock/rest/realspace',
    //         // 'http://10.10.3.144:8090/iserver/services/3D-sanwei_noins/rest/realspace',
    //         'http://www.supermapol.com/realspace/services/3D-suofeiya_church/rest/realspace',
    //         'http://www.supermapol.com/realspace/services/3D-NewCBD/rest/realspace',
    //         'https://www.supermapol.com/realspace/services/3D-CQmodel_wireframe_2000/rest/realspace',
    //         'https://www.supermapol.com/realspace/services/3D-cloud/rest/realspace',
    //     ];
    //     viewer.scene.open(scenes[0]);
    //     // viewer.zoomTo(viewer.entities);
    // }, []);

    return <div ref={canvas_dom} id="cesiumContainer" width="100%" height="100%"></div>;
}
