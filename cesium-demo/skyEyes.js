

(function(){
     viewer = new Cesium.Viewer('cesiumContainer',{
        imageryProvider : new Cesium.ArcGisMapServerImageryProvider({
            // url : 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
            // url : 'http://10.10.2.81:6080/arcgis/rest/services/world/MapServer'
            // url: 'http://10.10.2.81:6080/arcgis/rest/services/province2/MapServer',
            url: 'http://10.10.2.81:6080/arcgis/rest/services/worldcity/MapServer',
            // url: 'http://10.10.2.81:6080/arcgis/rest/services/China_Community_BaseMap/MapServer'
            //
           // url: 'http://10.10.2.81:6080/arcgis/rest/services/China_Community_BaseMap/MapServer',
            name: 'arcgis'
        }),
        baseLayerPicker : false,
        // vrButton: true,
        // geocoder: false,
        selectionIndicator: false,
        // navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
        // scene3DOnly: true,
        clockViewModel: new Cesium.ClockViewModel(),
        // selectedImageryProviderViewModel:
        // imageryProviderViewModels:
        // selectedTerrainProviderViewModel
        // terrainProviderViewModels
        terrainProvider: new Cesium.CesiumTerrainProvider({
            url : 'https://assets.agi.com/stk-terrain/world',
            requestWaterMask : true, // required for water effects
            requestVertexNormals : true // required for terrain lighting
        }),
        // skyBox
        // skyAtmosphere: new Cesium.SkyAtmosphere(),
        // fullscreenElement: 'fullScreen',
        // useDefaultRenderLoop: false,
        // targetFrameRate
        // showRenderLoopErrors
        // automaticallyTrackDataSourceClocks
        // contextOptions
        // sceneMode: Cesium.SceneMode.SCENE2D,
        // mapProjection: new Cesium.WebMercatorProjection(),
        // globe: false,
        // orderIndependentTranslucency
        // creditContainer: creditCon,
        // dataSources:
        terrainExaggeration: 2.0,
        shadows: true
        // terrainShadows:
        // mapMode2D:
        // projectionPicker: true,
    });
    //View
     imageryLayers = viewer.imageryLayers;

    tileCoord = new Cesium.TileCoordinatesImageryProvider({
     });
     var layer = imageryLayers.addImageryProvider(tileCoord);
     layer.alpha = Cesium.defaultValue(1.0, 0.5);
     layer.show = Cesium.defaultValue(true, true);
     layer.name = 'grid';
     Cesium.knockout.track(layer, ['alpha', 'show', 'name']);
     console.log(tileCoord.credit);

    //Data
    var arr = [[4.01,5.19, 0],[54.23,24.27, 0],  [7.11,9.12, 0],  [99.56,16.51, 0],  [176.39,51.52, 0],  [130.05, 25.04, 0],  [138.36, 34.56, 0],  [78,27.09, 0],  [102.18, 21.51, 0],  [81.31, 41.04, 0],  [106.4, 35.07, 0],  [128.1, 4.5, 0],  [4.52, 52.21, 0],  [13.2, 52.31, 0],  [85.5, 20.15, 0],  [1.55, 52.3, 0],  [57.08, 51.26, 0],  [47.57, 15.45, 0],  [15.14, 4.14, 0],  [4.21, 50.51, 0],  [19.15, 47.26, 0],  [58.3, 34.2, 0], [114.05, 51.05, 0], [-75.59777,40.03883, 0.0]];

    var arr2 = [[91.48, 22.2],[114.3, 48.04],  [172.37, 43.32],  [13.43, 9.3],  [36.19, 33.3],  [39.18, 6.51],  [90.24, 23.51],  [35.4, 6.1],  [68.51, 38.38],  [109.2, 27.05],  [79.54, 2.13],  [63.35, 44.38],[4.01,5.19, 0],[54.23,24.27, 0],  [7.11,9.12, 0],  [99.56,16.51, 0],  [176.39,51.52, 0],  [130.05, 25.04, 0],  [138.36, 34.56, 0],  [78,27.09, 0],  [102.18, 21.51, 0],  [81.31, 41.04, 0],  [106.4, 35.07, 0],  [128.1, 4.5, 0],  [4.52, 52.21, 0],  [13.2, 52.31, 0],  [85.5, 20.15, 0],  [1.55, 52.3, 0],  [57.08, 51.26, 0],  [47.57, 15.45, 0],  [15.14, 4.14, 0],  [4.21, 50.51, 0],  [19.15, 47.26, 0],  [58.3, 34.2, 0], [114.05, 51.05, 0], [-75.59777,40.03883, 0.0]];

    function addWorldPoints(arr){
        var position = Cesium.Cartesian3.fromDegrees(arr[0], arr[1], arr[2]);
        var heading = Cesium.Math.toRadians(135);
        var hpr = new Cesium.HeadingPitchRoll(heading, 0.0, 0.0);
        var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
        var i = Math.floor(Math.random() * 4 + 1);
        viewer.entities.add({
            name: '我是图' + i,
            position : position,
            orientation : orientation,
            point : {
                pixelSize : 10,
                color : Cesium.Color.GREEN,
                distanceDisplayCondition : new Cesium.DistanceDisplayCondition(2500.5)
            },
            description: '<div style="height: 150px;"><img width="50%" style="float:left; margin: 0 1em 1em 0; height: 100px;"  src="../img/skyEyes/' + i + '.jpg" /></div>'
        });
    }
    function addRectangle(arr){
        viewer.entities.add({
            name: '',
            position : Cesium.Cartesian3.fromDegrees(arr[0], arr[1]),
            rectangle : {
                coordinates : Cesium.Rectangle.fromDegrees(-80.5, 39.7, -75.1, 42.0),
                height : 0.0,
                material : Cesium.Color.RED.withAlpha(0.5),
                outline : true,
                outlineColor : Cesium.Color.RED,
                distanceDisplayCondition : new Cesium.DistanceDisplayCondition(0.0, 5.5e6)
            }
        })
    }
    arr.forEach(function(val, index, arr){
        addWorldPoints(val);
    });

    arr2.forEach(function(val, index, arr){
        addRectangle(val);
    });

    //Fly
    // fly to anywhere
    var destination = document.getElementById('searchInput');
    searchInput.addEventListener('keydown', function(event){
        if(event.which == 13){
            var val = destination.value.split(',');
            flyTo(val);
        }
    }, false);
    function flyTo(arr){
        var cameraPosition = viewer.scene.camera.positionWC;
        var ellipsoidPosition = viewer.scene.globe.ellipsoid.scaleToGeodeticSurface(cameraPosition);
        var distance = Cesium.Cartesian3.magnitude(Cesium.Cartesian3.subtract(cameraPosition, ellipsoidPosition, new Cesium.Cartesian3()));
        var height = arr[2] || 100000;
        console.log(height);
        if(distance < 5000000){
            console.log('11');
            viewer.scene.camera.flyTo({
                destination : Cesium.Cartesian3.fromDegrees(arr[0]/2, arr[1]/2, 5000000),
                complete : function() {
                    viewer.scene.camera.flyTo({
                        destination : Cesium.Cartesian3.fromDegrees(arr[0], arr[1], height),
                        orientation : {
                            heading : Cesium.Math.toRadians(200.0),
                            pitch : Cesium.Math.toRadians(-50.0)
                        },
                        easingFunction : Cesium.EasingFunction.LINEAR_NONE
                    });
                    /*setTimeout(function() {
                     viewer.scene.camera.flyTo({
                     destination : Cesium.Cartesian3.fromDegrees(arr[0], arr[1], height),
                     orientation : {
                     heading : Cesium.Math.toRadians(200.0),
                     pitch : Cesium.Math.toRadians(-50.0)
                     },
                     easingFunction : Cesium.EasingFunction.LINEAR_NONE
                     });
                     }, 100);*/
                }
            });
        }else{
            viewer.scene.camera.flyTo({
                destination : Cesium.Cartesian3.fromDegrees(arr[0], arr[1], 100000)
            });
        }
    };

    /*飞到你的所在地*/
    function flyToYourLocation(){
        // Create callback for browser's geolocation
        function fly(position) {
            viewer.camera.flyTo({
                destination : Cesium.Cartesian3.fromDegrees(position.coords.longitude, position.coords.latitude, 100000.0)
            });
        }

        // Ask browser for location, and fly there.
        navigator.geolocation.getCurrentPosition(fly);
    }
    // flyToYourLocation();

    /*高度变化函数*/
    function changeHeight(){
        var scene = viewer.scene;
        var ellipsoid = scene.globe.ellipsoid;
        var position = Cesium.Cartesian3.fromDegrees(0.0, 0.0);
        var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
        handler.setInputAction(function(movement) {
            // console.log(Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, position));
            // var widget = new Cesium.CesiumWidget('cesiumContainer');
            // var wScene = widget.scene;
            // var cameraHeight = ellipsoid.cartesianToCartographic(wScene.camera.position).height;
            // console.log(cameraHeight);
            var screenCamera = new Cesium.ScreenSpaceCameraController(scene);
            console.log('可以控制鼠标，滚轮事件');
            console.log('height is changed');
            console.log(viewer.camera.getMagnitude());
            console.log(viewer.camera.positionWC);
            if(viewer.camera.positionWC.z < 2000000){
                console.log('height is slowly');
                var imageryLayers = viewer.imageryLayers;
                var tileCoord = new Cesium.TileCoordinatesImageryProvider({
                });
                var layer = imageryLayers.addImageryProvider(tileCoord);
                layer.alpha = Cesium.defaultValue(1.0, 0.5);
                layer.show = Cesium.defaultValue(true, true);
                layer.name = 'grid';
                Cesium.knockout.track(layer, ['alpha', 'show', 'name']);
                console.log(tileCoord.credit);
            }

        }, Cesium.ScreenSpaceEventType.WHEEL);
    }
    changeHeight();

    /*Camera*/
    function cameraAttrs(){
        console.log('----------------------cameraAttrs------------------------------');
        var camera = viewer.camera;
        console.log(camera.DEFAULT_OFFSET);
        console.log(camera.DEFAULT_VIEW_FACTOR);
        console.log(camera.DEFAULT_VIEW_RECTANGLE);
        // changed
        console.log(camera.constrainedAxis + '约束轴');
        //defaultLookAmount
        //defaultMoveAmount
        //defaultRotateAmount
        //defaultZoomAmount
        console.log(camera.direction + 'camera 视图方向');
        console.log(camera.directionWC + 'camera 在世界坐标的方向');
        console.log(camera.frustum);
        console.log('视野中的空间区域，可以知道距离地球的高度，x,y偏移量，')
        console.log(camera.heading + '航向角');
        console.log(camera.pitch + 'camera 弧度');
        console.log(camera.positionCartographic + 'camera 位置');
        console.log(camera.positionWC + '在世界坐标');
        console.log(camera.right);
        console.log(camera.up);
        // inverseTransform
        // inverseViewMatrix
        // maximumZoomFactor
        // right
        // rightWC
        // roll
        // transform
        // up
        // upWC
        // viewMatrix
        console.log('--------------------------cameraFun---------------------------');
        //percentageChanged
        //cameraToWorldCoordinates cameraToWorldCoordinatesPoint cameraToWorldCoordinatesVector(cartesian, result)
        //cancelFlight()
        //computeViewRectangle
        //distanceToBoundingSphere(boundingSphere)
        //flyHome(duration)
        //flyTo(options)
        //flyToBoundingSphere(boundingSphere, options)
        //getMagnitude()  高获取
        //getPickRay(windowPosition, result) 创建光束在camera和position之间
        //getPixelSize(boundingSphere, drawingBufferWidth, drawingBufferHeight)
        //getRectangleCameraCoordinates(rectangle, result)
        //look(axis, angle)
        //lookAt(target, offset)
        /*var center = Cesium.Cartesian3.fromDegrees(-98.0, 40.0);
         viewer.camera.lookAt(center, new Cesium.Cartesian3(0.0, -4790000.0, 3930000.0));*/
        /*var center = Cesium.Cartesian3.fromDegrees(-72.0, 40.0);
         var heading = Cesium.Math.toRadians(50.0);
         var pitch = Cesium.Math.toRadians(-20.0);
         var range = 5000.0;
         viewer.camera.lookAt(center, new Cesium.HeadingPitchRange(heading, pitch, range));*/
        // lookAtTransform(transform, offset)
        /*var transform = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(-98.0, 40.0));
         console.log(transform);
         viewer.camera.lookAtTransform(transform, new Cesium.Cartesian3(0.0, -4790000.0, 3930000.0));*/
        //lookDown(amount)
        /*var amount = Cesium.Math.toRadians(5.0);
         viewer.camera.lookDown(amount);
         viewer.camera.lookLeft(amount);
         viewer.camera.lookRight(amount);*/
        // move(direction, amount);
        // moveBackward(amount)
        // moveDown(amount)
        // moveForward(amount)
        // moveLeft(amount)
        // moveRight(amount)
        // moveUp(amount)
        /*var amount = Cesium.Math.toRadians(100.0);
         viewer.camera.moveUp(amount);*/
        /*var amount = Cesium.Math.toRadians(5.0);
         viewer.camera.move( new Cesium.Cartesian3(-98.0, 40.0), amount);*/
        //pickEllipsoid(windowPosition, ellipsoid, result) 选择地球或者map
        // console.log(camera.pickEllipsoid(new Cesium.Cartesian2(20, 30), Cesium.Ellipsoid.WGS84));
        // rotate(axis, angle)
        // rotateDown(angle)
        // rotateLeft(angle)
        // rotateRight(angle)
        // rotateUp(angle)
        // setView(options)
        // switchToOrthographicFrustum()
        // switchToPerspectiveFrustum()
        // twistRight(amount)
        // twistLeft(amount)
        // viewBoundingSphere(boundingSphere, offset)
        // worldToCameraCoordinates(cartesian, result)
        // worldToCameraCoordinatesPoint(cartesian, result)
        // worldToCameraCoordinatesVector(cartesian, result)
        // zoomIn(amount)
        // zoomOut(amount)
        /*var amount = Cesium.Math.toRadians(6.0);
         console.log(amount);
         viewer.camera.zoomIn(10);
         viewer.camera.zoomOut(1e-10);*/
        // FlightCancelledCallback()
        // FlightCompleteCallback()

    }
    /*设定初始值*/
    /*var eye = new Cesium.Cartesian3(811968.1190451372, 858734.801874979, 821724.2805079403);
     var target = new Cesium.Cartesian3.add(new Cesium.Cartesian3(100052.5028130862217908, 100025.52449297750082904, 100052.16880583840911567));
     var up = new Cesium.Cartesian3(100000.5, 105000.5, 105000.5);
     viewer.scene.getCamera().controller.lookAt(eye, target, up);*/

    // viewer.camera.positionCartographic = new Cesium.Cartographic(1.439896632895322, 0.6137046536223862, 1000000);
    // viewer.camera.constrainedAxis = Cesium.Cartesian3.UNIT_Y;
    // var bounding = viewer.scene.boundingSphere();
    // viewer.
    console.log(viewer.camera.getMagnitude());
    // console.log(viewer.camera.distanceToBoundingSphere(bounding));

    cameraAttrs();
    /*camera Changed*/
    function cameraChanges() {
        // Sandcastle.declare(cameraChanges);
        var i = 0;
        viewer.camera.changed.addEventListener(function(percentage) {
            ++i;
            console.log('Camera Changed: ' + i + ', ' + percentage.toFixed(6));
        });
    }
    cameraChanges();

    /*camera Events*/
    function cameraEvents() {
        var camera = viewer.camera;
        camera.moveStart.addEventListener(function() {
            console.log('move start,不管是x,y,z变化，都可捕捉');
        });
        camera.moveEnd.addEventListener(function() {
            console.log(viewer.camera.getMagnitude());
            console.log('move end');
        });
    }
    cameraEvents();

    /*ScreenSpaceCameraController*/
    function controlScarren(){
        var controller = viewer.scene.screenSpaceCameraController;
        console.log(controller);
        controller.maximumZoomDistance = 100000000;
        console.log(controller.maximumZoomDistance);
    }
    controlScarren();

})();