/*
 * Author: yangbo
 * Date: 2022-05-31 14:47
 * LastEditors: yangbo
 * LastEditTime: 2022-06-02 11:15
 * FilePath: /bobyang/src/pages/student/$id$/three2/index.jsx
 * Description:
 */
import React, { useEffect } from 'react';
import { connect } from 'dva';

window.Cesium.Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiN2UzMjI1Mi1iNzAwLTQ3ZGUtOGZhNi00NTliNTJjNTI0NzYiLCJpZCI6OTU2NTgsImlhdCI6MTY1Mzg5MzYyOX0.1fja7oZmr2xtodTRksAcFt3vW1souhM0sNXQJyhg9Pg';

function Demo(props) {
    useEffect(() => {
        // A simple demo of 3D Tiles feature picking with hover and select behavior
        // Building data courtesy of NYC OpenData portal: http://www1.nyc.gov/site/doitt/initiatives/3d-building.page
        const viewer = new window.Cesium.Viewer('cesiumContainer', {
            terrainProvider: window.Cesium.createWorldTerrain(),
        });

        viewer.scene.globe.depthTestAgainstTerrain = true;

        // Set the initial camera view to look at Manhattan
        const initialPosition = window.Cesium.Cartesian3.fromDegrees(
            -74.01881302800248,
            40.69114333714821,
            753,
        );
        const initialOrientation = new window.Cesium.HeadingPitchRoll.fromDegrees(
            21.27879878293835,
            -21.34390550872461,
            0.0716951918898415,
        );
        viewer.scene.camera.setView({
            destination: initialPosition,
            orientation: initialOrientation,
            endTransform: window.Cesium.Matrix4.IDENTITY,
        });

        // Load the NYC buildings tileset
        const tileset = new window.Cesium.Cesium3DTileset({
            url: window.Cesium.IonResource.fromAssetId(75343),
        });
        viewer.scene.primitives.add(tileset);

        // HTML overlay for showing feature name on mouseover
        const nameOverlay = document.createElement('div');
        viewer.container.appendChild(nameOverlay);
        nameOverlay.className = 'backdrop';
        nameOverlay.style.display = 'none';
        nameOverlay.style.position = 'absolute';
        nameOverlay.style.bottom = '0';
        nameOverlay.style.left = '0';
        nameOverlay.style['pointer-events'] = 'none';
        nameOverlay.style.padding = '4px';
        nameOverlay.style.backgroundColor = 'black';

        // Information about the currently selected feature
        const selected = {
            feature: undefined,
            originalColor: new window.Cesium.Color(),
        };

        // An entity object which will hold info about the currently selected feature for infobox display
        const selectedEntity = new window.Cesium.Entity();

        // Get default left click handler for when a feature is not picked on left click
        const clickHandler = viewer.screenSpaceEventHandler.getInputAction(
            window.Cesium.ScreenSpaceEventType.LEFT_CLICK,
        );

        // If silhouettes are supported, silhouette features in blue on mouse over and silhouette green on mouse click.
        // If silhouettes are not supported, change the feature color to yellow on mouse over and green on mouse click.
        if (window.Cesium.PostProcessStageLibrary.isSilhouetteSupported(viewer.scene)) {
            // Silhouettes are supported
            const silhouetteBlue = window.Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
            silhouetteBlue.uniforms.color = window.Cesium.Color.BLUE;
            silhouetteBlue.uniforms.length = 0.01;
            silhouetteBlue.selected = [];

            const silhouetteGreen = window.Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
            silhouetteGreen.uniforms.color = window.Cesium.Color.LIME;
            silhouetteGreen.uniforms.length = 0.01;
            silhouetteGreen.selected = [];

            viewer.scene.postProcessStages.add(
                window.Cesium.PostProcessStageLibrary.createSilhouetteStage([
                    silhouetteBlue,
                    silhouetteGreen,
                ]),
            );

            // Silhouette a feature blue on hover.
            viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(movement) {
                // If a feature was previously highlighted, undo the highlight
                silhouetteBlue.selected = [];

                // Pick a new feature
                const pickedFeature = viewer.scene.pick(movement.endPosition);
                if (!window.Cesium.defined(pickedFeature)) {
                    nameOverlay.style.display = 'none';
                    return;
                }

                // A feature was picked, so show it's overlay content
                nameOverlay.style.display = 'block';
                nameOverlay.style.bottom = `${viewer.canvas.clientHeight -
                    movement.endPosition.y}px`;
                nameOverlay.style.left = `${movement.endPosition.x}px`;
                const name = pickedFeature.getProperty('BIN');
                nameOverlay.textContent = name;

                // Highlight the feature if it's not already selected.
                if (pickedFeature !== selected.feature) {
                    silhouetteBlue.selected = [pickedFeature];
                }
            }, window.Cesium.ScreenSpaceEventType.MOUSE_MOVE);

            // Silhouette a feature on selection and show metadata in the InfoBox.
            viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {
                // If a feature was previously selected, undo the highlight
                silhouetteGreen.selected = [];

                // Pick a new feature
                const pickedFeature = viewer.scene.pick(movement.position);
                if (!window.Cesium.defined(pickedFeature)) {
                    clickHandler(movement);
                    return;
                }

                // Select the feature if it's not already selected
                if (silhouetteGreen.selected[0] === pickedFeature) {
                    return;
                }

                // Save the selected feature's original color
                const highlightedFeature = silhouetteBlue.selected[0];
                if (pickedFeature === highlightedFeature) {
                    silhouetteBlue.selected = [];
                }

                // Highlight newly selected feature
                silhouetteGreen.selected = [pickedFeature];

                // Set feature infobox description
                const featureName = pickedFeature.getProperty('name');
                selectedEntity.name = featureName;
                selectedEntity.description = 'Loading <div class="cesium-infoBox-loading"></div>';
                viewer.selectedEntity = selectedEntity;
                selectedEntity.description =
                    `${'<table class="cesium-infoBox-defaultTable"><tbody>' +
                        '<tr><th>BIN</th><td>'}${pickedFeature.getProperty('BIN')}</td></tr>` +
                    `<tr><th>DOITT ID</th><td>${pickedFeature.getProperty('DOITT_ID')}</td></tr>` +
                    `<tr><th>SOURCE ID</th><td>${pickedFeature.getProperty(
                        'SOURCE_ID',
                    )}</td></tr>` +
                    `</tbody></table>`;
            }, window.Cesium.ScreenSpaceEventType.LEFT_CLICK);
        } else {
            // Silhouettes are not supported. Instead, change the feature color.

            // Information about the currently highlighted feature
            const highlighted = {
                feature: undefined,
                originalColor: new window.Cesium.Color(),
            };

            // Color a feature yellow on hover.
            viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(movement) {
                // If a feature was previously highlighted, undo the highlight
                if (window.Cesium.defined(highlighted.feature)) {
                    highlighted.feature.color = highlighted.originalColor;
                    highlighted.feature = undefined;
                }
                // Pick a new feature
                const pickedFeature = viewer.scene.pick(movement.endPosition);
                if (!window.Cesium.defined(pickedFeature)) {
                    nameOverlay.style.display = 'none';
                    return;
                }
                // A feature was picked, so show it's overlay content
                nameOverlay.style.display = 'block';
                nameOverlay.style.bottom = `${viewer.canvas.clientHeight -
                    movement.endPosition.y}px`;
                nameOverlay.style.left = `${movement.endPosition.x}px`;
                let name = pickedFeature.getProperty('name');
                if (!window.Cesium.defined(name)) {
                    name = pickedFeature.getProperty('id');
                }
                nameOverlay.textContent = name;
                // Highlight the feature if it's not already selected.
                if (pickedFeature !== selected.feature) {
                    highlighted.feature = pickedFeature;
                    window.Cesium.Color.clone(pickedFeature.color, highlighted.originalColor);
                    pickedFeature.color = window.Cesium.Color.YELLOW;
                }
            }, window.Cesium.ScreenSpaceEventType.MOUSE_MOVE);

            // Color a feature on selection and show metadata in the InfoBox.
            viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {
                // If a feature was previously selected, undo the highlight
                if (window.Cesium.defined(selected.feature)) {
                    selected.feature.color = selected.originalColor;
                    selected.feature = undefined;
                }
                // Pick a new feature
                const pickedFeature = viewer.scene.pick(movement.position);
                if (!window.Cesium.defined(pickedFeature)) {
                    clickHandler(movement);
                    return;
                }
                // Select the feature if it's not already selected
                if (selected.feature === pickedFeature) {
                    return;
                }
                selected.feature = pickedFeature;
                // Save the selected feature's original color
                if (pickedFeature === highlighted.feature) {
                    window.Cesium.Color.clone(highlighted.originalColor, selected.originalColor);
                    highlighted.feature = undefined;
                } else {
                    window.Cesium.Color.clone(pickedFeature.color, selected.originalColor);
                }
                // Highlight newly selected feature
                pickedFeature.color = window.Cesium.Color.LIME;
                // Set feature infobox description
                const featureName = pickedFeature.getProperty('name');
                selectedEntity.name = featureName;
                selectedEntity.description = 'Loading <div class="cesium-infoBox-loading"></div>';
                viewer.selectedEntity = selectedEntity;
                selectedEntity.description =
                    `${'<table class="cesium-infoBox-defaultTable"><tbody>' +
                        '<tr><th>BIN</th><td>'}${pickedFeature.getProperty('BIN')}</td></tr>` +
                    `<tr><th>DOITT ID</th><td>${pickedFeature.getProperty('DOITT_ID')}</td></tr>` +
                    `<tr><th>SOURCE ID</th><td>${pickedFeature.getProperty(
                        'SOURCE_ID',
                    )}</td></tr>` +
                    `<tr><th>Longitude</th><td>${pickedFeature.getProperty(
                        'longitude',
                    )}</td></tr>` +
                    `<tr><th>Latitude</th><td>${pickedFeature.getProperty('latitude')}</td></tr>` +
                    `<tr><th>Height</th><td>${pickedFeature.getProperty('height')}</td></tr>` +
                    `<tr><th>Terrain Height (Ellipsoid)</th><td>${pickedFeature.getProperty(
                        'TerrainHeight',
                    )}</td></tr>` +
                    `</tbody></table>`;
            }, window.Cesium.ScreenSpaceEventType.LEFT_CLICK);
        }

        // let viewer = new window.window.Cesium.Viewer('cesiumContainer');
        //     // viewer.extend(window.window.Cesium.viewerCesiumInspectorMixin);
        //     viewer.scene.postProcessStages.fxaa.enabled = true;
        //     viewer.scene.debugShowFramesPerSecond = true;

        //     // viewer.entities.add({
        //     //     name: 'Red box with black outline',
        //     //     position: window.window.Cesium.Cartesian3.fromDegrees(-0.0, 40.0, 50.0),
        //     //     box: {
        //     //         dimensions: new window.window.Cesium.Cartesian3(100.0, 100.0, 100.0),
        //     //         material: window.window.Cesium.Color.RED.withAlpha(0.5),
        //     //         outline: true,
        //     //         outlineColor: window.window.Cesium.Color.BLACK,
        //     //     },
        //     // });

        // let scenes = [
        //     // 'http://10.10.7.246:8090/iserver/services/3D-PingMianblock/rest/realspace',
        //     // 'http://10.10.3.144:8090/iserver/services/3D-sanwei_noins/rest/realspace',
        //     'http://www.supermapol.com/realspace/services/3D-suofeiya_church/rest/realspace',
        //     'http://www.supermapol.com/realspace/services/3D-NewCBD/rest/realspace',
        //     'https://www.supermapol.com/realspace/services/3D-CQmodel_wireframe_2000/rest/realspace',
        //     'https://www.supermapol.com/realspace/services/3D-cloud/rest/realspace',
        // ];
        // viewer.scene.open(scenes[0]);
        // viewer.zoomTo(viewer.entities);
    }, []);
    return <div id="cesiumContainer"></div>;
}

const MapStateToProps = state => {
    return {
        edit: state.edit,
    };
};

const MapDispatchToProps = dispatch => {
    return {
        addUpdate: params => {
            return dispatch({
                type: 'edit/addUpdate',
                payload: params,
            });
        },
        editUpdate: params => {
            return dispatch({
                type: 'edit/editUpdate',
                payload: params,
            });
        },
        delUpdate: params => {
            return dispatch({
                type: 'edit/delUpdate',
                payload: params,
            });
        },
    };
};

export default connect(MapStateToProps, MapDispatchToProps)(Demo);
