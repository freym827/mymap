(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{158:function(e,t,a){e.exports=a(237)},165:function(e,t,a){},215:function(e,t){},216:function(e,t){},217:function(e,t){},229:function(e,t,a){},231:function(e,t,a){},237:function(e,t,a){"use strict";a.r(t);var n=a(8),o=a.n(n),i=a(117),r=a.n(i),s=(a(163),a(165),a(68)),c=a(69),l=a(74),u=a(70),m=a(75),d=a(113),h=a(64),g=a(111),p=a.n(g),f=a(112),v=a(116),k=a(241),E=(a(229),window.innerHeight-85),b=window.innerWidth,w=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(i)))).state={viewport:{width:b,height:E,latitude:41.4993,longitude:-81.6994,zoom:0,pitch:0,bearing:0},markerstart:{latitude:41.4993,longitude:-81.6994},marker:{latitude:41.4993,longitude:-81.6994},markerdest:{latitude:0,longitude:0},confirmshow:!1,haveDestination:!1,haveUsersLocation:!1,linelayerstuff:{id:"GeoJsonLayer",data:{type:"LineString",coordinates:[[0,0],[0,0]]},getLineWidth:12,getLineColor:[255,20,147]},directions:[],directionnum:0,intervalNum:0,tripdist:0,distances:[],coordinates:[],mileswitch:!0},a.mapRef=o.a.createRef(),a.setPosition=function(){navigator.geolocation.getCurrentPosition(function(e){a.setState({marker:{latitude:e.coords.latitude,longitude:e.coords.longitude},haveUsersLocation:!0});var t=e.coords.latitude,n=e.coords.longitude,o=a.state.coordinates[a.state.directionnum+1][1],i=a.state.coordinates[a.state.directionnum+1][0],r=Math.PI*t/180,s=Math.PI*o/180,c=n-i,l=Math.PI*c/180,u=Math.sin(r)*Math.sin(s)+Math.cos(r)*Math.cos(s)*Math.cos(l);if(u>1&&(u=1),u=60*(u=180*(u=Math.acos(u))/Math.PI)*1.1515,(u*=1.609344)<1.7&&a.state.distances[a.state.directionnum]>2500&&a.state.mileswitch){var m=new SpeechSynthesisUtterance("In 1 mile..."+a.state.directions[a.state.directionnum+1]);window.speechSynthesis.speak(m),a.setState({mileswitch:!1})}if(u<.05){var d=new SpeechSynthesisUtterance(a.state.directions[a.state.directionnum+1]);window.speechSynthesis.speak(d),a.setState({directionnum:a.state.directionnum+1,mileswitch:!0})}},function(e){console.log(e)},{enableHighAccuracy:!0})},a.handleViewportChange=function(e){a.setState({viewport:Object(d.a)({},a.state.viewport,e)})},a.handleGeocoderViewportChange=function(e){},a.handleGeocoderViewportChange2=function(e){return a.handleViewportChange(Object(d.a)({},e,{transitionDuration:1700}))},a.lineWidth=function(e){return e>3082328?4e3:e>2e6?3e3:e>6e5?2e3:e>180770?1e3:e>81770?400:e>30770?300:e>10770?200:100},a.handleErrors=function(e){if(!e.ok)throw Error(e.statusText);return e},a.startFunction=function(e){a.setState({markerstart:{latitude:e.result.center[1],longitude:e.result.center[0]}})},a.resultFunction=function(e){a.setState({directionnum:0});var t=[[a.state.markerstart.longitude,a.state.markerstart.latitude]],n=[],o=[];fetch("https://api.mapbox.com/directions/v5/mapbox/driving/"+a.state.markerstart.longitude+","+a.state.markerstart.latitude+";"+e.result.center[0]+","+e.result.center[1]+"?steps=true&geometries=geojson&access_token=pk.eyJ1IjoiZnJleW04MjciLCJhIjoiY2pwdWpwYW9rMGhqYzQ4cXoxZWRlMGo5YSJ9.3MH5rhVEWOMgzRtpmmLJHA").then(a.handleErrors).then(function(i){i.json().then(function(i){if("NoRoute"!==i.code){for(var r=i.routes[0].geometry.coordinates,s=i.routes[0].legs[0].steps,c=0;c<r.length;c++)t.push(r[c]);for(var l=0;l<s.length;l++)n.push(s[l].maneuver.instruction),o.push(s[l].distance);a.setState({tripdist:i.routes[0].distance,distances:o,coordinates:t}),console.log(o);var u=new v.a(a.state.viewport).fitBounds([[a.state.markerstart.longitude,a.state.markerstart.latitude],[e.result.center[0],e.result.center[1]]],{padding:30,offset:[-100,-100]});a.setState({viewport:{width:800,height:600,latitude:u.latitude,longitude:u.longitude,zoom:u.zoom,pitch:0,bearing:0,transitionDuration:1700},markerdest:{latitude:e.result.center[1],longitude:e.result.center[0]},confirmshow:!0,linelayerstuff:{id:"GeoJsonLayer",data:{type:"LineString",coordinates:t},getLineWidth:a.lineWidth(i.routes[0].distance),getLineColor:[255,20,147]},directions:n})}else console.log(i.code)})}).catch(function(e){console.log(e)})},a.confirmclick=function(){var e=setInterval(a.setPosition,1500);a.setState({viewport:{width:b,height:E,latitude:a.state.markerstart.latitude,longitude:a.state.markerstart.longitude,zoom:14,pitch:0,bearing:0,transitionDuration:1700},marker:{latitude:a.state.markerstart.latitude,longitude:a.state.markerstart.longitude},confirmshow:!1,haveDestination:!0,linelayerstuff:{id:"GeoJsonLayer",data:{type:"LineString",coordinates:a.state.linelayerstuff.data.coordinates},getLineWidth:80,getLineColor:[255,20,147]},intervalNum:e});var t=new SpeechSynthesisUtterance("Starting route directions..."+a.state.directions[0]+"...then..."+a.state.directions[1]);window.speechSynthesis.speak(t)},a.endrouteclick=function(){navigator.geolocation.getCurrentPosition(function(e){a.setState({viewport:{width:b,height:E,latitude:e.coords.latitude,longitude:e.coords.longitude,zoom:14,pitch:0,bearing:0,transitionDuration:1700},marker:{latitude:e.coords.latitude,longitude:e.coords.longitude},markerstart:{latitude:e.coords.latitude,longitude:e.coords.longitude},linelayerstuff:{id:"GeoJsonLayer",data:{type:"LineString",coordinates:[[0,0],[0,0]]},getLineWidth:0,getLineColor:[255,20,147]},haveUsersLocation:!0,haveDestination:!1})},function(e){console.log(e)},{enableHighAccuracy:!0}),clearInterval(a.state.intervalNum)},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;navigator.geolocation.getCurrentPosition(function(t){e.setState({viewport:{width:b,height:E,latitude:t.coords.latitude,longitude:t.coords.longitude,zoom:14,pitch:0,bearing:0},marker:{latitude:t.coords.latitude,longitude:t.coords.longitude},markerstart:{latitude:t.coords.latitude,longitude:t.coords.longitude},haveUsersLocation:!0})},function(e){console.log(e)},{enableHighAccuracy:!0})}},{key:"render",value:function(){var e=this;return o.a.createElement("div",null,o.a.createElement(h.default,Object.assign({ref:this.mapRef},this.state.viewport,{mapboxApiAccessToken:"pk.eyJ1IjoiZnJleW04MjciLCJhIjoiY2pwdWpwYW9rMGhqYzQ4cXoxZWRlMGo5YSJ9.3MH5rhVEWOMgzRtpmmLJHA",mapStyle:"mapbox://styles/mapbox/streets-v10",onViewportChange:function(t){e.setState({viewport:t})}}),o.a.createElement(f.b,Object.assign({},this.state.viewport,{layers:[new f.a(this.state.linelayerstuff)]})),o.a.createElement(h.Marker,{latitude:this.state.markerstart.latitude,longitude:this.state.markerstart.longitude,offsetLeft:-20,offsetTop:-30},o.a.createElement("img",{className:"truckimg",alt:"",src:"https://unixtitan.net/images/push-pin-clipart-transparent-background-5.png"})),this.state.haveDestination&&o.a.createElement(h.Marker,{latitude:this.state.marker.latitude,longitude:this.state.marker.longitude,offsetLeft:-25,offsetTop:-20},o.a.createElement("img",{className:"blip",alt:"",src:"https://i.imgur.com/ZUyRrkh.png"})),this.state.confirmshow&&o.a.createElement(h.Marker,{latitude:this.state.markerdest.latitude,longitude:this.state.markerdest.longitude,offsetLeft:-25,offsetTop:-10},o.a.createElement("img",{className:"treasureimg",alt:"",src:"https://pngimg.com/uploads/treasure_chest/treasure_chest_PNG154.png"})),this.state.haveDestination&&o.a.createElement(h.Marker,{latitude:this.state.markerdest.latitude,longitude:this.state.markerdest.longitude,offsetLeft:-25,offsetTop:-10},o.a.createElement("img",{className:"treasureimg",alt:"",src:"https://pngimg.com/uploads/treasure_chest/treasure_chest_PNG154.png"})),!this.state.haveDestination&&o.a.createElement(p.a,{mapRef:this.mapRef,onViewportChange:this.handleGeocoderViewportChange2,mapboxApiAccessToken:"pk.eyJ1IjoiZnJleW04MjciLCJhIjoiY2pwdWpwYW9rMGhqYzQ4cXoxZWRlMGo5YSJ9.3MH5rhVEWOMgzRtpmmLJHA",onResult:this.startFunction,placeholder:"Current location",position:"top-left"}),!this.state.haveDestination&&o.a.createElement(p.a,{mapRef:this.mapRef,onViewportChange:this.handleGeocoderViewportChange,mapboxApiAccessToken:"pk.eyJ1IjoiZnJleW04MjciLCJhIjoiY2pwdWpwYW9rMGhqYzQ4cXoxZWRlMGo5YSJ9.3MH5rhVEWOMgzRtpmmLJHA",onResult:this.resultFunction,placeholder:"Search destination"})),o.a.createElement("div",{className:"overmap"},this.state.haveDestination&&o.a.createElement("p",{className:"directionp"},"Directions:",o.a.createElement("br",null),this.state.directions[this.state.directionnum],o.a.createElement("br",null),"Then:",o.a.createElement("br",null),this.state.directions[this.state.directionnum+1]),this.state.confirmshow&&o.a.createElement(k.a,{id:"ConfirmBtn",onClick:this.confirmclick,className:"confirmbtn",color:"success"},"Go!"),this.state.haveDestination&&o.a.createElement(k.a,{id:"EndRouteBtn",onClick:this.endrouteclick,className:"endroutebtn",color:"danger"},"End Route")))}}]),t}(n.Component),y=(a(231),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={expanded:!1},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"toggleBottom",value:function(){document.getElementById("expand").classList.toggle("openBottom"),document.getElementById("thing").classList.toggle("rotate"),document.getElementById("containers").classList.toggle("display")}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{id:"expand",className:"bottomContainer"},o.a.createElement("div",{className:"outerContianer"},o.a.createElement("div",{className:"opening",onClick:function(){e.toggleBottom()}},o.a.createElement("i",{id:"thing",className:"fas fa-angle-up fa-3x"}),o.a.createElement("div",{className:"middle"},o.a.createElement("h3",null,"Book a Muber"),o.a.createElement("span",null,"Friends with trucks"))),o.a.createElement("div",{id:"containers",className:"bottomOuterContainer"},o.a.createElement("div",{className:"bottomInnercontainer"},o.a.createElement("div",null,o.a.createElement("button",{className:"bottomButton"},o.a.createElement("i",{className:"fas fa-truck-pickup"}),"Truck Only")),o.a.createElement("div",null,o.a.createElement("button",{className:"bottomButton"},o.a.createElement("i",{className:"fas fa-truck-pickup"}),"Truck with Help")),o.a.createElement("div",null,o.a.createElement("button",{className:"bottomButton"},o.a.createElement("i",{className:"fas fa-truck-pickup"}),"Future Move")),o.a.createElement("div",null,o.a.createElement("button",{className:"bottomButton"},o.a.createElement("span",{className:"bold"},"Small"),o.a.createElement("br",null),o.a.createElement("span",null,"< 250lbs."))),o.a.createElement("div",null,o.a.createElement("button",{className:"bottomButton"},o.a.createElement("span",{className:"bold"},"Medium"),o.a.createElement("br",null),o.a.createElement("span",null,"> 250lbs."))),o.a.createElement("div",null,o.a.createElement("button",{className:"bottomButton"},o.a.createElement("span",{className:"bold"},"Large"),o.a.createElement("br",null),o.a.createElement("span",null,"> 500lbs.")))))))}}]),t}(n.Component)),M=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement(w,null),o.a.createElement(y,null))}}]),t}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(233).config(),r.a.render(o.a.createElement(M,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[158,2,1]]]);
//# sourceMappingURL=main.5a54199f.chunk.js.map