import React, { useEffect, useState } from 'react'
import DroneInfo from '../components/DroneInfo'

const droneURL = 'http://localhost:8080/drones'
const pilotURL = 'http://localhost:8080/pilots/'

export default function DroneInfoContainer() {

  const [ drones, setDrones ] = useState([])   
  const [ badGuys, setBadGuys ] = useState([])

  const getOwnerInfo = (serialNumber) => {
    let ownerInfo = []
    fetch(pilotURL + serialNumber)
    .then(res => res.json())
    .then(response => {
      ownerInfo.push(response.firstName)
      ownerInfo.push(response.lastName)
      ownerInfo.push(response.email)
      ownerInfo.push(response.phoneNumber)
    })
    .catch(err => console.log(err))
    return ownerInfo
  }

  const update = (response) => {
    let newDrones = [...drones]
    let updated = []
      response.forEach(drone => {
        let droneIndex = newDrones.findIndex(i => i.serialNumber[0] === drone.serialNumber[0])
        if(droneIndex !== -1){
          if(!newDrones[droneIndex].ownerInfo){
            if(drone.isViolator){
              drone.ownerInfo = getOwnerInfo(drone.serialNumber[0])
              console.log("OWN" ,drone.ownerInfo)
              console.log("Adding owner info")
              console.log("DRONE TIMESTAMP: ", typeof drone.timestamp)
            }
          } else {
            drone.ownerInfo = newDrones[droneIndex].ownerInfo
          }
          //newDrones[droneIndex] = drone
          updated.push(drone)
        } else {
          if(drone.isViolator){
            drone.ownerInfo = getOwnerInfo(drone.serialNumber[0])
          }
          updated.push(drone)
        }
        
      })
      setDrones(updated)
      console.log("UP: ", updated)
  }

  useEffect(() => {
    const timeOut = setTimeout(() => {
        fetch(droneURL)
    .then(res => res.json())
    .then(response => {
        //setDrones(response)
        update(response)
    })
    .catch(error => console.error(error))
    }, 2000)
    return () => clearTimeout(timeOut)
  }, [drones])


  return (
    <DroneInfo drones={drones}/>
  )
}
