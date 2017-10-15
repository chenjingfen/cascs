/*
 * 10.10.2.81对应的外网地址111.204.219.220
 *
 * arcgis在线地图：http://services.arcgisonline.com/arcgis/rest/services
 * */


/*获取当前视角高度
 */

var CesMap = {
    viewer: null,
    init: function () {

        CesMap.viewer = new Cesium.Viewer('cesiumContainer', {
            animation: false, //动画控制不显示
            sceneModePicker: false,//投影方式显示
            baseLayerPicker: false,
            imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
                url: 'http://services.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer'
            }),
            fullscreenButton: false,
            selectionIndicator: false,
            homeButton: false,
            navigationInstructionsInitiallyVisible: false,
            timeline: false,
            geocoder: false,
            navigationHelpButton: false,
            scene3DOnly: false,
            automaticallyTrackDataSourceClocks: false,
            sceneMode: Cesium.SceneMode.SCENE3D,//初始场景模式
            terrainProvider: new Cesium.EllipsoidTerrainProvider(),
            skyBox: new Cesium.SkyBox({
                sources: {
                    positiveX: '../img/skyBox/后4.png',
                    negativeX: '../img/skyBox/前4.png',
                    positiveY: '../img/skyBox/右3.png',
                    negativeY: '../img/skyBox/左4.png',
                    positiveZ: '../img/skyBox/上4.png',
                    negativeZ: '../img/skyBox/下4.png'
                }
            }),//用于渲染星空的SkyBox对象

        });
        CesMap.viewer._cesiumWidget._creditContainer.style.display = "none";

        var bounds = Cesium.Rectangle.MAX_VALUE;
        /*
        *
        * west   xmin
        * south  ymin
        * east   xmax
        * north  ymax
        *
        * */

// init heatmap
        /*      var heatMap = CesiumHeatmap.create(
                  CesMap.viewer, // your cesium viewer
                  bounds, // bounds for heatmap layer
                  {
                      maxOpacity:1
                      // heatmap.js options go here
                      // maxOpacity: 0.3
                  }
              );*/

