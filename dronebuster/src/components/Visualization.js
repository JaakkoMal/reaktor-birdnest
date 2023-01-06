import React from 'react'
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js';
import { Scatter } from 'react-chartjs-2';


ChartJS.register(LinearScale, PointElement, LineElement, Tooltip);

export default function Visualization({drones}) {

    const options = {
        animation: false,
        aspectRatio: 1,
        scales: {
          y: {
            min: 0,
            max: 500000,
            grid: {
                color: 'green'
            },
            ticks: {
                display: false
            }
          },
          x: {
            min: 0,
            max: 500000,
            grid: {
                color: 'green'
            },
            ticks: {
                display: false
            }
          },
        },
        elements: {
            point: {
                pointStyle: 'rectRot',
                radius: 5
            }
        }
      };

    const dronePositions = [
        {
            label: 'THE NEST',
            data: [{
                x: 250000,
                y: 250000
            }],
            backgroundColor: 'green'
        }
    ]
    drones.forEach(drone => {
        if(drone.timestamp === drones[0].timestamp){
            dronePositions.push({
                label: drone.model,
                data: [{
                    x: Number(drone.positionX),
                    y: Number(drone.positionY)
                }],
                backgroundColor: 'rgba(255, 99, 132, 1)',
            })
        }
        
    })

    const data = {
        datasets: dronePositions,
      };
    
    return (
        <Scatter options={options} data={data} />
    )
  }


