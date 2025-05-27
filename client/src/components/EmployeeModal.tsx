import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import LoadingSpinner from '../utils/LoadingSpinner';
import BackIcon from "../utils/BackIcon";
import AddBadge from './AddBadge.tsx';
import { fetchEmployeeById } from '../services/employeeService.ts';


const EmployeeModal :React.FC = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  

  const { data: employee, isLoading, isError } = useQuery({
    queryKey:['employee', employeeId],
    queryFn:() => fetchEmployeeById(employeeId!),
    enabled: !!employeeId,
  });

  if(isError) throw new Error("Error fetching employee details");
  return (
    <div className='relative flex w-full h-screen justify-center items-center'>
      <div className='cursor-pointer top-0 left-1 md:top-5 md:left-5 absolute' onClick={() => navigate('/employees')}>
        <BackIcon />
      </div>
      <div className='w-[400px] md:w-[600px] bg-gray-100 md:p-10 p-4 rounded-[36px] shadow-lg mt-2'>
        {isLoading ? (
          <LoadingSpinner/>
          ):(
            <>
              <div className='flex justify-center items-center w-full'>
                <img src={employee?.image} alt={employee?.name} className='md:w-20 md:h-20 sm:w-16 sm:h-16 w-12 h-12 object-contain'/>
              </div>
              <h1 className='md:text-[20px] text-[14px] font-bold'>ID: <span className='text-blue-400 font-medium'>{employee?.id}</span></h1>
              <h1 className='md:text-[20px] text-[14px]  font-bold'>Name: <span className='text-blue-400 font-medium'>{employee?.name}</span></h1>
              <h1 className='md:text-[20px] text-[14px]  font-bold'>Designation: <span className='text-blue-400 font-medium'>{employee?.title}</span></h1>
              <h1 className='md:text-[20px] text-[14px]  font-bold'>Team: <span className='text-blue-400 font-medium'>{employee?.team}</span></h1>
              <div className='w-full text-blue-500 md:text-[36px] text-[24px] font-mea flex justify-center items-center mt-4'>Badges</div>
              <div className='w-full h-[2px] bg-gray-200 mt-2'></div>
              <div className='grid grid-cols-2 gap-3 mt-3'>
                {employee?.badgeDetails?.length === 0 ? (
                  <p className='text-[24px] font-medium text-red-400 col-span-2 text-center'>Work hard and get a badge!!</p>
                ) : (
                  employee?.badgeDetails.map(b => (
                    <div key={b.id} className='flex flex-col justify-center items-center text-center'>
                      <img src={b.imageFilePath} alt={b.name} className='md:w-16 md:h-16 w-8 h-8 object-contain' />
                      <p className='text-sm md:text-lg font-medium'>Badge ID: {b.id}</p>
                      <p className='text-sm md:text-lg font-medium'>Badge Name: {b.name}</p>
                    </div>
                  ))
                )}
              </div>
              <AddBadge />
          </>
        )}
      </div>
    </div>
  )
}

export default EmployeeModal