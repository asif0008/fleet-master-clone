import React from 'react'
import TruckCard from '../../../../components/TruckCard'
import { truck } from '../../../../data'


const Trucks = () => {
  return (
    <div>
      {truck.map((trucks, index)=>(
        <TruckCard truck={trucks}/>
      ))}
      
    </div>
  )
}

export default Trucks