// random example data

        var data = [];
        var valueMin = 0;
        var valueMax = 40993958;
        var country ;
        $.ajax({
            url: '../data/country.json',
            async: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: "json",
            success: function (resp, status) {
                 country = resp;

            },
            error: function () {
                console.log("error")
            }, complete: function () {
                $.ajax({
                    url: '../data/countryAgg.json',
                    async: true,
                    type: "GET",
                    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                    dataType: "json",
                    success: function (response, status) {

                        for (var key in response) {
                            if (country[key]) {
                                data.push({
                                    x: country[key][0],
                                    y: country[key][1],
                                    value: response[key]
                                });


                                var entity = CesMap.viewer.entities.add({
                                    position: Cesium.Cartesian3.fromDegrees(country[key][0],  country[key][1]),
                                    //广告牌
                                    billboard: {
                                        image: 'img/1.jpg',
                                        width: 64,
                                        height: 64,

                                    }
                                });
                            }

                        }

                    },
                    error: function () {
                        console.log('error')
                    }, complete: function () {
                        console.log('--------layers----------')
                        var layers = CesMap.viewer.scene.imageryLayers;
                        var mapData = {
                            min: valueMin,
                            max: valueMax,
                            points: data
                        };
                        var heatmapoptions = {
                            container: 'cesiumContainer',
                            radius: 100
                        };

                        heatLayer = layers.addImageryProvider(new Cesium.HeatmapImageryProvider({
                             heatmapoptions: heatmapoptions,
                            data: mapData,
                            bounds: bounds
                        }));

                        heatLayer.show = true;
                    }
                });

            }
        });
        /*   for (var i = 0; i < 50; i++) {
               data.push({
                   x: Math.random() * (bounds.east - bounds.west) + bounds.east,
                   y: Math.random() * (bounds.north - bounds.south) + bounds.south,
                   value: Math.random() * 1000
               });

               if (i == 1) {

                   var entity = CesMap.viewer.entities.add({
                       position: Cesium.Cartesian3.fromDegrees(Math.random() * (bounds.east - bounds.west) + bounds.east, Math.random() * (bounds.north - bounds.south) + bounds.south),
                       //广告牌
                       billboard: {
                           image: 'img/1.jpg',
                           width: 64,
                           height: 64,

                       }
                   });
               }
           }*/
        /*var data = [{"x":147.1383442264,"y":-41.4360048372,"value":76},{"x":147.1384363011,"y":-41.4360298848,"value":63},{"x":147.138368102,"y":-41.4358360603,"value":1},{"x":147.1385627739,"y":-41.4358799123,"value":21},{"x":147.1385138501,"y":-41.4359327669,"value":28},{"x":147.1385031219,"y":-41.4359730105,"value":41},{"x":147.1384127393,"y":-41.435928255,"value":75},{"x":147.1384551136,"y":-41.4359450132,"value":3},{"x":147.1384927196,"y":-41.4359158649,"value":45},{"x":147.1384938639,"y":-41.4358498311,"value":45},{"x":147.1385183299,"y":-41.4360213794,"value":93},{"x":147.1384007925,"y":-41.4359860133,"value":46},{"x":147.1383604844,"y":-41.4358298672,"value":54},{"x":147.13851025,"y":-41.4359098303,"value":39},{"x":147.1383874733,"y":-41.4358511035,"value":34},{"x":147.1384981796,"y":-41.4359355403,"value":81},{"x":147.1384504107,"y":-41.4360332348,"value":39},{"x":147.1385582664,"y":-41.4359788335,"value":20},{"x":147.1383967364,"y":-41.4360581999,"value":35},{"x":147.1383839615,"y":-41.436016316,"value":47},{"x":147.1384082712,"y":-41.4358423338,"value":36},{"x":147.1385092651,"y":-41.4358577623,"value":69},{"x":147.138360356,"y":-41.436046789,"value":90},{"x":147.138471893,"y":-41.4359184292,"value":88},{"x":147.1385605689,"y":-41.4360271359,"value":81},{"x":147.1383585714,"y":-41.4359362476,"value":32},{"x":147.1384939114,"y":-41.4358844253,"value":67},{"x":147.138466724,"y":-41.436019121,"value":17},{"x":147.1385504355,"y":-41.4360614056,"value":49},{"x":147.1383883832,"y":-41.4358733544,"value":82},{"x":147.1385670669,"y":-41.4359650236,"value":25},{"x":147.1383416534,"y":-41.4359310876,"value":82},{"x":147.138525285,"y":-41.4359394661,"value":66},{"x":147.1385487719,"y":-41.4360137656,"value":73},{"x":147.1385496029,"y":-41.4359187277,"value":73},{"x":147.1383989222,"y":-41.4358556562,"value":61},{"x":147.1385499424,"y":-41.4359149305,"value":67},{"x":147.138404523,"y":-41.4359563326,"value":90},{"x":147.1383883675,"y":-41.4359794855,"value":78},{"x":147.1383967187,"y":-41.435891185,"value":15},{"x":147.1384610005,"y":-41.4359044797,"value":15},{"x":147.1384688489,"y":-41.4360396127,"value":91},{"x":147.1384431875,"y":-41.4360684409,"value":8},{"x":147.1385411067,"y":-41.4360645847,"value":42},{"x":147.1385237178,"y":-41.4358843181,"value":31},{"x":147.1384406464,"y":-41.4360003831,"value":51},{"x":147.1384679169,"y":-41.4359950456,"value":96},{"x":147.1384194314,"y":-41.4358419739,"value":22},{"x":147.1385049792,"y":-41.4359574813,"value":44},{"x":147.1384097378,"y":-41.4358598672,"value":82},{"x":147.1384993219,"y":-41.4360352975,"value":84},{"x":147.1383640499,"y":-41.4359839518,"value":81}];
       */


