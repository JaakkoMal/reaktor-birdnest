import React, { useEffect, useState } from 'react'
import DroneInfo from '../components/DroneInfo'

const URL = 'http://localhost:8080/'

export default function DroneInfoContainer() {

  const [ drones, setDrones ] = useState([])  

  useEffect(() => {
    const timeOut = setTimeout(() => {
        fetch(URL)
    .then(res => res.json())
    .then(response => {
        console.log(response)
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
