import React from 'react';

const EmployeeCard = ({employeeData}) => {
  return (
    <div className='flex flex-col gap-2 p-7 rounded-lg bg-gray-100 shadow-lg cursor-pointer'>
        <div className='w-full justify-center items-center flex'>
          <img src={employeeData.image} alt={employeeData.name} className='w-20 h-20 object-contain'/>
        </div>
        <h1 className='text-[16px] font-bold'>ID: <span className='text-blue-400 font-medium'>{employeeData.id}</span></h1>
        <h1 className='text-[16px] font-bold'>Name: <span className='text-blue-400 font-medium'>{employeeData.name}</span></h1>
        <h1 className='text-[16px] font-bold'>Designation: <span className='text-blue-400 font-medium'>{employeeData.title}</span></h1>
    </div>
  )
}

export default EmployeeCard;