(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{159:function(t,e,n){t.exports=n(235)},166:function(t,e,n){},215:function(t,e){},216:function(t,e){},217:function(t,e){},229:function(t,e,n){},235:function(t,e,n){"use strict";n.r(e);var o=n(12),a=n.n(o),i=n(119),r=n.n(i),s=(n(164),n(166),n(81)),c=n(82),l=n(91),u=n(83),d=n(94),h=n(98),g=n(66),m=n(102),f=n.n(m),p=n(103),k=n(92),v=n(239),w=(n(229),window.innerHeight),b=window.innerWidth,y=function(t){function e(){var t,n;Object(s.a)(this,e);for(var o=arguments.length,i=new Array(o),r=0;r<o;r++)i[r]=arguments[r];return(n=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(i)))).state={viewport:{width:b,height:w,latitude:41.4993,longitude:-81.6994,zoom:0,pitch:0,bearing:0},markerstart:{latitude:41.4993,longitude:-81.6994},marker:{latitude:41.4993,longitude:-81.6994},markerdest:{latitude:0,longitude:0},confirmshow:!1,haveDestination:!1,haveUsersLocation:!1,linelayerstuff:{id:"GeoJsonLayer",data:{type:"LineString",coordinates:[[0,0],[0,0]]},getLineWidth:12,getLineColor:[255,20,147]},directions:[],directionnum:0,intervalNum:0,tripdist:0},n.mapRef=a.a.createRef(),n.setPosition=function(){console.log("hello");navigator.geolocation.getCurrentPosition(function(t){n.setState({marker:{latitude:t.coords.latitude,longitude:t.coords.longitude},haveUsersLocation:!0})},function(t){console.log(t)},{enableHighAccuracy:!0})},n.handleViewportChange=function(t){n.setState({viewport:Object(h.a)({},n.state.viewport,t)})},n.handleGeocoderViewportChange=function(t){},n.handleGeocoderViewportChange2=function(t){return n.handleViewportChange(Object(h.a)({},t,{transitionDuration:1700}))},n.lineWidth=function(t){return t>3082328?4e3:t>2e6?3e3:t>6e5?2e3:t>180770?1e3:t>81770?400:t>30770?300:t>10770?200:100},n.handleErrors=function(t){if(!t.ok)throw Error(t.statusText);return t},n.startFunction=function(t){n.setState({markerstart:{latitude:t.result.center[1],longitude:t.result.center[0]}})},n.resultFunction=function(t){var e=[[n.state.markerstart.longitude,n.state.markerstart.latitude]],o=[],a=[];fetch("https://api.mapbox.com/directions/v5/mapbox/driving/"+n.state.markerstart.longitude+","+n.state.markerstart.latitude+";"+t.result.center[0]+","+t.result.center[1]+"?steps=true&geometries=geojson&access_token=pk.eyJ1IjoiZnJleW04MjciLCJhIjoiY2pwdWpwYW9rMGhqYzQ4cXoxZWRlMGo5YSJ9.3MH5rhVEWOMgzRtpmmLJHA").then(n.handleErrors).then(function(i){i.json().then(function(i){if("NoRoute"!==i.code){for(var r=i.routes[0].geometry.coordinates,s=i.routes[0].legs[0].steps,c=0;c<r.length;c++)e.push(r[c]);for(var l=0;l<s.length;l++)o.push(s[l].maneuver.instruction),a.push(s[l].distance);n.setState({tripdist:i.routes[0].distance,distances:a}),console.log(n.state.tripdist),console.log(n.state.distances);var u=new k.a(n.state.viewport).fitBounds([[n.state.markerstart.longitude,n.state.markerstart.latitude],[t.result.center[0],t.result.center[1]]],{padding:30,offset:[-100,-100]});n.setState({viewport:{width:800,height:600,latitude:u.latitude,longitude:u.longitude,zoom:u.zoom,pitch:0,bearing:0,transitionDuration:1700},markerdest:{latitude:t.result.center[1],longitude:t.result.center[0]},confirmshow:!0,linelayerstuff:{id:"GeoJsonLayer",data:{type:"LineString",coordinates:e},getLineWidth:n.lineWidth(i.routes[0].distance),getLineColor:[255,20,147]},directions:o})}else console.log(i.code)})}).catch(function(t){console.log(t)})},n.confirmclick=function(){var t=setInterval(n.setPosition,2e3);n.setState({viewport:{width:800,height:600,latitude:n.state.markerstart.latitude,longitude:n.state.markerstart.longitude,zoom:14,pitch:0,bearing:0,transitionDuration:1700},confirmshow:!1,haveDestination:!0,linelayerstuff:{id:"GeoJsonLayer",data:{type:"LineString",coordinates:n.state.linelayerstuff.data.coordinates},getLineWidth:80,getLineColor:[255,20,147]},intervalNum:t})},n.endrouteclick=function(){navigator.geolocation.getCurrentPosition(function(t){n.setState({viewport:{width:b,height:w,latitude:t.coords.latitude,longitude:t.coords.longitude,zoom:14,pitch:0,bearing:0,transitionDuration:1700},marker:{latitude:t.coords.latitude,longitude:t.coords.longitude},markerstart:{latitude:t.coords.latitude,longitude:t.coords.longitude},linelayerstuff:{id:"GeoJsonLayer",data:{type:"LineString",coordinates:[[0,0],[0,0]]},getLineWidth:0,getLineColor:[255,20,147]},haveUsersLocation:!0,haveDestination:!1})},function(t){console.log(t)},{enableHighAccuracy:!0}),clearInterval(n.state.intervalNum)},n}return Object(d.a)(e,t),Object(c.a)(e,[{key:"componentDidMount",value:function(){var t=this;navigator.geolocation.getCurrentPosition(function(e){t.setState({viewport:{width:b,height:w,latitude:e.coords.latitude,longitude:e.coords.longitude,zoom:14,pitch:0,bearing:0},marker:{latitude:e.coords.latitude,longitude:e.coords.longitude},markerstart:{latitude:e.coords.latitude,longitude:e.coords.longitude},haveUsersLocation:!0})},function(t){console.log(t)},{enableHighAccuracy:!0})}},{key:"render",value:function(){var t=this;return a.a.createElement("div",null,a.a.createElement(g.default,Object.assign({ref:this.mapRef},this.state.viewport,{mapboxApiAccessToken:"pk.eyJ1IjoiZnJleW04MjciLCJhIjoiY2pwdWpwYW9rMGhqYzQ4cXoxZWRlMGo5YSJ9.3MH5rhVEWOMgzRtpmmLJHA",mapStyle:"mapbox://styles/mapbox/streets-v10",onViewportChange:function(e){t.setState({viewport:e})}}),a.a.createElement(p.b,Object.assign({},this.state.viewport,{layers:[new p.a(this.state.linelayerstuff)]})),a.a.createElement(g.Marker,{latitude:this.state.markerstart.latitude,longitude:this.state.markerstart.longitude,offsetLeft:-20,offsetTop:-30},a.a.createElement("img",{className:"truckimg",alt:"",src:"https://unixtitan.net/images/push-pin-clipart-transparent-background-5.png"})),this.state.haveDestination&&a.a.createElement(g.Marker,{latitude:this.state.marker.latitude,longitude:this.state.marker.longitude,offsetLeft:-25,offsetTop:-20},a.a.createElement("img",{className:"blip",alt:"",src:"https://i.imgur.com/ZUyRrkh.png"})),this.state.confirmshow&&a.a.createElement(g.Marker,{latitude:this.state.markerdest.latitude,longitude:this.state.markerdest.longitude,offsetLeft:-25,offsetTop:-10},a.a.createElement("img",{className:"treasureimg",alt:"",src:"https://pngimg.com/uploads/treasure_chest/treasure_chest_PNG154.png"})),this.state.haveDestination&&a.a.createElement(g.Marker,{latitude:this.state.markerdest.latitude,longitude:this.state.markerdest.longitude,offsetLeft:-25,offsetTop:-10},a.a.createElement("img",{className:"treasureimg",alt:"",src:"https://pngimg.com/uploads/treasure_chest/treasure_chest_PNG154.png"})),!this.state.haveDestination&&a.a.createElement(f.a,{mapRef:this.mapRef,onViewportChange:this.handleGeocoderViewportChange2,mapboxApiAccessToken:"pk.eyJ1IjoiZnJleW04MjciLCJhIjoiY2pwdWpwYW9rMGhqYzQ4cXoxZWRlMGo5YSJ9.3MH5rhVEWOMgzRtpmmLJHA",onResult:this.startFunction,placeholder:"Current location",position:"top-left"}),!this.state.haveDestination&&a.a.createElement(f.a,{mapRef:this.mapRef,onViewportChange:this.handleGeocoderViewportChange,mapboxApiAccessToken:"pk.eyJ1IjoiZnJleW04MjciLCJhIjoiY2pwdWpwYW9rMGhqYzQ4cXoxZWRlMGo5YSJ9.3MH5rhVEWOMgzRtpmmLJHA",onResult:this.resultFunction,placeholder:"Search destination"})),a.a.createElement("div",{className:"overmap"},this.state.haveDestination&&a.a.createElement("p",{className:"directionp"},"Directions:",a.a.createElement("br",null),this.state.directions[this.state.directionnum]),this.state.confirmshow&&a.a.createElement(v.a,{id:"ConfirmBtn",onClick:this.confirmclick,className:"confirmbtn",color:"success"},"Go!"),this.state.haveDestination&&a.a.createElement(v.a,{id:"EndRouteBtn",onClick:this.endrouteclick,className:"endroutebtn",color:"danger"},"End Route")))}}]),e}(o.Component),L=function(t){function e(){return Object(s.a)(this,e),Object(l.a)(this,Object(u.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement(y,null))}}]),e}(a.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(231).config(),r.a.render(a.a.createElement(L,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[159,2,1]]]);
//# sourceMappingURL=main.0d9dee75.chunk.js.map