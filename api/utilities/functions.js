const calculateDistanceFromTheNest = (drone) => {
    const theNestX = 250000
    const theNestY = 250000
    const xDistance = theNestX - (drone.positionX[0])
    const yDistance = theNestY - (drone.positionY[0])
    const distanceFromTheNest = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)) / 1000

        console.log(drone.model + " is within " + distanceFromTheNest + " meters from the nest")
        return distanceFromTheNest

}

const compareDetectedToPrevious = (current, prev) => {

    if(prev.length > 0){ // check if historical drone info exists and if so... (else see else-statement)
                                    // Loop through the drones detected in the latest "pulse"
        current.forEach(drone => {  // and check if there are drones that are already on the list of detected drones
            let droneIndex = prev.findIndex(i => drone.serialNumber[0] === i.serialNumber[0])
                                    
            if(droneIndex !== -1){  // If a drone already exists on the list, it gets updated
                let prevToUpdate = {...prev[droneIndex]} // A copy of the info from the previous sighting
                
                if(prevToUpdate.closestDistance){       // If the info from the previous sighting contains closest distance
                    console.log("updating distance")
                    let updatedDrone;                   
                    if(prevToUpdate.closestDistance < drone.distanceFromTheNest){   // if the previous closest distance is shorter than the current distance
                                                                                    // then drone info is updated, but the closest distance remains from previous sighting 
                        updatedDrone = {...drone, closestDistance : prevToUpdate.closestDistance}
                        prev[droneIndex] = updatedDrone
                        console.log("Drone distance updated for ", prev[droneIndex])
                    } else {                                                        // if the previous closest distance is greater than the current distance
                        updatedDrone = {...drone, closestDistance : drone.distanceFromTheNest} // the closest distance is updated
                        prev[droneIndex] = updatedDrone
                    }
                }
            } else {                                                // if the drone is sighted for the first time
                drone.closestDistace = drone.distanceFromTheNest    // the current distance is set as the closest distance
                prev.push(drone)
            }
        })
        return prev     // return the updated drones
    } else {
                        // return the sighted drones with the closest distance set as the current distance
        current.forEach(drone => {
            drone.closestDistance = drone.distanceFromTheNest
        })
        return current
    }
}

const checkTimeDifference = (sightingTime, timeNow) => {
    // turn both the last time of sighting and current time into seconds
    let timeNowSplitted = timeNow.slice(11, timeNow.length - 5).split(':')
    let timeNowHoursInSeconds = (Number(timeNowSplitted[0]) * 3600)
    let timeNowMinutesInSeconds = (Number(timeNowSplitted[1]) * 60)
    let timeNowSeconds = Number(timeNowSplitted[2])
    let timeNowInSeconds = timeNowHoursInSeconds + timeNowMinutesInSeconds + timeNowSeconds

    let sightingTimeSplitted = sightingTime.slice(11, sightingTime.length - 5).split(':')
    let sightingHoursInSeconds = (Number(sightingTimeSplitted[0]) * 3600)
    let sightingMinutesInSeconds = (Number(sightingTimeSplitted[1]) * 60)
    let sightingSeconds = Number(sightingTimeSplitted[2])
    let sightingTimeInSeconds = sightingHoursInSeconds + sightingMinutesInSeconds + sightingSeconds

    // calculate the time passed since the last sighting by subtracting the last sighting time from time now
    let timeSinceLastSighting = (timeNowInSeconds - sightingTimeInSeconds) / 60
    console.log("Minutes since last sighting: ", timeSinceLastSighting)

    // return false if the time since last sighting is less than 10 minutes and true if the time is less than 10 minutes
    if(timeSinceLastSighting > 2){
        return false
    } else {
        return true
    }

}

module.exports = {
    calculateDistanceFromTheNest,
    compareDetectedToPrevious,
    checkTimeDifference
}