/*
 * Author: yangbo
 * Date: 2022-05-31 14:47
 * LastEditors: yangbo
 * LastEditTime: 2022-06-02 13:47
 * FilePath: /bobyang/src/pages/student/$id$/cesium1/index.jsx
 * Description:
 */
import React, { useEffect } from 'react';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

Cesium.Ion.defaultAccessToken =
    // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiN2UzMjI1Mi1iNzAwLTQ3ZGUtOGZhNi00NTliNTJjNTI0NzYiLCJpZCI6OTU2NTgsImlhdCI6MTY1Mzg5MzYyOX0.1fja7oZmr2xtodTRksAcFt3vW1souhM0sNXQJyhg9Pg';
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiN2UzMjI1Mi1iNzAwLTQ3ZGUtOGZhNi00NTliNTJjNTI0NzYiLCJpZCI6OTU2NTgsImlhdCI6MTY1Mzg5MzYyOX0.1fja7oZmr2xtodTRksAcFt3vW1souhM0sNXQJyhg9Pg';

export default function Cesium1(props) {
    useEffect(() => {
        const viewer = new Cesium.Viewer('cesiumContainer', {
            terrainProvider: Cesium.createWorldTerrain(),
        });

        const tileset = new Cesium.Cesium3DTileset({
            url: Cesium.IonResource.fromAssetId(43978),
        });
        viewer.scene.primitives.add(tileset);
        // viewer.zoomTo(tileset);

        (async () => {
            await tileset.readyPromise;
            await viewer.zoomTo(tileset);

            let extras = tileset.asset.extras;
            if (
                Cesium.defined(extras) &&
                Cesium.defined(extras.ion) &&
                Cesium.defined(extras.ion.defaultStyle)
            ) {
                tileset.style = new Cesium.Cesium3DTileStyle(extras.ion.defaultStyle);
            }
        })(tileset, viewer, Cesium);

        // const classificationTileset = new Cesium.Cesium3DTileset({
        //     url: '../SampleData/Cesium3DTiles/Classification/PointCloud/tileset.json',
        //     classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
        // });
        // viewer.scene.primitives.add(classificationTileset);

        // classificationTileset.style = new Cesium.Cesium3DTileStyle({
        //     color: {
        //         conditions: [
        //             ["${id} === 'roof1'", "color('#004FFF', 0.5)"],
        //             ["${id} === 'towerBottom1'", "color('#33BB66', 0.5)"],
        //             ["${id} === 'towerTop1'", "color('#0099AA', 0.5)"],
        //             ["${id} === 'roof2'", "color('#004FFF', 0.5)"],
        //             ["${id} === 'tower3'", "color('#FF8833', 0.5)"],
        //             ["${id} === 'tower4'", "color('#FFAA22', 0.5)"],
        //             ['true', "color('#FFFF00', 0.5)"],
        //         ],
        //     },
        // });

        // viewer.scene.camera.setView({
        //     destination: new Cesium.Cartesian3(1332761, -4662399, 4137888),
        //     orientation: {
        //         heading: 0.6,
        //         pitch: -0.66,
        //     },
        // });

        // const city = viewer.scene.primitives.add(
        //     new Cesium.Cesium3DTileset({
        //         url: Cesium.IonResource.fromAssetId(3839),
        //     }),
        // );

        // const highlighted = {
        //     feature: undefined,
        //     originalColor: new Cesium.Color(),
        // };

        // viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(movement) {
        //     if (Cesium.defined(highlighted.feature)) {
        //         highlighted.feature.color = highlighted.originalColor;
        //         highlighted.feature = undefined;
        //     }

        //     const pickedFeature = viewer.scene.pick(movement.endPosition);
        //     if (!Cesium.defined(pickedFeature)) {
        //         return;
        //     }

        //     highlighted.feature = pickedFeature;
        //     Cesium.Color.clone(pickedFeature.color, highlighted.originalColor);
        //     pickedFeature.color = Cesium.Color.YELLOW.withAlpha(0.5);
        // }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }, []);

    return <div id="cesiumContainer" width="100%" height="100%"></div>;
}
