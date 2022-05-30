import React, { useEffect } from 'react';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
export default function Cesium1(props) {
    useEffect(() => {
        Cesium.Ion.defaultAccessToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlOTA4ZDQxOC0yZDRhLTQ3ZmItYjc0Yy04ZDVhZDVmMjMzZTkiLCJpZCI6OTU2NTgsImlhdCI6MTY1Mzg5NTAzN30.mTyJ3He9UGK8z22TY6axH7NSJzfyt3ULia4xyy1xygo';
        const viewer = new Cesium.Viewer('cesiumContainer', {
            terrainProvider: Cesium.createWorldTerrain(),
        });
        console.log(viewer);
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

    return <div id="cesiumContainer" width="100%" height="100%"></div>;
}
