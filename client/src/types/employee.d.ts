export interface Employee{
    id: string;
    name: string;
    image: string;
    team: string;
    title: string;
    badgeIds:string[];
}

export interface Badge{
    id: number;
    name:string;
    imageFilePath: string;
}

export interface EmployeeAPIResponse{
    id:string;
    name:string;
    image: string;
    team: string;
    title: string;
    badgeIds: string[];
    badgeDetails: Badge[];
}