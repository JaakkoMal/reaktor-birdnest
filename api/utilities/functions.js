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
        current.forEach(drone => { 
            let droneIndex = prev.findIndex(i => drone.serialNumber[0] === i.serialNumber[0])
                                    
            if(droneIndex !== -1){  
                let prevToUpdate = {...prev[droneIndex]} 
                
                if(prevToUpdate.closestDistance){      
                    console.log("updating distance")
                    let updatedDrone;                   
                    if(prevToUpdate.closestDistance < drone.distanceFromTheNest){
                        updatedDrone = {...drone, closestDistance : prevToUpdate.closestDistance}
                        //prev[droneIndex] = updatedDrone
                        console.log("Drone distance updated for ", prev[droneIndex])
                    } else {                                                      
                        updatedDrone = {...drone, closestDistance : drone.distanceFromTheNest} 
                        //prev[droneIndex] = updatedDrone
                    }
                    if(updatedDrone.closestDistance <= 100 && !updatedDrone.isViolator){
                        updatedDrone.isViolator = true
                    }
                    prev[droneIndex] = updatedDrone
                }
            } else {                                                
                drone.closestDistance = drone.distanceFromTheNest    
                if(drone.closestDistance <= 100 && !drone.isViolator){
                    drone.isViolator = true
                }
                prev.push(drone)
            }
        })
        return prev
    } 

const checkTimeDifference = (sightingTime, timeNow) => {
    let sightingTimeInSeconds = sightingTime.getTime() / 1000
    let timeNowInSeconds = timeNow.getTime() / 1000
    let timeDifference = (timeNowInSeconds - sightingTimeInSeconds) / 60 

    if(timeDifference > 1){
        return false
    } else {
        return true
    }
    
}    

/*const checkTimeDifference = (sightingTime, timeNow) => {
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
    if(timeSinceLastSighting > 10){
        return false
    } else {
        return true
    }

}*/

module.exports = {
    calculateDistanceFromTheNest,
    compareDetectedToPrevious,
    checkTimeDifference
}