// add data to heatmap
        /*heatMap.setWGS84Data(valueMin, valueMax, data);*/

        /*CesMap.viewer.scene.backgroundColor = Cesium.Color.ALICEBLUE;*/
        //添加另外一个图层

        /* var baseLayer = layers.addImageryProvider(new Cesium.ArcGisMapServerImageryProvider({
             url: 'http://111.204.219.220:6080/arcgis/rest/services/world/MapServer'
         }));

         baseLayer.show = false;

         var provinceLayer = layers.addImageryProvider(new Cesium.ArcGisMapServerImageryProvider({
             url: 'http://111.204.219.220:6080/arcgis/rest/services/province2/MapServer'
         }));
         provinceLayer.show = false;*/

        CesMap.viewer.camera.changed.addEventListener(function (percentage) {
            var viewer = CesMap.viewer;
            var result = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(viewer.canvas.clientWidth / 2, viewer.canvas.clientHeight / 2));

            var curPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(result);


            var lon = curPosition.longitude * 180 / Math.PI;
            var lat = curPosition.latitude * 180 / Math.PI;

            var worldUrl = 'http://111.204.219.220:6080/arcgis/rest/services/world/MapServer/0/query?geometry=(' + lon + ',' + lat + ')&geometryType=esriGeometryPoint&spatialRel=esriSpatialRelIntersects&outFields=NAME_ENGLI&returnGeometry=false&returnIdsOnly=false&returnCountOnly=false&returnZ=true&returnM=true&f=json'
            var provinceUrl = 'http://111.204.219.220:6080/arcgis/rest/services/province/MapServer/0/query?geometry=(' + lon + ',' + lat + ')&geometryType=esriGeometryPoint&spatialRel=esriSpatialRelIntersects&outFields=NAME_0,NAME_1&returnGeometry=false&returnCountOnly=false&returnZ=false&returnM=false&f=json';
            var height = CesMap.getHeight();

            if (height >= 11622781) {
                /*   provinceLayer.show = false;
                   baseLayer.show = true;*/
                if ($('.search').val() != '') {
                    $('#status').show();
                    $.ajax({
                        url: worldUrl,
                        async: true,
                        type: "GET",
                        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                        dataType: "json",
                        success: function (response, status) {
                            if (response.features.length > 0) {
                                var city = response.features[0]['attributes']['NAME_ENGLI'];
                                $('#status .location').html(city);

                            } else {
                                $('#status .location').html('unKnown')
                            }
                        }
                    });
                    $('#status .lon').html(lon);
                    $('#status .lat').html(lat);
                }
            } else {
                /*provinceLayer.show = true;
                baseLayer.show = false;*/
                if ($('.search').val() != '') {
                    $('#status').show();
                    $.ajax({
                        url: provinceUrl,
                        async: true,
                        type: "GET",
                        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                        dataType: "json",
                        success: function (response, status) {
                            if (response.features.length > 0) {
                                var location = response.features[0]['attributes']['NAME_1'] + ',' + response.features[0]['attributes']['NAME_0'];
                                $('#status .location').html(location)
                            } else {
                                $('#status .location').html('unKnown')
                            }
                        }
                    });
                    $('#status .lon').html(lon);
                    $('#status .lat').html(lat);
                }

            }


        });


        /*   var handler = new Cesium.ScreenSpaceEventHandler(CesMap.viewer.scene.canvas);
            handler.setInputAction(function (movement) {
            var feature = CesMap.viewer.scene.pick(movement.endPosition);
            if (feature) {
            feature.id._billboard._height._value = 512;
            feature.id._billboard._width._value = 512;
            } else {
            CesMap.viewer.entities._entities._array.forEach(function (item) {
            item._billboard._height._value = 64;
            item._billboard._width._value = 64;
            });
            }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);*/


        /*      geoCoder = CesMap.viewer.geocoder.viewModel;
              geoCoder.flightDuration = 3;

              geoCoder._complete._listeners.push(function () {
                  $('.radar-block').hide();
                  // $('#status').hide();

                  var searchText = geoCoder.searchText.split(',');
                  console.log("_complete");


                  var appid = '2015063000000001';
                  var key = '12345678';
                  var salt = (new Date).getTime();
                  var query = searchText[0];
      // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
                  var from = 'en';
                  var to = 'zh';
                  var str1 = appid + query + salt + key;
                  var sign = hex_md5(str1);
                  $.ajax({
                      url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
                      type: 'get',
                      dataType: 'jsonp',
                      data: {
                          q: query,
                          appid: appid,
                          salt: salt,
                          from: from,
                          to: to,
                          sign: sign
                      },
                      success: function (data) {
                          console.log(data);
                          return data.trans_result[0].dst;
                      }
                  });


                   var extent = CesMap.getCurrentExtent();
                   CesMap.viewer.entities.removeAll();
                   for (var i = 1; i < 17; i++) {
                   var entity = CesMap.viewer.entities.add({
                   position: Cesium.Cartesian3.fromDegrees(Math.random() * (extent.xmax - extent.xmin) + extent.xmin, Math.random() * (extent.ymax - extent.ymin) + extent.ymin),
                   //广告牌
                   billboard: {
                   image: 'img/' + i + '.jpg',
                   width: 64,
                   height: 64,
               /!*    scale:0.5*!/

                   }
                   });
                   if (i == 1)
                   console.log(entity);
                   }


                  /!*var imgContainer = $('#imageContainer').show();
                   imgContainer.empty();
                   for (var i = 0; i < 17; i++) {
                   var imgSrc = "../img/map/" + i + ".jpg";
                   var img = $('<img src=' + imgSrc + '>').appendTo(imgContainer);
                   }

                   $("#imageContainer img").each(function () {
                   d = Math.random() * 100; //1ms to 1000ms delay
                   $(this).delay(d).animate({opacity: 1}, {
                   duration: 500
                   });
                   });*!/




              });

              geoCoder._searchCommand.beforeExecute._listeners.push(function () {

                  $('#status').hide(1000);
                  $("#imageContainer img").each(function () {
                      d = Math.random() * 1000; //1ms to 1000ms delay
                      $(this).delay(d).animate({opacity: 0}, {
                          //while the thumbnails are fading out, we will use the step function to apply some transforms. variable n will give the current opacity in the animation.
                          step: function (n) {
                              s = 1 - n; //scale - will animate from 0 to 1
                              $(this).css("transform", "scale(" + s + ")");
                          },
                          duration: 1000,
                      })
                  }).promise().done(function () {
                      $('#mask').hide(500)
                  })


              });

              geoCoder._searchCommand.afterExecute._listeners.push(function () {
                  $('.radar-block').show();
              });*/

        $('.search-input').on('submit', function (e) {
            e.preventDefault();
            console.log("search");
            var searchText = $('.search').val();
            $("#prev").attr('data-page', 0);
            $("#next").attr('data-page', 2);
            CesMap.getImg(searchText, 1, 25);
        });


    },
    controlScarren: function () {
        var controller = CesMap.viewer.scene.screenSpaceCameraController;

        controller.maximumZoomDistance = 100000000;

    },
    // 获取当前三维范围
    getCurrentExtent: function () {

        var viewer = CesMap.viewer;
        // 范围对象
        var extent = {};

        // 得到当前三维场景
        var scene = viewer.scene;

        // 得到当前三维场景的椭球体
        var ellipsoid = scene.globe.ellipsoid;
        var canvas = scene.canvas;

        // canvas左上角
        var car3_lt = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(0, 0), ellipsoid);

        // canvas右下角
        var car3_rb = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(canvas.width, canvas.height), ellipsoid);

        // 当canvas左上角和右下角全部在椭球体上
        if (car3_lt && car3_rb) {
            var carto_lt = ellipsoid.cartesianToCartographic(car3_lt);
            var carto_rb = ellipsoid.cartesianToCartographic(car3_rb);
            extent.xmin = Cesium.Math.toDegrees(carto_lt.longitude);
            extent.ymax = Cesium.Math.toDegrees(carto_lt.latitude);
            extent.xmax = Cesium.Math.toDegrees(carto_rb.longitude);
            extent.ymin = Cesium.Math.toDegrees(carto_rb.latitude);
        }

        // 当canvas左上角不在但右下角在椭球体上
        else if (!car3_lt && car3_rb) {
            var car3_lt2 = null;
            var yIndex = 0;
            do {
                // 这里每次10像素递加，一是10像素相差不大，二是为了提高程序运行效率
                yIndex <= canvas.height ? yIndex += 10 : canvas.height;
                car3_lt2 = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(0, yIndex), ellipsoid);
            } while (!car3_lt2);
            var carto_lt2 = ellipsoid.cartesianToCartographic(car3_lt2);
            var carto_rb2 = ellipsoid.cartesianToCartographic(car3_rb);
            extent.xmin = Cesium.Math.toDegrees(carto_lt2.longitude);
            extent.ymax = Cesium.Math.toDegrees(carto_lt2.latitude);
            extent.xmax = Cesium.Math.toDegrees(carto_rb2.longitude);
            extent.ymin = Cesium.Math.toDegrees(carto_rb2.latitude);
        }

        // 获取高度
        extent.height = Math.ceil(viewer.camera.positionCartographic.height);
        return extent;
    },
    getHeight: function () {
        if (CesMap.viewer) {
            var scene = CesMap.viewer.scene;
            var ellipsoid = scene.globe.ellipsoid;
            var height = ellipsoid.cartesianToCartographic(CesMap.viewer.camera.position).height;
            return height;
        }

    },
    getCenterPosition: function () {
        var viewer = CesMap.viewer;
        var result = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(viewer.canvas.clientWidth / 2, viewer.canvas.clientHeight / 2));

        var curPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(result);


        var lon = curPosition.longitude * 180 / Math.PI;
        var lat = curPosition.latitude * 180 / Math.PI;


        var worldUrl = 'http://10.10.2.81:6080/arcgis/rest/services/world/MapServer/0/query?geometry=(' + lon + ',' + lat + ')&geometryType=esriGeometryPoint&spatialRel=esriSpatialRelIntersects&outFields=NAME_ENGLI&returnGeometry=false&returnIdsOnly=false&returnCountOnly=false&returnZ=true&returnM=true&f=json'
        var provinceUrl = 'http://10.10.2.81:6080/arcgis/rest/services/province/MapServer/0/query?geometry=(' + lon + ',' + lat + ')&geometryType=esriGeometryPoint&spatialRel=esriSpatialRelIntersects&outFields=NAME_0,NAME_1&returnGeometry=false&returnCountOnly=false&returnZ=false&returnM=false&f=json';
        var height = CesMap.getHeight();
        return {
            lon: lon,
            lat: lat,
            height: height
        };

    },
    translate: function (en) {
        var appid = '2015063000000001';
        var key = '12345678';
        var salt = (new Date).getTime();
        var query = en;
// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
        var from = 'en';
        var to = 'zh';
        var str1 = appid + query + salt + key;
        var sign = hex_md5(str1);
        $.ajax({
            url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
            type: 'get',
            dataType: 'jsonp',
            data: {
                q: query,
                appid: appid,
                salt: salt,
                from: from,
                to: to,
                sign: sign
            },
            success: function (data) {
                return data.trans_result[0].dst;
            }
        });
    },
    getImg: function (searchText, page, pagesize) {
        CesMap.viewer.scene.camera.flyHome();
        $('#imageContainer').empty();
        /* $('#mask').hide();*/
        if (page === 1) {
            $('#prev').attr('disabled', 'disabled');
        } else {
            $('#prev').attr('disabled', false);
        }
        $.ajax({
            url: '../data/getImg.json',
            async: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: "json",
            success: function (response, status) {
                console.log(response);
                var $left = $('#leftContainer ul').empty();
                var data = response.data;
                var len = data.length;
                if (len < pagesize) {
                    $('#next').attr('disabled', 'disabled');
                } else {
                    $('#next').attr('disabled', false);
                }
                if (len === 0) {
                    $('#mask').hide();
                } else {
                    var extent = response.extent;
                    CesMap.viewer.scene.camera.flyTo({
                        destination: Cesium.Cartesian3.fromDegrees(extent.centerX, extent.centerY, 500000 + Math.random() * 100000)
                    });
                    var imgData = [];
                    for (var i = 0; i < len; i++) {
                        var imgSrc = data[i]['imageInfo']['localUrl'];
                        imgData.push({'src': imgSrc});
                        $left.append('<li>' + data[i]['ipInfo']['ip'] + '</li>')
                    }

                    //页面加载图片
                    function showImage() {
                        var camera, scene, renderer, renderer1, current;
                        var controls;
                        var objects = [];
                        var targets = {mygrid1: []};
                        init();
                        animate();

                        function init() {
                            camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
                            // camera = new THREE.OrthographicCamera(-window.innerWidth/200, window.innerWidth/200, window.innerHeight/200, -window.innerHeight/200, 1, 10000);
                            camera.position.z = 3000;
                            current = {
                                x: camera.position.x,
                                y: camera.position.y,
                                z: camera.position.z
                            }
                            scene = new THREE.Scene();
                            // myGrid1
                            var indexX = 1400;
                            var indexY = 900;
                            for (var i = 0; i < len; i++) {
                                var element = document.createElement('div');
                                element.className = 'element';
                                element.id = 'image' + (i + 1);
                                /*element.addEventListener('mouseenter', function(event){
                                 var target = event.target;
                                 target.style.width = '240px';
                                 target.style.height = '320px';
                                 });
                                 element.addEventListener('mouseleave', function(event){
                                 var target = event.target;
                                 target.style.width = '120px';
                                 target.style.height = '160px';
                                 });
                                 element.addEventListener('click', function(event){
                                 var target = event.target;
                                 if(target.offsetWidth == 122){
                                 target.style.width = '240px';
                                 target.style.height = '320px';
                                 }else{
                                 target.style.width = '120px';
                                 target.style.height = '160px';
                                 }
                                 });*/
                                element.style.background = 'url(' + imgData[i]['src'] + ') no-repeat center/auto 100%';

                                var object = new THREE.CSS3DObject(element);
                                object.position.x = Math.random() * 4000 - 2000;
                                object.position.y = Math.random() * 4000 - 2000;
                                object.position.z = Math.random() * 4000 - 2000;
                                scene.add(object);
                                objects.push(object);
                                //
                                var object = new THREE.Object3D();
                                /*var unKonwn = 40 + Math.floor(Math.random() * 60);
                                 object.position.x = ( ( i % 10 ) * (240 + unKonwn) ) - 1500;
                                 unKonwn = 40 + Math.floor(Math.random() * 60);
                                 object.position.y = ( - ( Math.floor( i / 10 ) % 5 ) * (240 + unKonwn) ) + 800;
                                 switch(Math.floor(Math.random() * 5)){
                                 case 0:
                                 object.position.z = 0;
                                 break;
                                 case 1:
                                 object.position.z = 200;
                                 break;
                                 case 2:
                                 object.position.z = 400;
                                 break;
                                 case 3:
                                 object.position.z = 600;
                                 break;
                                 case 4:
                                 object.position.z = 800;
                                 break;
                                 };*/
                                // object.position.x = 0;
                                // object.position.y = -800;
                                if (i % 7 === 0 && i > 1) indexY = indexY - 400;
                                object.position.x = indexX - Math.floor(Math.random() * 140);   //-1400 1400
                                object.position.y = indexY - Math.floor(Math.random() * 140);    //900  -800

                                switch (Math.floor(Math.random() * 3)) {
                                    case 0:
                                        object.position.z = 0;
                                        break;
                                    case 1:
                                        object.position.z = 100;
                                        break;
                                    case 2:
                                        object.position.z = 200;
                                        break;
                                    /*case 3:
                                     object.position.z = 600;
                                     break;
                                     case 4:
                                     object.position.z = 800;
                                     break;*/
                                }
                                ;
                                indexX = indexX - 400;
                                if (indexX < -1400) indexX = 1400;
                                // object.position.z = ( Math.floor( i*5 / 60 ) ) * 200 - 200;

                                targets.mygrid1.push(object);
                            }

                            //
                            renderer = new THREE.CSS3DRenderer();
                            renderer.setSize(window.innerWidth, window.innerHeight);
                            renderer.domElement.style.position = 'absolute';
                            document.getElementById('imageContainer').appendChild(renderer.domElement);
                            //

                            controls = new THREE.TrackballControls(camera, renderer.domElement);
                            controls.rotateSpeed = 0;
                            /*controls.zoomSpeed = 1.0;
                             controls.panSpeed = 1.0;	*/
                            controls.minDistance = 2000;
                            controls.maxDistance = 4000;
                            controls.addEventListener('change', render);

                            /* var button = document.getElementById( 'mygrid1' );
                             button.addEventListener( 'click', function ( event ) {
                             transform( targets.mygrid1, 2000 );
                             }, false );*/
                            transform(targets.mygrid1, 2000);
                            //
                            window.addEventListener('resize', onWindowResize, false);
                        }

                        function transform(targets, duration) {
                            TWEEN.removeAll();
                            for (var i = 0; i < objects.length; i++) {
                                var object = objects[i];
                                var target = targets[i];
                                new TWEEN.Tween(object.position)
                                    .to({
                                        x: target.position.x,
                                        y: target.position.y,
                                        z: target.position.z
                                    }, Math.random() * duration + duration)
                                    .easing(TWEEN.Easing.Exponential.InOut)
                                    .start();
                                new TWEEN.Tween(object.rotation)
                                    .to({
                                        x: target.rotation.x,
                                        y: target.rotation.y,
                                        z: target.rotation.z
                                    }, Math.random() * duration + duration)
                                    .easing(TWEEN.Easing.Exponential.InOut)
                                    .start();
                            }
                            new TWEEN.Tween(this)
                                .to({}, duration * 2)
                                .onUpdate(render)
                                .start();
                        }

                        function onWindowResize() {
                            camera.aspect = window.innerWidth / window.innerHeight;
                            camera.updateProjectionMatrix();
                            renderer.setSize(window.innerWidth, window.innerHeight);
                            render();
                        }

                        function animate() {
                            requestAnimationFrame(animate);
                            TWEEN.update();
                            controls.update();
                        }

                        function render() {
                            /*  var x=(current.x-camera.position.x)*10,
                             y=(current.y-camera.position.y)*10,
                             z=current.z-camera.position.z;
                             current.x=camera.position.x;
                             current.y=camera.position.y;
                             current.z=camera.position.z;
                             console.log(x,y,z);
                             if(z===0){
                             if(x!=0||y!=0){
                             var center = CesMap.getCenterPosition();
                             var result = CesMap.viewer.camera.pickEllipsoid(new Cesium.Cartesian2(camera.position.x, camera.position.y));

                             var curPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(result);
                             console.log("------center---------");
                             console.log(center);
                             console.log(curPosition);
                             var lon = curPosition.longitude * 180 / Math.PI;
                             var lat = curPosition.latitude * 180 / Math.PI;
                             CesMap.viewer.scene.camera.flyTo({
                             destination: Cesium.Cartesian3.fromDegrees(lon, lat, center.height)
                             });
                             }
                             }*/

                            renderer.render(scene, camera);
                        }
                    }

                    showImage();

                }
            },
            error: function () {
                $('.wave').hide();
                $('#mask').hide();
            }, complete: function () {
                $('.wave').hide();
                $('#mask').show();
            }
        });
    }
};

$(function () {
    CesMap.init();
    CesMap.controlScarren();


});

$("#next").on('click', function () {
    var center = CesMap.getCenterPosition();
    console.log(center)
    CesMap.viewer.scene.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(center.lon + 0.1, center.lat, center.height)
    });
});