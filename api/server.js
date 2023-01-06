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
setInterval(() => {
    axios.get(droneURL).then(response => {
        parseString(response.data, (err, result) => {
            let detectedDrones = []
            detectedDrones = result.report.capture[0].drone
            let timestamp = new Date(result.report.capture[0].$.snapshotTimestamp)
            console.log("TIME: ", typeof timestamp)
            detectedDrones.forEach(drone => {
                drone.timestamp = timestamp
                drone.distanceFromTheNest = calculateDistanceFromTheNest(drone)
                drone.closestDistance = drone.distanceFromTheNest
            })
            if(drones.length === 0){
                drones = detectedDrones
            } else {
                let updatedDroneInfo = []
                updatedDroneInfo = compareDetectedToPrevious(detectedDrones, drones)
                updatedDroneInfo = updatedDroneInfo.filter(drone => checkTimeDifference(drone.timestamp, timestamp) === true)
                drones = updatedDroneInfo
            }
            console.log("DRONES NOW: ", drones)
        })
       }).catch(error => {
        console.log(error)
       })
}, 2000)


app.get('/drones', (req, res) => {
    res.send(drones)
})

app.get('/pilots/:serialNumber', (req, res) => {
    axios.get(`https://assignments.reaktor.com/birdnest/pilots/${req.params.serialNumber}`)
    .then(response => res.send(response.data))
    .catch(err => console.log(err))
})

app.listen(PORT, () => {
    console.log('Server running.')
})