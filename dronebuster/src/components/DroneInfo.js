import React from 'react'

export default function DroneInfo({drones}) {

  
  return (
    <div>
        <h1>Reaktor Birdnest assignment</h1>
        {
            drones.map(drone => (
                <ul key={drone.serialNumber}>
                    <p>{drone.model}</p>
                    <li>{drone.serialNumber}</li>
                    <li>Last seen: {drone.timestamp}</li>
                    <li>Last measured distance: {drone.distanceFromTheNest}</li>
                    <li>Closest distance: {drone.closestDistance}</li>
                </ul>
            ))
        }
    </div>
  )
}
