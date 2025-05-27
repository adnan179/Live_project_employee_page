import { Badge, Employee, EmployeeAPIResponse } from "../types/employee";

//func to fetch employees
export const fetchEmployees = async (searchTerm =""): Promise<Employee[]> => {
    const endpoint = searchTerm ? `http://localhost:3030/employees?q=${encodeURIComponent(searchTerm.trim())}`
    : 'http://localhost:3030/employees';

    const response = await fetch(endpoint);
    if(!response.ok){
        throw new Error("Failed to fetch employees data");
    }

    const data = await response.json();

    return data.map((emp:any): Employee => ({
        id:emp.id,
        name: `${emp.firstName} ${emp.lastName}`,
        image: `http://localhost:3030/${emp.imageFilePath}`,
        team:emp.teamName,
        title:emp.jobTitle,
        badgeIds:emp.badgeIds,
    }))
};

export const fetchEmployeeById = async (id:string): Promise<EmployeeAPIResponse> => {
    const response = await fetch(`http://localhost:3030/employees/${id}`);
    if(!response.ok){
        throw new Error("Failed to fetch employee data");
    }
    const emp = await response.json();
    return {
        id: emp.id,
        name: `${emp.firstName} ${emp.lastName}`,
        image: `http://localhost:3030/${emp.imageFilePath}`,
        team: emp.teamName,
        title: emp.jobTitle,
        badgeIds: emp.badgeIds,
        badgeDetails: emp.badgeDetails.map(badge => ({
            ...badge,
            imageFilePath:`http://localhost:3030/${badge.imageFilePath}`
        }))
    };
};

export const fetchBadges = async ():Promise<Badge[]> => {
    try {
        const response = await fetch("http://localhost:3030/badges");
        if (!response.ok) {
        const errorText = await response.text(); // useful to get detailed error
        throw new Error(`Fetch failed: ${response.status} - ${errorText}`);
        }
        return await response.json();
  } catch (error) {
        console.error("Error fetching badges:", error);
        throw new Error("Failed to fetch badges",error.message); // Propagate to React Query so isError is set
  }
}



