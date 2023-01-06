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

    if(timeDifference > 10){
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