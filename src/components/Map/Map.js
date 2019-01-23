import React, { Component}  from 'react';
import MapGL, { Marker } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder'
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import WebMercatorViewport from 'viewport-mercator-project'
import { Button } from 'reactstrap';
import "./Map.css";


const vheight = window.innerHeight-85
const vwidth = window.innerWidth

class Map extends Component {

  state = {
    viewport: {
      width: vwidth,
      height: vheight,
      latitude: 41.4993,
      longitude: -81.6994,
      zoom: 0,
      pitch: 0,
      bearing: 0
    },
    markerstart: {
      latitude: 41.4993,
      longitude: -81.6994,
    },
    marker: {
      latitude: 41.4993,
      longitude: -81.6994,
    },
    markerdest: {
      latitude: 0,
      longitude:0 
    },
    confirmshow: false,
    haveDestination: false,
    haveUsersLocation: false,
    linelayerstuff: {
      id: 'GeoJsonLayer', 
      data: {
        "type": "LineString",
        "coordinates": [[0, 0], [0, 0]]
      },
      getLineWidth: 12,
      getLineColor: [255,20,147]
    },
    directions: [],
    directionnum: 1,
    intervalNum: 0,
    tripdist: 0,
    distances: [],
    coordinates: [],
    ManeuverCoords: [],
    mileswitch: true
  };

  mapRef = React.createRef()

