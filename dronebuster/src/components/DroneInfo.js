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
