import React from "react"
import Map from "./components/Map"
import Bottombar from "./components/Bottombar"

 class App extends React.Component {
  
  render() {
    return (
       <div>
         <Map />
         <Bottombar />
       </div>
     )
   }
 }
 
 export default App
