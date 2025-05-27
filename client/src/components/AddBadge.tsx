import React, { useState } from 'react';
import AddIcon from '../utils/AddIcon';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '../utils/LoadingSpinner';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { fetchBadges } from '../services/employeeService.ts';
import { Badge } from '../types/employee';
import { useForm } from "@tanstack/react-form";

const AddBadge:React.FC = () => {
  const { employeeId } = useParams<{ employeeId:string}>();
  const queryClient = useQueryClient();

  const [isAddBadge, setIsAddBadge] = useState<Boolean>(false);

  const { data: badges, isLoading, isError, error } = useQuery<Badge[], Error>({
    queryKey: ["badges"],
    queryFn: fetchBadges,
  });


  const form = useForm({
    defaultValues:{
      badgeId:"",
    },
    onSubmit: async ({ value }) => {
      try{
        const response = await fetch(`http://localhost:3030/employees/${employeeId}/badges?badgeId=${value.badgeId}`,{
          method:"PATCH",
        });
        if(!response.ok){
          const errorText = await response.text();
          throw new Error(`Failed to add badge: ${errorText}`);
        }
        await response.text();
        queryClient.invalidateQueries({queryKey:['employee',employeeId]});
        toast.success("Badge added successfully!!");
        setIsAddBadge(false);
        form.reset();
      }catch(error:any){
        toast.error(`Failed to add badge: ${error.message}`);
      }
    }
  })


  const toggleSelect = () => {
    setIsAddBadge((prev) => !prev);
  };

  return (
    <form onSubmit={form.handleSubmit} className="flex flex-col items-center gap-4 mt-7">
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <div className="text-red-500 font-semibold">
          Failed to fetch badges: {error?.message}
        </div>
      ) : (
        <>
          <button
            onClick={toggleSelect}
            type="button"
            className="flex gap-2 items-center bg-gray-100 border px-4 py-2 rounded-xl shadow-md font-bold text-[16px]"
          >
            <AddIcon className="w-8 h-8" />
            Add Badge
          </button>

          {isAddBadge && (
            <>
              <form.Field
                name='badgeId'
                children={(field) => (
                  <select title='badge-select'
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className='border p-2 rounded-md'>
                    <option value="">Select a badge</option>
                    {badges?.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.id} - {b.name}
                      </option>
                    ))}
                  </select>
                )}/>

              <button type='submit' className='bg-blue-400 text-white font-medium text-[14px] px-4 py-2 rounded-md shadow-md border'>
                Submit
              </button>
            </>
            
          )}
        </>
      )}
    </form>
  );
};

export default AddBadge;