  componentDidMount() {
    const success = (position) => {
      this.setState({
        viewport: {
          width: vwidth,
          height: vheight,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          zoom: 14,
          pitch: 0,
          bearing: 0
        },
        marker: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        markerstart: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },

        haveUsersLocation: true
      })
    }
    const error = (err) => {
      console.log(err)
    }
    const options = {
      enableHighAccuracy: true
    }
    navigator.geolocation.getCurrentPosition(success, error, options) 
  }

  setPosition = () => {
    const success = (position) => {
      this.setState({
        marker: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        haveUsersLocation: true
      })
      const lat1 = position.coords.latitude
      const lon1 = position.coords.longitude
      const lat2 = this.state.ManeuverCoords[this.state.directionnum - 1][1]
      const lon2 = this.state.ManeuverCoords[this.state.directionnum - 1][0]
      const radlat1 = Math.PI * lat1/180;
      const radlat2 = Math.PI * lat2/180;
      const theta = lon1-lon2;
      const radtheta = Math.PI * theta/180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344
      if(dist<1.7 && this.state.distances[this.state.directionnum]>2500 && this.state.mileswitch) {
        const msg = new SpeechSynthesisUtterance("In 1 mile..." + this.state.directions[this.state.directionnum])
        window.speechSynthesis.speak(msg);
        this.setState({
          mileswitch: false
        })
      }
      if(dist<.01) {
        const msg = new SpeechSynthesisUtterance(this.state.directions[this.state.directionnum+1])
        window.speechSynthesis.speak(msg);
        this.setState({
          directionnum: this.state.directionnum + 1,
          mileswitch: true
        })
      }
    }
    
    const error = (err) => {
      console.log(err)
    }
    const options = {
      enableHighAccuracy: true
    }
    navigator.geolocation.getCurrentPosition(success, error, options) 
  }
  
  handleViewportChange = (viewport) => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }, 
    })
    
  }

  handleGeocoderViewportChange = (viewport) => {
    return
    /*const geocoderDefaultOverrides = { transitionDuration: 1000 }

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    })*/
  }

  handleGeocoderViewportChange2 = (viewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1700 }

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    })
  }

  lineWidth = dist => {
    if(dist>3082328) {
      return 4000
    }
    if(dist>2000000) {
      return 3000
    }
    if(dist>600000) {
      return 2000
    }
    if(dist>180770) {
      return 1000
    }
    if(dist>81770) {
      return 400
    }
    if(dist>30770) {
      return 300
    }
    if(dist>10770) {
      return 200
    }
    return 100
  }

  handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
  }

  startFunction = (result) => {
    this.setState({
      markerstart: {
        latitude: result.result.center[1],
        longitude: result.result.center[0]
      }
    })
  }

  resultFunction = (result) => {
    this.setState({
      directionnum: 1
    })
    const coordinates = [[this.state.markerstart.longitude, this.state.markerstart.latitude]]
    const plainDirections = []
    const distances = []
    const ManeuverCoords = []
    fetch('https://api.mapbox.com/directions/v5/mapbox/driving/' + this.state.markerstart.longitude + ',' + this.state.markerstart.latitude + ';' +
      result.result.center[0] + ',' + result.result.center[1] + '?steps=true&geometries=geojson&access_token=' + process.env.REACT_APP_MAP_API)
      .then(this.handleErrors)
      .then(response => {
        response.json().then(data => {
          if(data.code === "NoRoute"){
            console.log(data.code)
            return
          }
          const dir = data.routes[0].geometry.coordinates
          const pdir = data.routes[0].legs[0].steps
          console.log(pdir)
          for(let i=0;i<dir.length;i++) {
            coordinates.push(dir[i])
          }
          for(let i=0;i<pdir.length;i++) {
            plainDirections.push(pdir[i].maneuver.instruction)
            ManeuverCoords.push(pdir[i].maneuver.location)
            distances.push(pdir[i].distance)
          }
          
          const viewport = new WebMercatorViewport(this.state.viewport)
          const newViewport = viewport.fitBounds([[this.state.markerstart.longitude, this.state.markerstart.latitude], [result.result.center[0], result.result.center[1]]], {
            padding: 30,
            offset: [-100, -100]
          })
          this.setState({
            viewport: {
              width: 800,
              height: 600,
              latitude: newViewport.latitude,
              longitude: newViewport.longitude,
              zoom: newViewport.zoom,
              pitch: 0,
              bearing: 0,
              transitionDuration: 1700
            },
            markerdest: {
              latitude: result.result.center[1],
              longitude: result.result.center[0]
            },
            confirmshow: true,
            linelayerstuff: {
              id: 'GeoJsonLayer', 
              data: {
                "type": "LineString",
                "coordinates": coordinates
              },
              getLineWidth: this.lineWidth(data.routes[0].distance),
              getLineColor: [255,20,147]
            },
            tripdist: data.routes[0].distance,
            distances: distances, 
            coordinates: coordinates,
            directions: plainDirections,
            ManeuverCoords: ManeuverCoords
          })
          console.log(this.state.directions)
          console.log(this.state.ManeuverCoords)
      })
      }).catch(error => {
          console.log(error)
    })
  }
  
  confirmclick = () => {
    const interval = setInterval(this.setPosition, 1500)
    this.setState({
      viewport: {
        width: vwidth,
        height: vheight,
        latitude: this.state.markerstart.latitude,
        longitude: this.state.markerstart.longitude,
        zoom: 14,
        pitch: 0,
        bearing: 0,
        transitionDuration: 1700
      },
      marker: {
        latitude: this.state.markerstart.latitude,
        longitude: this.state.markerstart.longitude
      },
      confirmshow: false,
      haveDestination: true,
      linelayerstuff: {
        id: 'GeoJsonLayer', 
        data: {
          "type": "LineString",
          "coordinates": this.state.linelayerstuff.data.coordinates
        },
        getLineWidth: 80,
        getLineColor: [255,20,147]
      },
      intervalNum: interval
    })
    const msg = new SpeechSynthesisUtterance("Starting route directions..." + this.state.directions[0] + "...then..." + this.state.directions[1])
    window.speechSynthesis.speak(msg);
  }

  endrouteclick = () => {
    const success = (position) => {
      this.setState({
        viewport: {
          width: vwidth,
          height: vheight,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          zoom: 14,
          pitch: 0,
          bearing: 0,
          transitionDuration: 1700
        },
        marker: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        markerstart: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        linelayerstuff: {
          id: 'GeoJsonLayer', 
          data: {
            "type": "LineString",
            "coordinates": [[0,0], [0,0]]
          },
          getLineWidth: 0,
          getLineColor: [255,20,147]
        },
        haveUsersLocation: true,
        haveDestination: false
      })
    }
    const error = (err) => {
      console.log(err)
    }
    const options = {
      enableHighAccuracy: true
    }
    navigator.geolocation.getCurrentPosition(success, error, options)
    clearInterval(this.state.intervalNum)
  }

  render() {
    return (
      <div>
          <MapGL
            ref={this.mapRef}
            {...this.state.viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAP_API}
            mapStyle="mapbox://styles/mapbox/streets-v10"
            onViewportChange={(viewport) => {
              this.setState({viewport})}}
          >
          <DeckGL
              {...this.state.viewport}
              layers={[
                new GeoJsonLayer(this.state.linelayerstuff)
              ]}
          />
            <Marker latitude={this.state.markerstart.latitude} longitude={this.state.markerstart.longitude} offsetLeft={-20} offsetTop={-30}>
              <img className = "truckimg" alt='' src ='https://unixtitan.net/images/push-pin-clipart-transparent-background-5.png' />
            </Marker>
            {this.state.haveDestination && <Marker latitude={this.state.marker.latitude} longitude={this.state.marker.longitude} offsetLeft={-25} offsetTop={-20}>
              <img className = "blip" alt='' src ='https://i.imgur.com/ZUyRrkh.png' />
            </Marker>}
            {this.state.confirmshow && <Marker latitude={this.state.markerdest.latitude} longitude={this.state.markerdest.longitude} offsetLeft={-25} offsetTop={-10}>
              <img className = "treasureimg" alt='' src ='https://pngimg.com/uploads/treasure_chest/treasure_chest_PNG154.png' />
            </Marker>} 
            {this.state.haveDestination && <Marker latitude={this.state.markerdest.latitude} longitude={this.state.markerdest.longitude} offsetLeft={-25} offsetTop={-10}>
              <img className = "treasureimg" alt='' src ='https://pngimg.com/uploads/treasure_chest/treasure_chest_PNG154.png' />
            </Marker>}
            
            {!this.state.haveDestination && <Geocoder
              mapRef={this.mapRef}
              onViewportChange={this.handleGeocoderViewportChange2}
              mapboxApiAccessToken={process.env.REACT_APP_MAP_API}
              onResult={this.startFunction}
              placeholder="Current location"
              position="top-left"
            />}

            {!this.state.haveDestination && <Geocoder
              mapRef={this.mapRef}
              onViewportChange={this.handleGeocoderViewportChange}
              mapboxApiAccessToken={process.env.REACT_APP_MAP_API}
              onResult={this.resultFunction}
              placeholder="Search destination"
            />}
          </MapGL>
          <div className="overmap">
            {this.state.haveDestination && <p className="directionp">
                                             Directions:<br></br>
                                             {this.state.directions[this.state.directionnum]}<br></br>
                                             Then:<br></br>
                                             {this.state.directions[this.state.directionnum+1]}
                                           </p>}
            {this.state.confirmshow && <Button id="ConfirmBtn" onClick={this.confirmclick} className="confirmbtn" color="success">Go!</Button>}
            {this.state.haveDestination && <Button id="EndRouteBtn" onClick={this.endrouteclick} className="endroutebtn" color="danger">End Route</Button>}
          </div>
      </div>
    );
  }
}

export default Map;