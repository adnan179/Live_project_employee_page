import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import LoadingSpinner from '../utils/LoadingSpinner';
import BackIcon from "../utils/BackIcon";

//function to fetch employee data using id from the params
const fetchEmployeeById = async (id) => {
  console.log(id)
  const response = await fetch(`http://localhost:3030/employees/${id}`);
  if(!response.ok){
    throw new Error("Failed to fetch employee data");
  }
  const data = await response.json();
  return data;
};
const EmployeeModal = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const { data: employee, isLoading, isError } = useQuery({
    queryKey:['employee', employeeId],
    queryFn:() => fetchEmployeeById(employeeId)
  });

  if(isError) throw new Error("Error fetching employee details");
  return (
    <div className='relative flex w-full h-screen justify-center items-center'>
      <div className='cursor-pointer top-5 left-5 absolute' onClick={() => navigate('/employees')}>
        <BackIcon />
      </div>
      <div className='w-[400px] md:w-[600px] bg-gray-100 p-10 rounded-[36px] shadow-lg'>
        {isLoading ? (
          <LoadingSpinner/>
          ):(
            <>
              <div className='flex justify-center items-center w-full'>
                <img src={`http://localhost:3030/${employee.imageFilePath}`} alt={employee.firstName + " "+ employee.lastName} className='w-20 h-20 object-contain'/>
              </div>
              <h1 className='text-[20px] font-bold'>ID: <span className='text-blue-400 font-medium'>{employee.id}</span></h1>
              <h1 className='text-[20px] font-bold'>Name: <span className='text-blue-400 font-medium'>{employee.firstName + " "+employee.lastName}</span></h1>
              <h1 className='text-[20px] font-bold'>Designation: <span className='text-blue-400 font-medium'>{employee.jobTitle}</span></h1>
              <h1 className='text-[20px] font-bold'>Team: <span className='text-blue-400 font-medium'>{employee.teamName}</span></h1>
              <div className='grid grid-cols-2 gap-3 mt-3'>
                {employee?.badgeDetails?.length === 0 ? (
                  <p className='text-[24px] font-medium text-red-400 col-span-2 text-center'>Work hard and get a badge!!</p>
                ) : (
                  employee?.badgeDetails.map(b => (
                    <div key={b.id} className='flex flex-col justify-center items-center text-center'>
                      <img src={`http://localhost:3030/${b.imageFilePath}`} alt={b.name} className='w-16 h-16 object-contain' />
                      <p className='text-sm md:text-lg font-medium'>Badge ID: {b.id}</p>
                      <p className='text-sm md:text-lg font-medium'>Badge Name: {b.name}</p>
                    </div>
                  ))
                )}
              </div>
          </>
        )}
      </div>
    </div>
  )
}

export default EmployeeModal