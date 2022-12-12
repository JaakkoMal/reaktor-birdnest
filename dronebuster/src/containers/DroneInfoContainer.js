import React, { useEffect, useState } from 'react'
import DroneInfo from '../components/DroneInfo'

const droneURL = 'http://localhost:8080/drones'
const pilotURL = 'http://localhost:8080/pilots/'

export default function DroneInfoContainer() {

  const [ drones, setDrones ] = useState([])   
  const [ badGuys, setBadGuys ] = useState([])

  useEffect(() => {
    const timeOut = setTimeout(() => {
        fetch(droneURL)
    .then(res => res.json())
    .then(response => {
        setDrones(response)
    })
    .catch(error => console.error(error))
    }, 2000)
    return () => clearTimeout(timeOut)
  }, [drones])


  return (
    <DroneInfo drones={drones}/>
  )
}
