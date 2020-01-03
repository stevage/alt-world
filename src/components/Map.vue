<template lang="pug">
#map.absolute.absolute--fill
</template>

<script>
import mapboxgl from 'mapbox-gl';
import U from 'mapbox-gl-utils';

export default {
    async mounted() {
        // replace this Mapbox access token with your own
        mapboxgl.accessToken = 'pk.eyJ1Ijoic3RldmFnZSIsImEiOiJGcW03aExzIn0.QUkUmTGIO3gGt83HiRIjQw';
        const map = new mapboxgl.Map({
            container: 'map',
            // center: [144.96, -37.81],
            center: [145.213, -37.6203],
            zoom: 12.8,
            // style: 'mapbox://styles/stevage/ck4tku4pb6j7v1cn7hni116zg/draft?refresh=1',
            style: {
                version: 8,
                layers: [],
                sources: {},
                glyphs: 'mapbox://fonts/stevage/{fontstack}/{range}.pbf'
            },
            hash: true,
            minZoom: 11,
            maxZoom: 16

        });
        U.init(map, mapboxgl);
        // map.showTileBoundaries = true;
        window.map = map;
        window.Map = this;

        
        const env = {
            local: {
                tiles: ['http://localhost:3031/grid/{z}/{x}/{y}.pbf']
            },
            glitch: {
                tiles: ['https://procmap.glitch.me/grid/{z}/{x}/{y}.pbf']
            }
        }[window.location.hostname === 'localhost' ? 'local' : 'glitch'];

        map.U.onLoad(()=> {

            map.U.addVector('points', {
                tiles: env.tiles,
                minzoom: 6,
                maxzoom: 13 // 9
            });

            map.U.addLine('forests-outline', 'points', {
                sourceLayer: 'grid',
                lineColor: 'hsl(90,70%,40%)',
                lineWidth: 3,
                lineJoin: 'round',
                filter: ['==', ['get','type'], 'forest']
            });
            map.U.addFill('forests', 'points', {
                sourceLayer: 'grid',
                fillColor: 'hsl(90,70%,80%)',
                // fillOutlineColor: 'hsl(90,70%,40%)',
                filter: ['==', ['get','type'], 'forest']
            });
            map.U.addFill('forests2', 'points', {
                sourceLayer: 'grid',
                fillColor: 'hsl(90,50%,50%)',
                filter: ['==', ['get','type'], 'forest2']
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

            map.U.addLine('road-borders', 'points', {
                sourceLayer: 'grid',
                lineColor: ['interpolate',['linear'], ['zoom'],
                    11, ['match',['get','maxsize'],
                        1, 'hsl(30,0%,80%)',
                        'hsl(30,0%,50%)'],
                    12, 'hsl(30,0%,50%)'
                ],
                lineJoin: 'round',
                lineWidth: ['interpolate',['linear'],['zoom'],
                    10, ['*', 1, ['get','maxsize']],
                    11, ['+', 0, ['*', 1, ['get','maxsize']]],
                    13, ['+', 2, ['*', 2, ['get','maxsize']]],
                ],
                lineOpacity: roadOpacity,
                filter: ['==',['get','type'], 'road'],

            });
            map.U.addLine('roads', 'points', {
                sourceLayer: 'grid',
                lineColor: 'hsl(30,50%,80%)',
                lineJoin: 'round',
                lineWidth: ['interpolate',['linear'],['zoom'],
                    11, ['-',['*', 1, ['get','maxsize']], 1],
                    13, ['*', 2, ['get','maxsize']],
                ],
                lineOpacity: roadOpacity,
                filter: ['==',['get','type'], 'road'],

            });


            map.U.addCircle('points-circles', 'points', {
                // circleColor: ['get', 'marker-color'],
                // circleColor: 'hsl(330,100%,40%)',

                // circleRadius: { stops: [[10,3], [15, 10]] },
                circleRadius: ['interpolate',['linear'],['zoom'],
                    10, ['+',2, ['get','size']],
                    15, ['*',2, ['+',2, ['get','size']]]
                ],
                circleColor: '#333',
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
                textColor: '#333',
                textOffset: [0.5,0],
                textOpacity: ['interpolate',['linear'], ['zoom'],
                    9,0,
                    10, ['match',['get','size'],
                        [5,4], 1,
                        0],
                    11, ['match',['get','size'],
                        [3,4,5], 1,
                        0],
                    12, ['match',['get','size'],
                        [2,3,4,5], 1,
                        0],
                    13, 1
                ],

                minzoom: 10,
                filter: ['==',['get','type'], 'town']

            });

            map.U.addLine('waters-outline', 'points', {
                sourceLayer: 'grid',
                lineColor: 'hsl(220,90%,90%)',
                lineWidth: 5,
                filter: ['==', ['get','type'], 'water2']
            });

            map.U.addFill('beach', 'points', {
                sourceLayer: 'grid',
                fillColor: 'hsl(50,80%,75%)',
                filter: ['==', ['get','type'], 'water']
            });
            map.U.addFill('waters2', 'points', {
                sourceLayer: 'grid',
                fillColor: 'hsl(220,70%,70%)',
                filter: ['==', ['get','type'], 'water2']
            });
            map.U.addFill('waters3', 'points', {
                sourceLayer: 'grid',
                fillColor: 'hsl(220,70%,60%)',
                filter: ['==', ['get','type'], 'water3']
            });

            map.on('mousemove', e => {
                // FeatureInfo.
                // window.location.hash = `${e.lngLat.lng}`;
            });
        });
        // map.U.hoverPointer('points-circles');
        // map.on('click', 'points-circles', e => {
        //     console.log(e);
        //     window.FeatureInfo.feature = e.features[0];
        // });
        
    }
}
import 'mapbox-gl/dist/mapbox-gl.css';

</script>

<style scoped>
</style>