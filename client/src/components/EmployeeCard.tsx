import React from 'react';
import { Employee } from '../types/employee';

interface Props{
    data:Employee[];
}
const EmployeeCard :React.FC<Props> = ({data}) => {
  return (
    <div className='flex flex-col gap-2 p-7 rounded-lg bg-gray-100 shadow-lg cursor-pointer'>
        <div className='w-full justify-center items-center flex'>
          <img src={data.image} alt={data.name} className='w-20 h-20 object-contain'/>
        </div>
        <h1 className='text-[16px] font-bold'>ID: <span className='text-blue-400 font-medium'>{data.id}</span></h1>
        <h1 className='text-[16px] font-bold'>Name: <span className='text-blue-400 font-medium'>{data.name}</span></h1>
        <h1 className='text-[16px] font-bold'>Designation: <span className='text-blue-400 font-medium'>{data.title}</span></h1>
    </div>
  )
}

export default EmployeeCard;