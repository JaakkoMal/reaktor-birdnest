import React, { useState } from 'react'
import Visualization from './Visualization'
import {infoText} from '../helpers/InfoText'


export default function DroneInfo({drones}) {

  const [showChart, setShowChart] = useState(false)
 
  const toggleChart = () => {
    setShowChart(prev => !prev)
  }
  
  return (
    <div className='container'>
      <nav>
        <h1>Reaktor Birdnest Pre-assignment</h1>
      </nav>
      <p>This application shows the information of all the drones inside the detection area from the last 10 minutes.</p>
      <p>The pilot information of drones that have violated the NDZ can be seen on the drone information box.</p>
      <button onClick={toggleChart}>{showChart ? 'HIDE RADAR' : 'SHOW RADAR'}</button>
      {showChart && (
        <div>
          {infoText}
        <div className='chartContainer'>
        <Visualization drones={drones}/>
        </div>
        </div>
      )}
      
     <div className='droneInfoContainer'>
          {
            drones.sort((drone1, drone2) => new Date(drone2.timestamp) - new Date(drone1.timestamp)).map(drone => (
              <div key={drone.serialNumber} className='infoBox'> 
                    <ul>
                        <h3>{drone.model}</h3>
                        <li>Serial number: <b>{drone.serialNumber}</b></li>
                        <li>Last spotted: <b>{new Date(drone.timestamp).toLocaleString()}</b></li>
                        <li>Last distance: <b>{drone.distanceFromTheNest.toFixed(2)}m</b></li>
                        <li>Closest to the nest: <b>{drone.closestDistance.toFixed(2)}m</b></li>
                        {drone.isViolator && (
                          <div className="violatorInfoContainer">
                            <h4>VIOLATOR</h4>
                            <p><b>Full name: {drone.ownerInfo[0]} {drone.ownerInfo[1]}</b></p>
                            <p><b>Email: {drone.ownerInfo[2]}</b></p>
                            <p><b>Tel: {drone.ownerInfo[3]}</b></p>
                          </div>
                        )}
                        
                    </ul>
              </div>      
            ))
          }       
      </div>
     </div> 

  )
}
