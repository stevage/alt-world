<template lang="pug">
#map.absolute.absolute--fill
</template>

<script>
import mapboxgl from 'mapbox-gl';
import U from 'mapbox-gl-utils';
import { flatten } from 'array-flatten';
export default {
    async mounted() {
        // replace this Mapbox access token with your own
        mapboxgl.accessToken = 'pk.eyJ1Ijoic3RldmFnZSIsImEiOiJGcW03aExzIn0.QUkUmTGIO3gGt83HiRIjQw';
        const map = new mapboxgl.Map({
            container: 'map',
            // center: [144.96, -37.81],
            center: [145.204,-37.7748],
            zoom: 11.5,
            // style: 'mapbox://styles/stevage/ck4tku4pb6j7v1cn7hni116zg/draft?refresh=1',
            style: {
                version: 8,
                layers: [],
                sources: {},
                glyphs: 'mapbox://fonts/stevage/{fontstack}/{range}.pbf'
            },
            hash: 'loc',
            minZoom: 10,
            maxZoom: 16

        });
        U.init(map, mapboxgl);
        // map.showTileBoundaries = true;
        window.map = map;
        window.MapVue = this;

        
        const env = {
            local: {
                tiles: ['http://localhost:3031/grid/{z}/{x}/{y}.pbf']
            },
            glitch: {
                tiles: ['https://procmap.glitch.me/grid/{z}/{x}/{y}.pbf']
            }
        }[window.location.hostname === 'localhost' ? 'local' : 'glitch'];

        map.U.onLoad(()=> {
            const requestMode = false//true;
            const requestColors = ['rgba(166,206,227,0.5)','rgba(31,120,180,0.5)','rgba(178,223,138,0.5)','rgba(51,160,44,0.5)','rgba(251,154,153,0.5)','rgba(227,26,28,0.5)','rgba(253,191,111,0.5)','rgba(255,127,0,0.5)','rgba(202,178,214,0.5)','rgba(106,61,154,0.5)','rgba(255,255,153,0.5)','rgba(177,89,40,0.5)'];
            const requestColorExpr = requestMode && ['match', ['%', ['get','requestNo'], requestColors.length],
                ...flatten(requestColors.map((c, i) => [i, requestColors[i]])), 'black'
            ];
            console.log(requestColorExpr);
            map.U.addVector('points', {
                tiles: env.tiles,
                minzoom: 6,
                maxzoom: 15 // 9
            });

            map.U.addLine('forests-outline', 'points', {
                sourceLayer: 'grid',
                lineColor: requestColorExpr || 'hsl(90,70%,40%)',
                lineWidth: 3,
                lineJoin: 'round',
                filter: ['==', ['get','type'], 'forest']
            });
            map.U.addFill('forests', 'points', {
                sourceLayer: 'grid',
                fillColor: requestColorExpr || 'hsl(90,70%,80%)',
                // fillOutlineColor: requestColorExpr || 'hsl(90,70%,40%)',
                filter: ['==', ['get','type'], 'forest']
            });
            map.U.addFill('forests2', 'points', {
                sourceLayer: 'grid',
                fillColor: requestColorExpr || 'hsl(90,50%,50%)',
                filter: ['==', ['get','type'], 'forest2']
            });

            map.U.addLine('waters-outline', 'points', {
                sourceLayer: 'grid',
                lineColor: requestColorExpr || 'hsl(220,90%,90%)',
                lineWidth: 5,
                filter: ['==', ['get','type'], 'water2']
            });

            0&&map.U.addFill('beach', 'points', {
                sourceLayer: 'grid',
                fillColor: requestColorExpr || 'hsl(50,80%,75%)',
                filter: ['==', ['get','type'], 'water']
            });
            map.U.addFill('waters2', 'points', {
                sourceLayer: 'grid',
                fillColor: requestColorExpr || 'hsl(220,70%,70%)',
                // fillColor: requestColorExpr || ['get','k'],

                filter: ['==', ['get','type'], 'water2'],
            });
            0&&map.U.addFill('waters3', 'points', {
                sourceLayer: 'grid',
                fillColor: requestColorExpr || 'hsl(220,70%,60%)',
                filter: ['==', ['get','type'], 'water3']
            });
            map.U.addFill('waters4', 'points', {
                sourceLayer: 'grid',
                fillColor: requestColorExpr || 'hsl(220,70%,40%)',
                filter: ['==', ['get','type'], 'water4']
            });

            const roadOpacity = ['interpolate',['linear'],['zoom'],
                10, ['match', ['get','maxsize'],
                    [6,5,4,3,2,1], 1,
                    0],
                11, ['match', ['get','maxsize'],
                    [6,5,4,3,2,1], 1,
                    0],
                12, ['match', ['get','maxsize'],
                    [6,5,4,3,2,1], 1,
                    0],
                13, 1];
            map.U.addLine('road-bridges-outer', 'points', {
                sourceLayer: 'grid',
                filter: ['all', ['==', ['get','type'], 'road'], ['==', ['get','bridge'], 'bridge']],
                lineWidth:['interpolate',['linear'],['zoom'],
                    10, ['+', 8, ['*', 1, ['get','maxsize']]],
                    11, ['+', 8, ['*', 1, ['get','maxsize']]],
                    13, ['+', 10, ['*', 2, ['get','maxsize']]]],
                lineColor: requestColorExpr || '#555'
            });
            map.U.addLine('road-bridges', 'points', {
                sourceLayer: 'grid',
                filter: ['all', ['==', ['get','type'], 'road'], ['==', ['get','bridge'], 'bridge']],
                lineWidth:['interpolate',['linear'],['zoom'],
                    10, ['+', 6, ['*', 1, ['get','maxsize']]],
                    11, ['+', 6, ['*', 1, ['get','maxsize']]],
                    13, ['+', 8, ['*', 2, ['get','maxsize']]]],
                lineColor: requestColorExpr || '#eee'
            });
            map.U.addLine('road-ferry', 'points', {
                sourceLayer: 'grid',
                filter: ['==', ['get','bridge'], 'ferry'],
                lineDasharray: [12,4],
                lineColor: requestColorExpr || '#66f'
            });
            map.U.addLine('road-borders', 'points', {
                sourceLayer: 'grid',
                lineColor: requestColorExpr || ['interpolate',['linear'], ['zoom'],
                    11, ['match',['get','maxsize'],
                        1, 'hsl(30,0%,80%)',
                        'hsl(30,0%,50%)'],
                    12, 'hsl(30,0%,50%)',
                ],

                lineJoin: 'round',
                lineWidth: ['interpolate',['linear'],['zoom'],
                    10, ['*', 1, ['get','maxsize']],
                    11, ['+', 0, ['*', 1, ['get','maxsize']]],
                    13, ['+', 2, ['*', 2, ['get','maxsize']]],
                ],
                lineOpacity: roadOpacity,
                filter: ['all', ['==',['get','type'], 'road'],['!=', ['get','bridge'],'ferry']],

            });
            map.U.addLine('roads', 'points', {
                sourceLayer: 'grid',
                lineColor: requestColorExpr || 'hsl(30,50%,80%)',
                lineJoin: 'round',
                lineWidth: ['interpolate',['linear'],['zoom'],
                    11, ['-',['*', 1, ['get','maxsize']], 1],
                    13, ['*', 2, ['get','maxsize']],
                ],
                lineOpacity: roadOpacity,
                filter: ['all', ['==',['get','type'], 'road'],['!=', ['get','bridge'],'ferry']],

            });

            map.U.addLine('rail', 'points', {
                sourceLayer: 'grid',
                lineColor: requestColorExpr || '#000',
                lineJoin: 'round',
                // lineWidth: 1,
                lineWidth: ['interpolate',['linear'],['zoom'],
                    11, 0.5,
                    12, 1
                ],

                // lineWidth: ['interpolate',['linear'],['zoom'],
                //     // 11, ['-',['*', 1, ['get','maxsize']], 1],
                //     // 13, ['*', 2, ['get','maxsize']],
                // ],
                // lineOpacity: roadOpacity,
                filter: ['==',['get','type'], 'rail'],

            });
            map.U.addLine('rail-crosses', 'points', {
                sourceLayer: 'grid',
                lineColor: requestColorExpr || '#333',
                lineJoin: 'round',
                lineWidth: 5,
                lineDasharray: [0.1,10],
                
                // lineWidth: ['interpolate',['linear'],['zoom'],
                //     // 11, ['-',['*', 1, ['get','maxsize']], 1],
                //     // 13, ['*', 2, ['get','maxsize']],
                // ],
                // lineOpacity: roadOpacity,
                filter: ['==',['get','type'], 'rail'],

            });


            map.U.addCircle('points-circles', 'points', {
                // circleColor: requestColorExpr || ['get', 'marker-color'],
                // circleColor: requestColorExpr || 'hsl(330,100%,40%)',

                // circleRadius: { stops: [[10,3], [15, 10]] },
                circleRadius: ['interpolate',['linear'],['zoom'],
                    10, ['+',2, ['get','size']],
                    15, ['*',2, ['+',2, ['get','size']]]
                ],
                circleColor: requestColorExpr || '#333',
                circleOpacity: ['interpolate',['linear'],['zoom'],
                    11, ['match',['get','size'],
                        [5,4, 3], 1,
                        0],
                    12, 1
                ],
                // circleRadius: { stops: [[10,['get','size']], [15, 10]] },
                sourceLayer: 'grid',
                filter: ['==',['get','type'], 'town']
            });
            map.U.addSymbol('points-labels', 'points', {
                sourceLayer: 'grid',
                textField: '{name}',
                textSize: ['interpolate',['linear'], ['zoom'],
                    12, ['+', 4,['*',['get','size'], 6]],
                    16, ['+', 4,['*',['get','size'], 10]],
                ],
                textHaloColor: 'hsla(0,0%,100%,0.5)',
                textHaloWidth: 2,
                textAnchor:'left',
                textColor: requestColorExpr || '#333',
                textOffset: [0.5,0],
                textOpacity: ['interpolate',['linear'], ['zoom'],
                    9,0,
                    10, ['match',['get','size'],
                        [5,4], 1,
                        0],
                    11, ['match',['get','size'],
                        [2, 3,4,5], 1,
                        0],
                    12, ['match',['get','size'],
                        [2,3,4,5], 1,
                        0],
                    13, 1
                ],

                minzoom: 10,
                filter: ['==',['get','type'], 'town']

            });

            

            map.on('mousemove', e => {
                // FeatureInfo.
                // window.location.hash = `${e.lngLat.lng}`;
            });
            
            const flytime = 500*10;
            if (location.hash.match(/fly/)) {
                map.easeTo({
                    center: [map.getCenter().lng - 5, map.getCenter().lat + 1 ], 
                    duration: flytime*100, 
                    essential: true, 
                });

            }
        });
        if (window.location.hostname === 'localhost') {
            const interactives = ['points-circles', 'waters2']
            map.U.hoverPointer(interactives);
            map.U.clickLayer(interactives, (e,f) => {
                console.log(e.features[0].properties);
                // window.FeatureInfo.feature = e.features[0];
            });
        }
        
    }
}
import 'mapbox-gl/dist/mapbox-gl.css';

</script>

<style scoped>
</style>