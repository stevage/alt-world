(function(e){function t(t){for(var i,a,s=t[0],l=t[1],c=t[2],f=0,d=[];f<s.length;f++)a=s[f],o[a]&&d.push(o[a][0]),o[a]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(e[i]=l[i]);u&&u(t);while(d.length)d.shift()();return n.push.apply(n,c||[]),r()}function r(){for(var e,t=0;t<n.length;t++){for(var r=n[t],i=!0,s=1;s<r.length;s++){var l=r[s];0!==o[l]&&(i=!1)}i&&(n.splice(t--,1),e=a(a.s=r[0]))}return e}var i={},o={app:0},n=[];function a(t){if(i[t])return i[t].exports;var r=i[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=i,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(r,i,function(t){return e[t]}.bind(null,i));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var u=l;n.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";var i=r("64a9"),o=r.n(i);o.a},"1c6c":function(e,t,r){"use strict";var i=r("f970"),o=r.n(i);o.a},"56d7":function(e,t,r){"use strict";r.r(t);r("cadf"),r("551c"),r("097d");var i=r("2b0e"),o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"flex flex-column vh-100 avenir",attrs:{id:"app"}},[r("div",{staticClass:"bb b--gray bg-washed-yellow",attrs:{id:"top"}}),r("div",{staticClass:"flex flex-auto",attrs:{id:"middle"}},[r("div",{staticClass:"br b--light-gray overflow-auto",attrs:{id:"sidebar"}},[r("FeatureInfo")],1),r("div",{staticClass:"relative flex-auto",attrs:{id:"map-container"}},[r("Map"),r("div",{staticClass:"absolute",attrs:{id:"overlay"}})],1)]),r("div",{staticClass:"bt b--light-gray flex-none",attrs:{id:"bottom"}})])},n=[],a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"absolute absolute--fill",attrs:{id:"map"}})},s=[],l=(r("96cf"),r("3b8d")),c=r("e192"),u=r.n(c),f=r("8936"),d=r.n(f),p=(r("ac6d"),{mounted:function(){var e=Object(l["a"])(regeneratorRuntime.mark(function e(){var t,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:u.a.accessToken="pk.eyJ1Ijoic3RldmFnZSIsImEiOiJGcW03aExzIn0.QUkUmTGIO3gGt83HiRIjQw",t=new u.a.Map({container:"map",center:[145.213,-37.6203],zoom:12.8,style:{version:8,layers:[],sources:{},glyphs:"mapbox://fonts/stevage/{fontstack}/{range}.pbf"},hash:!0,minZoom:10,maxZoom:16}),d.a.init(t,u.a),window.map=t,window.Map=this,r={local:{tiles:["http://localhost:3031/grid/{z}/{x}/{y}.pbf"]},glitch:{tiles:["https://procmap.glitch.me/grid/{z}/{x}/{y}.pbf"]}}["localhost"===window.location.hostname?"local":"glitch"],t.U.onLoad(function(){t.U.addVector("points",{tiles:r.tiles,minzoom:6,maxzoom:14}),t.U.addLine("forests-outline","points",{sourceLayer:"grid",lineColor:"hsl(90,70%,40%)",lineWidth:4,lineJoin:"round",filter:["==",["get","type"],"forest"]}),t.U.addFill("forests","points",{sourceLayer:"grid",fillColor:"hsl(90,70%,80%)",filter:["==",["get","type"],"forest"]}),t.U.addFill("forests2","points",{sourceLayer:"grid",fillColor:"hsl(90,50%,50%)",filter:["==",["get","type"],"forest2"]});var e=["interpolate",["linear"],["zoom"],10,["match",["get","maxsize"],[6,5,4,3],1,0],11,["match",["get","maxsize"],[6,5,4,3,2],1,0],12,["match",["get","maxsize"],[6,5,4,3,2,1],1,0],13,1];t.U.addLine("road-borders","points",{sourceLayer:"grid",lineColor:"hsl(30,0%,50%)",lineJoin:"round",lineWidth:["interpolate",["linear"],["zoom"],10,["+",2,["*",1,["get","maxsize"]]],13,["+",2,["*",2,["get","maxsize"]]]],lineOpacity:e,filter:["==",["get","type"],"road"]}),t.U.addLine("roads","points",{sourceLayer:"grid",lineColor:"hsl(30,50%,80%)",lineJoin:"round",lineWidth:["interpolate",["linear"],["zoom"],10,["*",1,["get","maxsize"]],13,["*",2,["get","maxsize"]]],lineOpacity:e,filter:["==",["get","type"],"road"]}),t.U.addCircle("points-circles","points",{circleRadius:["interpolate",["linear"],["zoom"],10,["+",2,["get","size"]],15,["*",2,["+",2,["get","size"]]]],circleColor:"#333",minzoom:12,sourceLayer:"grid",filter:["==",["get","type"],"town"]}),t.U.addSymbol("points-labels","points",{sourceLayer:"grid",textField:"{name}",textSize:["interpolate",["linear"],["zoom"],12,["+",4,["*",["get","size"],6]],16,["+",4,["*",["get","size"],10]]],textAnchor:"left",textColor:"#333",textOffset:[.5,0],textOpacity:["interpolate",["linear"],["zoom"],9,0,10,["match",["get","size"],[5,4],1,0],11,["match",["get","size"],[3,4,5],1,0],12,["match",["get","size"],[2,3,4,5],1,0],13,1],minzoom:10,filter:["==",["get","type"],"town"]}),t.U.addLine("waters-outline","points",{sourceLayer:"grid",lineColor:"hsl(220,70%,90%)",lineWidth:3,filter:["==",["get","type"],"water"]}),t.U.addFill("waters","points",{sourceLayer:"grid",fillColor:"hsl(220,70%,60%)",filter:["==",["get","type"],"water"]}),t.on("mousemove",function(e){})}),t.U.hoverPointer("points-circles"),t.on("click","points-circles",function(e){console.log(e),window.FeatureInfo.feature=e.features[0]});case 9:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()}),g=p,m=r("2877"),h=Object(m["a"])(g,a,s,!1,null,"e75e5934",null);h.options.__file="Map.vue";var v=h.exports,y=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.imageUrl?r("img",{staticClass:"image",attrs:{src:e.imageUrl}}):e._e(),r("div",{staticClass:"f5"},[e._v(e._s(e.lng))]),r("div",{staticClass:"f5"},[e._v(e._s(e.lat))]),e.feature?r("table",{staticClass:"bg-white b--gray ba helvetica ma1",attrs:{id:"FeatureInfo"}},e._l(e.feature.properties,function(t,i){return r("tr",[-1===e.ignoreProps.indexOf(i)?[r("th",{staticClass:"f6"},[e._v(e._s(i))]),r("td",{staticClass:"f6"},[e._v(e._s(t))])]:e._e()],2)}),0):e._e()])},b=[],x={name:"FeatureInfo",data:function(){return{feature:void 0,ignoreProps:["id","Longitude","Latitude","image_url"]}},computed:{imageUrl:function(){return this.feature&&this.feature.properties.image_url},lng:function(){return this.feature&&this.feature.geometry.coordinates[0]},lat:function(){return this.feature&&this.feature.geometry.coordinates[1]}},created:function(){window.FeatureInfo=this}},w=x,_=(r("1c6c"),Object(m["a"])(w,y,b,!1,null,"2f0e22a2",null));_.options.__file="FeatureInfo.vue";var z=_.exports,C={name:"app",components:{Map:v,FeatureInfo:z}};r("948e");var O=C,U=(r("034f"),Object(m["a"])(O,o,n,!1,null,null,null));U.options.__file="App.vue";var L=U.exports;i["a"].config.productionTip=!1,new i["a"]({render:function(e){return e(L)}}).$mount("#app")},"64a9":function(e,t,r){},f970:function(e,t,r){}});
//# sourceMappingURL=app.0c255fcd.js.map