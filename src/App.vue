<template lang="pug">
    #app.flex.flex-column.vh-100.avenir
        #top.bb.b--gray.bg-washed-yellow
            //- h1 Community Map
        #middle.flex.flex-auto
            #sidebar.br.b--light-gray.overflow-auto.w5(v-show="false")
                //- .b.i See the README for tips on customising.              
                FeatureInfo
            #map-container.relative.flex-auto
                Map
                #overlay.absolute
        #bottom.bt.b--light-gray.flex-none
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
