(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{158:function(t,e,a){t.exports=a(237)},165:function(t,e,a){},215:function(t,e){},216:function(t,e){},217:function(t,e){},229:function(t,e,a){},231:function(t,e,a){},237:function(t,e,a){"use strict";a.r(e);var n=a(8),o=a.n(n),i=a(117),r=a.n(i),s=(a(163),a(165),a(68)),l=a(69),c=a(74),u=a(70),d=a(75),m=a(113),h=a(64),g=a(111),p=a.n(g),f=a(112),v=a(116),k=a(241),E=(a(229),window.innerHeight-85),b=window.innerWidth,w=function(t){function e(){var t,a;Object(s.a)(this,e);for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(a=Object(c.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(i)))).state={viewport:{width:b,height:E,latitude:41.4993,longitude:-81.6994,zoom:0,pitch:0,bearing:0},markerstart:{latitude:41.4993,longitude:-81.6994},marker:{latitude:41.4993,longitude:-81.6994},markerdest:{latitude:0,longitude:0},confirmshow:!1,haveDestination:!1,haveUsersLocation:!1,linelayerstuff:{id:"GeoJsonLayer",data:{type:"LineString",coordinates:[[0,0],[0,0]]},getLineWidth:12,getLineColor:[255,20,147]},directions:[],directionnum:0,intervalNum:0,tripdist:0,distances:[],coordinates:[]},a.mapRef=o.a.createRef(),a.setPosition=function(){navigator.geolocation.getCurrentPosition(function(t){a.setState({marker:{latitude:t.coords.latitude,longitude:t.coords.longitude},haveUsersLocation:!0});var e=t.coords.latitude,n=t.coords.longitude,o=a.state.coordinates[a.state.directionnum+1][1],i=a.state.coordinates[a.state.directionnum+1][0],r=Math.PI*e/180,s=Math.PI*o/180,l=n-i,c=Math.PI*l/180,u=Math.sin(r)*Math.sin(s)+Math.cos(r)*Math.cos(s)*Math.cos(c);if(u>1&&(u=1),u=60*(u=180*(u=Math.acos(u))/Math.PI)*1.1515,(u*=1.609344)<.05){var d=new SpeechSynthesisUtterance(a.state.directions[a.state.directionnum+1]);window.speechSynthesis.speak(d),a.setState({directionnum:a.state.directionnum+1})}},function(t){console.log(t)},{enableHighAccuracy:!0})},a.handleViewportChange=function(t){a.setState({viewport:Object(m.a)({},a.state.viewport,t)})},a.handleGeocoderViewportChange=function(t){},a.handleGeocoderViewportChange2=function(t){return a.handleViewportChange(Object(m.a)({},t,{transitionDuration:1700}))},a.lineWidth=function(t){return t>3082328?4e3:t>2e6?3e3:t>6e5?2e3:t>180770?1e3:t>81770?400:t>30770?300:t>10770?200:100},a.handleErrors=function(t){if(!t.ok)throw Error(t.statusText);return t},a.startFunction=function(t){a.setState({markerstart:{latitude:t.result.center[1],longitude:t.result.center[0]}})},a.resultFunction=function(t){a.setState({directionnum:0});var e=[[a.state.markerstart.longitude,a.state.markerstart.latitude]],n=[],o=[];fetch("https://api.mapbox.com/directions/v5/mapbox/driving/"+a.state.markerstart.longitude+","+a.state.markerstart.latitude+";"+t.result.center[0]+","+t.result.center[1]+"?steps=true&geometries=geojson&access_token=pk.eyJ1IjoiZnJleW04MjciLCJhIjoiY2pwdWpwYW9rMGhqYzQ4cXoxZWRlMGo5YSJ9.3MH5rhVEWOMgzRtpmmLJHA").then(a.handleErrors).then(function(i){i.json().then(function(i){if("NoRoute"!==i.code){for(var r=i.routes[0].geometry.coordinates,s=i.routes[0].legs[0].steps,l=0;l<r.length;l++)e.push(r[l]);for(var c=0;c<s.length;c++)n.push(s[c].maneuver.instruction),o.push(s[c].distance);a.setState({tripdist:i.routes[0].distance,distances:o,coordinates:e});var u=new v.a(a.state.viewport).fitBounds([[a.state.markerstart.longitude,a.state.markerstart.latitude],[t.result.center[0],t.result.center[1]]],{padding:30,offset:[-100,-100]});a.setState({viewport:{width:800,height:600,latitude:u.latitude,longitude:u.longitude,zoom:u.zoom,pitch:0,bearing:0,transitionDuration:1700},markerdest:{latitude:t.result.center[1],longitude:t.result.center[0]},confirmshow:!0,linelayerstuff:{id:"GeoJsonLayer",data:{type:"LineString",coordinates:e},getLineWidth:a.lineWidth(i.routes[0].distance),getLineColor:[255,20,147]},directions:n})}else console.log(i.code)})}).catch(function(t){console.log(t)})},a.confirmclick=function(){var t=setInterval(a.setPosition,1500);a.setState({viewport:{width:b,height:E,latitude:a.state.markerstart.latitude,longitude:a.state.markerstart.longitude,zoom:14,pitch:0,bearing:0,transitionDuration:1700},marker:{latitude:a.state.markerstart.latitude,longitude:a.state.markerstart.longitude},confirmshow:!1,haveDestination:!0,linelayerstuff:{id:"GeoJsonLayer",data:{type:"LineString",coordinates:a.state.linelayerstuff.data.coordinates},getLineWidth:80,getLineColor:[255,20,147]},intervalNum:t});var e=new SpeechSynthesisUtterance("Starting route directions..."+a.state.directions[0]+"then..."+a.state.directions[1]);window.speechSynthesis.speak(e)},a.endrouteclick=function(){navigator.geolocation.getCurrentPosition(function(t){a.setState({viewport:{width:b,height:E,latitude:t.coords.latitude,longitude:t.coords.longitude,zoom:14,pitch:0,bearing:0,transitionDuration:1700},marker:{latitude:t.coords.latitude,longitude:t.coords.longitude},markerstart:{latitude:t.coords.latitude,longitude:t.coords.longitude},linelayerstuff:{id:"GeoJsonLayer",data:{type:"LineString",coordinates:[[0,0],[0,0]]},getLineWidth:0,getLineColor:[255,20,147]},haveUsersLocation:!0,haveDestination:!1})},function(t){console.log(t)},{enableHighAccuracy:!0}),clearInterval(a.state.intervalNum)},a}return Object(d.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){var t=this;navigator.geolocation.getCurrentPosition(function(e){t.setState({viewport:{width:b,height:E,latitude:e.coords.latitude,longitude:e.coords.longitude,zoom:14,pitch:0,bearing:0},marker:{latitude:e.coords.latitude,longitude:e.coords.longitude},markerstart:{latitude:e.coords.latitude,longitude:e.coords.longitude},haveUsersLocation:!0})},function(t){console.log(t)},{enableHighAccuracy:!0})}},{key:"render",value:function(){var t=this;return o.a.createElement("div",null,o.a.createElement(h.default,Object.assign({ref:this.mapRef},this.state.viewport,{mapboxApiAccessToken:"pk.eyJ1IjoiZnJleW04MjciLCJhIjoiY2pwdWpwYW9rMGhqYzQ4cXoxZWRlMGo5YSJ9.3MH5rhVEWOMgzRtpmmLJHA",mapStyle:"mapbox://styles/mapbox/streets-v10",onViewportChange:function(e){t.setState({viewport:e})}}),o.a.createElement(f.b,Object.assign({},this.state.viewport,{layers:[new f.a(this.state.linelayerstuff)]})),o.a.createElement(h.Marker,{latitude:this.state.markerstart.latitude,longitude:this.state.markerstart.longitude,offsetLeft:-20,offsetTop:-30},o.a.createElement("img",{className:"truckimg",alt:"",src:"https://unixtitan.net/images/push-pin-clipart-transparent-background-5.png"})),this.state.haveDestination&&o.a.createElement(h.Marker,{latitude:this.state.marker.latitude,longitude:this.state.marker.longitude,offsetLeft:-25,offsetTop:-20},o.a.createElement("img",{className:"blip",alt:"",src:"https://i.imgur.com/ZUyRrkh.png"})),this.state.confirmshow&&o.a.createElement(h.Marker,{latitude:this.state.markerdest.latitude,longitude:this.state.markerdest.longitude,offsetLeft:-25,offsetTop:-10},o.a.createElement("img",{className:"treasureimg",alt:"",src:"https://pngimg.com/uploads/treasure_chest/treasure_chest_PNG154.png"})),this.state.haveDestination&&o.a.createElement(h.Marker,{latitude:this.state.markerdest.latitude,longitude:this.state.markerdest.longitude,offsetLeft:-25,offsetTop:-10},o.a.createElement("img",{className:"treasureimg",alt:"",src:"https://pngimg.com/uploads/treasure_chest/treasure_chest_PNG154.png"})),!this.state.haveDestination&&o.a.createElement(p.a,{mapRef:this.mapRef,onViewportChange:this.handleGeocoderViewportChange2,mapboxApiAccessToken:"pk.eyJ1IjoiZnJleW04MjciLCJhIjoiY2pwdWpwYW9rMGhqYzQ4cXoxZWRlMGo5YSJ9.3MH5rhVEWOMgzRtpmmLJHA",onResult:this.startFunction,placeholder:"Current location",position:"top-left"}),!this.state.haveDestination&&o.a.createElement(p.a,{mapRef:this.mapRef,onViewportChange:this.handleGeocoderViewportChange,mapboxApiAccessToken:"pk.eyJ1IjoiZnJleW04MjciLCJhIjoiY2pwdWpwYW9rMGhqYzQ4cXoxZWRlMGo5YSJ9.3MH5rhVEWOMgzRtpmmLJHA",onResult:this.resultFunction,placeholder:"Search destination"})),o.a.createElement("div",{className:"overmap"},this.state.haveDestination&&o.a.createElement("p",{className:"directionp"},"Directions:",o.a.createElement("br",null),this.state.directions[this.state.directionnum],o.a.createElement("br",null),"Then:",o.a.createElement("br",null),this.state.directions[this.state.directionnum+1]),this.state.confirmshow&&o.a.createElement(k.a,{id:"ConfirmBtn",onClick:this.confirmclick,className:"confirmbtn",color:"success"},"Go!"),this.state.haveDestination&&o.a.createElement(k.a,{id:"EndRouteBtn",onClick:this.endrouteclick,className:"endroutebtn",color:"danger"},"End Route")))}}]),e}(n.Component),y=(a(231),function(t){function e(t){var a;return Object(s.a)(this,e),(a=Object(c.a)(this,Object(u.a)(e).call(this,t))).state={expanded:!1},a}return Object(d.a)(e,t),Object(l.a)(e,[{key:"toggleBottom",value:function(){document.getElementById("expand").classList.toggle("openBottom"),document.getElementById("thing").classList.toggle("rotate"),document.getElementById("containers").classList.toggle("display")}},{key:"render",value:function(){var t=this;return o.a.createElement("div",{id:"expand",className:"bottomContainer"},o.a.createElement("div",{className:"outerContianer"},o.a.createElement("div",{className:"opening",onClick:function(){t.toggleBottom()}},o.a.createElement("i",{id:"thing",className:"fas fa-angle-up fa-3x"}),o.a.createElement("div",{className:"middle"},o.a.createElement("h3",null,"Book a Muber"),o.a.createElement("span",null,"Friends with trucks"))),o.a.createElement("div",{id:"containers",className:"bottomOuterContainer"},o.a.createElement("div",{className:"bottomInnercontainer"},o.a.createElement("div",null,o.a.createElement("button",{className:"bottomButton"},o.a.createElement("i",{className:"fas fa-truck-pickup"}),"Truck Only")),o.a.createElement("div",null,o.a.createElement("button",{className:"bottomButton"},o.a.createElement("i",{className:"fas fa-truck-pickup"}),"Truck with Help")),o.a.createElement("div",null,o.a.createElement("button",{className:"bottomButton"},o.a.createElement("i",{className:"fas fa-truck-pickup"}),"Future Move")),o.a.createElement("div",null,o.a.createElement("button",{className:"bottomButton"},o.a.createElement("span",{className:"bold"},"Small"),o.a.createElement("br",null),o.a.createElement("span",null,"< 250lbs."))),o.a.createElement("div",null,o.a.createElement("button",{className:"bottomButton"},o.a.createElement("span",{className:"bold"},"Medium"),o.a.createElement("br",null),o.a.createElement("span",null,"> 250lbs."))),o.a.createElement("div",null,o.a.createElement("button",{className:"bottomButton"},o.a.createElement("span",{className:"bold"},"Large"),o.a.createElement("br",null),o.a.createElement("span",null,"> 500lbs.")))))))}}]),e}(n.Component)),M=function(t){function e(){return Object(s.a)(this,e),Object(c.a)(this,Object(u.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement(w,null),o.a.createElement(y,null))}}]),e}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(233).config(),r.a.render(o.a.createElement(M,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[158,2,1]]]);
//# sourceMappingURL=main.b900f4ec.chunk.js.map