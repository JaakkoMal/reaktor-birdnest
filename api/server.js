const express = require('express');
const app = express();
const cors = require('cors');
const parseString = require('xml2js').parseString
const axios = require('axios');
const PORT = process.env.PORT || 8080;

const { calculateDistanceFromTheNest, compareDetectedToPrevious, checkTimeDifference } = require('./utilities/functions')

const droneURL = 'https://assignments.reaktor.com/birdnest/drones'

app.use(cors({
    origin: '*'
}))

let drones = []
// GET ALL DRONES
app.get('/', (req, res) => {
   axios.get(droneURL).then(response => {
    parseString(response.data, (err, result) => {
        let detectedDrones = []
        detectedDrones = result.report.capture[0].drone
        let timestamp = result.report.capture[0].$.snapshotTimestamp
        detectedDrones.forEach(drone => {
            drone.timestamp = timestamp
            drone.distanceFromTheNest = calculateDistanceFromTheNest(drone)
            drone.closestDistance = drone.distanceFromTheNest
        })
        let updatedDroneInfo = []
        updatedDroneInfo = compareDetectedToPrevious(detectedDrones, drones)
        updatedDroneInfo = updatedDroneInfo.filter(drone => checkTimeDifference(drone.timestamp, timestamp) === true)
        drones = updatedDroneInfo
        console.log("DRONES NOW: ", updatedDroneInfo)
        res.send(updatedDroneInfo)
    })
   }).catch(error => {
    res.json(error)
   })
   
})

app.listen(PORT, () => {
    console.log('Server running.')
})