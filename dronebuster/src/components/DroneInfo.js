import React from 'react'

export default function DroneInfo({drones, badGuys}) {

  
  return (
    <div className='container'>
      <nav>
        <h1>Reaktor Birdnest Pre-assignment</h1>
      </nav>
     <div className='droneInfoContainer'>
          {
            drones.sort((drone1, drone2) => new Date(drone2.timestamp) - new Date(drone1.timestamp)).map(drone => (
              <div className='infoBox'> 
                <ul key={drone.serialNumber}>
                        <h3>{drone.model}</h3>
                        <li>Serial number: <b>{drone.serialNumber}</b></li>
                        <li>Last spotted: <b>{drone.timestamp}</b></li>
                        <li>Last distance: <b>{drone.distanceFromTheNest.toFixed(2)}m</b></li>
                        <li>Closest to the nest: <b>{drone.closestDistance.toFixed(2)}m</b></li>
                    </ul>
              </div>      
            ))
          }       
      </div>
     </div> 

  )
}
