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
            style: 'mapbox://styles/stevage/ck4tku4pb6j7v1cn7hni116zg/draft',

        });
        U.init(map, mapboxgl);
        map.showTileBoundaries = true;
        window.map = map;
        window.Map = this;

        map.U.onLoad(()=> {
            map.U.addVector('points', {
                tiles: ['http://localhost:3031/grid/{z}/{x}/{y}.pbf'],
                minzoom: 6,
                maxzoom: 9
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
                minzoom: 12,
                // circleRadius: { stops: [[10,['get','size']], [15, 10]] },
                sourceLayer: 'grid'
            });
            map.U.addSymbol('points-labels', 'points', {
                sourceLayer: 'grid',
                textField: '{name}',
                textSize: ['interpolate',['linear'], ['zoom'],
                    12, ['+', 4,['*',['get','size'], 6]],
                    16, ['+', 4,['*',['get','size'], 10]],
                ],
                textAnchor:'left',
                textColor: '#333',
                textOffset: [0.5,0],
                textOpacity: ['interpolate',['linear'], ['zoom'],
                    11,0,
                    12, ['match',['get','size'],
                        4, 1,
                        0],
                    13, ['match',['get','size'],
                        [3,4], 1,
                        0],
                    14, ['match',['get','size'],
                        [2,3,4], 1,
                        0],
                    15, 1
                ],

                minzoom: 10
            });


            map.on('mousemove', e => {
                // FeatureInfo.
                // window.location.hash = `${e.lngLat.lng}`;
            });
        });
        map.U.hoverPointer('points-circles');
        map.on('click', 'points-circles', e => {
            console.log(e);
            window.FeatureInfo.feature = e.features[0];
        });
        
    }
}
import 'mapbox-gl/dist/mapbox-gl.css';

</script>

<style scoped>
</style>