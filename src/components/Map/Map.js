import React, { Component}  from 'react';
import MapGL, { Marker, Popup } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder'
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import WebMercatorViewport from 'viewport-mercator-project'
import "./Map.css";


const vheight = window.innerHeight
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
    marker: {
      latitude: 41.4993,
      longitude: -81.6994,
    },
    markerdest: {
      latitude: 0,
      longitude:0 
    },
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
    directions: []
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
        markerdest: {
          latitude: 41.0814,
          longitude: -81.5190,
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
  
  handleViewportChange = (viewport) => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }, 
      linelayerstuff: {
        id: 'GeoJsonLayer', 
        data: {
          "type": "LineString",
          "coordinates": [[0, 0], [0, 0]]
        },
        getLineWidth: this.lineWidth(),
        getLineColor: [255,20,147]
      }
    })
    
  }

  handleGeocoderViewportChange = (viewport) => {
    return
    const geocoderDefaultOverrides = { transitionDuration: 1000 }

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

  resultFunction = (result) => {
    setInterval(function(){ console.log("Hello") }, 2000);
    const directions = [[this.state.marker.longitude, this.state.marker.latitude]]
    const plainDirections = []
    fetch('https://api.mapbox.com/directions/v5/mapbox/driving/' + this.state.marker.longitude + ',' + this.state.marker.latitude + ';' +
      result.result.center[0] + ',' + result.result.center[1] + '?steps=true&geometries=geojson&access_token=' + process.env.REACT_APP_MAP_API)
      .then(this.handleErrors)
      .then(response => {
        response.json().then(data => {
          if(data.code === "NoRoute"){
            console.log(data.code)
            return
          }
          console.log(data)
          const dir = data.routes[0].geometry.coordinates
          const pdir = data.routes[0].legs[0].steps
          for(let i=0;i<dir.length;i++) {
            directions.push(dir[i])
          }
          for(let i=0;i<pdir.length;i++) {
            plainDirections.push(pdir[i].maneuver.instruction)
          }
          const viewport = new WebMercatorViewport(this.state.viewport)
          const newViewport = viewport.fitBounds([[this.state.marker.longitude, this.state.marker.latitude], [result.result.center[0], result.result.center[1]]], {
            padding: 20,
            offset: [0, -100]
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
            haveDestination: true,
            linelayerstuff: {
              id: 'GeoJsonLayer', 
              data: {
                "type": "LineString",
                "coordinates": directions
              },
              getLineWidth: this.lineWidth(data.routes[0].distance),
              getLineColor: [255,20,147]
            },
            directions: plainDirections
          })

      })
      }).catch(error => {
          console.log(error)
    })
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
            <Marker latitude={this.state.marker.latitude} longitude={this.state.marker.longitude} offsetLeft={-25} offsetTop={-20}>
              <img className = "truckimg" alt='' src ='https://i.imgur.com/3dgA0sR.png' />
            </Marker>
            {this.state.haveDestination && <Marker latitude={this.state.markerdest.latitude} longitude={this.state.markerdest.longitude} offsetLeft={-25} offsetTop={-10}>
              <img className = "treasureimg" alt='' src ='https://pngimg.com/uploads/treasure_chest/treasure_chest_PNG154.png' />
            </Marker>} 
            
            <Geocoder
              mapRef={this.mapRef}
              onViewportChange={this.handleGeocoderViewportChange}
              mapboxApiAccessToken={process.env.REACT_APP_MAP_API}
              onResult={this.resultFunction}
            />
          </MapGL>
      </div>
    );
  }
}

export default Map;