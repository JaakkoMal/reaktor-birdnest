import React from 'react'

export default function DroneInfo({drones, badGuys}) {

  
  return (

      <div>
          <h1>Reaktor Birdnest assignment</h1>
          {
            drones.sort((drone1, drone2) => new Date(drone2.timestamp) - new Date(drone1.timestamp)).map(drone => (
              <ul key={drone.serialNumber}>
                      <p>{drone.model}</p>
                      <li>{drone.serialNumber}</li>
                      <li>Last seen: {drone.timestamp}</li>
                      <li>Last measured distance: {drone.distanceFromTheNest.toFixed(2)}m</li>
                      <li>Closest distance: {drone.closestDistance.toFixed(2)}m</li>
                  </ul>
            ))
          }       
      </div>

  )
}
