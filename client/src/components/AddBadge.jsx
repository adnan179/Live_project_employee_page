import React, { useState } from 'react';
import AddIcon from '../utils/AddIcon';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '../utils/LoadingSpinner';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

const fetchBadges = async () => {
  try {
    const response = await fetch("http://localhost:3030/badges");
    if (!response.ok) {
      const errorText = await response.text(); // useful to get detailed error
      throw new Error(`Fetch failed: ${response.status} - ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching badges:", error);
    throw error; // Propagate to React Query so isError is set
  }
};

const AddBadge = () => {
  const { employeeId } = useParams();
  const queryClient = useQueryClient();

  const [isAddBadge, setIsAddBadge] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState("");

  const { data: badges, isLoading, isError, error } = useQuery({
    queryKey: ["badges"],
    queryFn: fetchBadges,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3030/employees/${employeeId}/badges?badgeId=${selectedBadge}`,{
        method:"PATCH",
      });
      if(!response.ok){
        const errorText = await response.text();
        throw new Error( `Failed to add badge: ${errorText}`)
      }
      const text = await response.text();
      return text ? JSON.parse(text) : {};
    },
    onSuccess:() => {
      queryClient.invalidateQueries({queryKey:['employee',employeeId]});
      toast.success("Badge added successfully!!")
      setIsAddBadge(false);
      setSelectedBadge("");
    },
    onError: (error) => {
      toast.error("Failed to add badge!!", error.message)
    }
  });

  const handleSelect = (e) => {
    setSelectedBadge(e.target.value);
  };

  const toggleSelect = () => {
    setIsAddBadge((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!selectedBadge) return alert("Please select a badge first");
    mutation.mutate();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mt-7">
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
              <select
                onChange={handleSelect}
                value={selectedBadge}
                className="border p-2 rounded-md"
              >
                <option value="">Select a badge</option>
                {badges?.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.id} - {b.name}
                  </option>
                ))}
              </select>
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
