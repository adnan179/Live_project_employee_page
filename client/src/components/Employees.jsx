import { useQuery } from '@tanstack/react-query';
import EmployeeCard from './EmployeeCard';
import LoadingSpinner from "../utils/LoadingSpinner";
import { useNavigate } from 'react-router';

//function to fetch employees data
const fetchEmployees = async () => {
  const response = await fetch("http://localhost:3030/employees");
  if(!response.ok){
    throw new Error("Failed to fetch employees data");
  }

  const data = await response.json();
  const mappedEmployyeData =  data?.map((emp) => ({
    id: emp.id,
    name: `${emp.firstName} ${emp.lastName}`,
    image: `http://localhost:3030/${emp.imageFilePath}`,
    team: emp.teamName,
    title: emp.jobTitle,
    badgeIds: emp.badgeIds,
  }));
  console.log(mappedEmployyeData);
  return mappedEmployyeData;
};
const Employees = () => {
  const navigate = useNavigate();

  const { data: employees, isLoading,isError } = useQuery({
    queryKey:['employees'],
    queryFn:fetchEmployees
  });

  const handleClicks = (id) => {
    navigate(`/employees/${id}`)
  };

  if(isLoading){
    return (
      <div className='bg-black/30 -z-30 inset-0 flex justify-center items-center w-full h-screen'>
        <LoadingSpinner/>
      </div>
    )
  }
  if(isError){
    return (
      <div className='inset-0 flex justify-center items-center w-full h-screen'>
        <p className='text-red-500 font-medium text-2xl'>Failed to load employees.</p>
      </div>
    )
  }

  
  return (
    <section className='w-full min-h-screen p-10'>
      <div className='grid grid-cols-4 gap-5'>
        {Array.isArray(employees) && employees?.map((emp,idx) => (
          <div key={idx} onClick={() => handleClicks(emp.id)}>
            <EmployeeCard employeeData={emp}/>
          </div>
        ))}
      </div>
    </section>
  )
}



export default Employees;