<template lang="pug">
    #app.flex.flex-column.vh-100.avenir
        #top.bb.b--gray.bg-washed-yellow
            //- h1 Community Map
        #middle.flex.flex-auto
            #sidebar.br.b--light-gray.overflow-auto
                //- .b.i See the README for tips on customising.              
                FeatureInfo
            #map-container.relative.flex-auto
                Map
                #overlay.absolute
        #bottom.bt.b--light-gray.pl2
            p Procedurally generated map, created by 
                a(href="https://hire.stevebennett.me") Steve Bennett
                | . Read about it 
                a(href="https://stevebennett.me/2020/01/03/alternative-earth-procedurally-generated-map-using-vector-tiles/")| here
                | .
            //- .flex-none
</template>

<script>
import Map from './components/Map.vue'
import FeatureInfo from './components/FeatureInfo.vue'

export default {
    name: 'app',
    components: {
      Map,
      FeatureInfo
    }
}

require('tachyons/css/tachyons.min.css');
</script>

<style>
html, body {
  height: 100vh;
  width: 100%;
  margin:0;
  padding:0;
}

</style>
