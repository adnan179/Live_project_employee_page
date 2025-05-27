import { useQuery } from '@tanstack/react-query';
import EmployeeCard from './EmployeeCard.tsx';
import LoadingSpinner from "../utils/LoadingSpinner";
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { fetchEmployees } from '../services/employeeService.ts';
import { Employee } from '../types/employee';
import EmployeeTable from './EmployeeTable.tsx';
import cardIcon from "../assets/card-icon.png";
import tableIcon from "../assets/table-icon.png";

interface Props{
  searchTerm: string;
}


const Employees: React.FC<Props> = ({ searchTerm }) => {
  const navigate = useNavigate();
  const [debouncedSearch, setDebouncedSearch] =useState<string>(searchTerm);
  const [isTableView, setIsTableView] = useState<boolean>(false);

  // Debounce the search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300); // adjust delay as needed

    return () => clearTimeout(timer);
  }, [searchTerm]);


  const { data, isLoading,isError } = useQuery<Employee[]>({
    queryKey:['employees',debouncedSearch],
    queryFn:() => fetchEmployees(debouncedSearch),
    keepPreviousData:true,
  });

  const handleClicks = (id:string) => {
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
      <p className='text-blue-400 font-medium text-lg hidden md:flex'>For filters, use the table view</p>
      <div className='gap-3 mt-2 hidden md:flex'>
        <button onClick={() => setIsTableView(false)} className={`${!isTableView ? "bg-gray-200 px-4 py-2 rounded-lg":""} flex gap-2 items-center`}>
          <img src={cardIcon} alt='grid-view-format' className='w-8 h-8 object-contain'/>
          <h2>Grid view</h2>
        </button>
        <button onClick={() => setIsTableView(true)} className={`${isTableView ? "bg-gray-200 px-4 py-2 rounded-lg":""} gap-2 items-center`}>
          <img src={tableIcon} alt='grid-view-format' className='w-8 h-8 object-contain'/>
          <h2>Table view</h2>
        </button>
      </div>
      {isTableView ? (
        <div className='w-full h-full p-10 mt-2'>
          {Array.isArray(data) && (
            <EmployeeTable data={data} onRowClick={handleClicks}/>
          )}
        </div>
      ) : (
        <div className='md:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {Array.isArray(data) && data?.map((emp,idx) => (
            <div key={idx} onClick={() => handleClicks(emp.id)}>
              <EmployeeCard data={emp}/>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}



export default Employees;